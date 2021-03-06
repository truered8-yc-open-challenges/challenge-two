import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "./../../../contexts/FirebaseContext";
import { UserContext } from "./../../../contexts/UserContext";

import * as ROUTES from "./../../../constants/routes";

import "./../../css/User.css";

const Signup = (props) => {
  const { auth } = useContext(FirebaseContext);
  const { userData, updateUserData } = useContext(UserContext);

  useEffect(() => {
    userData && props.history.push(ROUTES.STORE);
  }, [userData, props.history]);

  const [showPassword, _setShowPassword] = useState(false);
  const [showConfirm, _setShowConfirm] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };
  const _toggleShowConfirm = () => {
    _setShowConfirm(!showConfirm);
  };

  const [firstName, _setFirstName] = useState("");
  const [lastName, _setLastName] = useState("");
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");
  const [confirm, _setConfirm] = useState("");

  const [loginHover, _setLoginHover] = useState(false);

  const [errorMessage, _setErrorMessage] = useState(null);
  const [loading, _setLoading] = useState(false);

  const isValid = () => {
    return (
      password === confirm &&
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    );
  };

  const onSubmit = () => {
    if (isValid()) {
      _setLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          fetch("https://api.youthcomputing.ca/shop/new-user", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              userId: authUser.user.uid,
              userName: `${firstName} ${lastName}`,
            }),
          }).then(() => {
            fetch(`https://api.youthcomputing.ca/users/${authUser.user.uid}`)
              .then((response) => response.json())
              .then((response) => {
                if (!response["error"]) {
                  updateUserData(response["userData"]);
                } else {
                  _setErrorMessage(response["message"]);
                }
                _setLoading(false);
              });
          });
        })
        .catch((error) => {
          _setErrorMessage(error.message);
          _setLoading(false);
        });
    } else {
      if (password !== confirm) _setErrorMessage("Passwords do not match!");
      else if (firstName === "")
        _setErrorMessage("First name cannot be left blank!");
      else if (email === "") _setErrorMessage("Email cannot be left blank!");
      else if (password === "")
        _setErrorMessage("Password cannot be left blank!");
    }
  };

  return (
    <Container>
      <div id="signupbody" className="bg-white">
        <h2 className="logintab2 position-relative">
          <Button
            variant="link"
            onClick={() => props.history.push(ROUTES.LOGIN)}
            onMouseEnter={() => _setLoginHover(true)}
            onMouseLeave={() => _setLoginHover(false)}
            className="text-secondary text-decoration-none shadow-none p-sm-1"
          >
            Login
          </Button>
        </h2>
        <div
          style={loginHover ? {} : { display: "none" }}
          className="horizontal-line position-relative bg-secondary"
        />
        <h2 className="signuptab text-dark">Signup</h2>
        <div className="horizontal-line2 position-relative bg-dark"></div>
        <br></br>
        <form>
          <label for="fnamesignup" className="accountlabel-f text-black">
            First name:
          </label>
          <label for="lnamesignup" className="accountlabel-l text-black">
            Last name:
          </label>
          <br></br>
          <input
            type="text"
            id="fnamesignup"
            value={firstName}
            onChange={(event) => _setFirstName(event.target.value)}
            placeholder="  Enter first name here..."
            className="accountinput-s accountinput position-relative"
            name="fnamesignup"
          ></input>
          <input
            type="text"
            id="lnamesignup"
            value={lastName}
            onChange={(event) => _setLastName(event.target.value)}
            placeholder="  Enter last name here..."
            className="accountinput-s accountinput position-relative"
            name="lnamesignup"
          ></input>
          <br></br>
          <br></br>
          <label for="emailsignup" className="accountlabel-f text-black">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            id="emailsignup"
            value={email}
            onChange={(event) => _setEmail(event.target.value)}
            placeholder="  Enter email here..."
            className="accountinput-l accountinput position-relative"
            name="emailsignup"
          ></input>
          <br></br>
          <br></br>
          <label for="pwdsignup" className="accountlabel-f text-black">
            Password:
          </label>
          <label for="pwd2signup" className="accountlabel-l text-black">
            Confirm Password:
          </label>
          <br></br>
          <input
            type={showPassword ? "text" : "password"}
            id="pwdsignup"
            value={password}
            onChange={(event) => _setPassword(event.target.value)}
            placeholder="  Enter password here..."
            className="accountinput-s accountinput position-relative"
            name="pwdsignup"
          ></input>
          <input
            type={showConfirm ? "text" : "password"}
            id="pwd2signup"
            value={confirm}
            onChange={(event) => _setConfirm(event.target.value)}
            placeholder="  Enter password here..."
            className="accountinput-s accountinput position-relative"
            name="pwd2signup"
          ></input>
          <span
            id="show"
            onClick={_toggleShowPassword}
            className="position-relative"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          <span
            id="show2"
            onClick={_toggleShowConfirm}
            className="position-relative"
          >
            {showConfirm ? "Hide" : "Show"}
          </span>
          <button
            onClick={onSubmit}
            disabled={loading}
            type="button"
            className="enterbtn position-relative"
          >
            <p className="text-white">
              {loading ? (
                <Spinner animation="border" size="md" className="mb-sm-1" />
              ) : (
                "Sign Up!"
              )}
            </p>
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.LOGIN)}
              className="shadow-none mb-sm-1 p-0"
            >
              Login
            </Button>
          </p>
        </form>
        {errorMessage && (
          <div className="error-message">Error: {errorMessage}</div>
        )}
      </div>
    </Container>
  );
};

export default withRouter(Signup);

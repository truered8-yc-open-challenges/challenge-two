import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "./../../contexts/FirebaseContext";
import { UserContext } from "./../../contexts/UserContext";

import * as ROUTES from "./../../constants/routes";

import "./../css/Login_signup.css";

const Signup = (props) => {
  const [showPassword, _setShowPassword] = useState(false);
  const [showConfirm, _setShowConfirm] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };
  const _toggleShowConfirm = () => {
    _setShowConfirm(!showConfirm);
  };

  const { auth } = useContext(FirebaseContext);
  const { setUserData } = useContext(UserContext);

  const [firstName, _setFirstName] = useState("");
  const [lastName, _setLastName] = useState("");
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");
  const [confirm, _setConfirm] = useState("");

  const [errorMessage, _setErrorMessage] = useState(null);

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
                  setUserData(response["userData"]);
                  props.history.push(ROUTES.STORE);
                } else {
                  _setErrorMessage(response["message"]);
                }
              });
          });
        })
        .catch((error) => {
          _setErrorMessage(error.message);
        });
    }
  };

  return (
    <Container>
      <div id="signupbody" className="bg-white">
        <h2 className="logintab">
          <a href="/login" className="text-secondary">
            Login
          </a>
        </h2>
        <h2 className="signuptab text-dark">Signup</h2>
        <div className="horizontal-line2"></div>
        <br></br>
        <form>
          <label for="fnamesignup" className="accountlabel-f">
            First name:
          </label>
          <label for="lnamesignup" className="accountlabel-l">
            Last name:
          </label>
          <br></br>
          <input
            type="text"
            id="fnamesignup"
            value={firstName}
            onChange={(event) => _setFirstName(event.target.value)}
            placeholder="  Enter first name here..."
            className="accountinput-s accountinput"
            name="fnamesignup"
          ></input>
          <input
            type="text"
            id="lnamesignup"
            value={lastName}
            onChange={(event) => _setLastName(event.target.value)}
            placeholder="  Enter last name here..."
            className="accountinput-s accountinput"
            name="lnamesignup"
          ></input>
          <br></br>
          <br></br>
          <label for="emailsignup" className="accountlabel-f">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            id="emailsignup"
            value={email}
            onChange={(event) => _setEmail(event.target.value)}
            placeholder="  Enter email here..."
            className="accountinput-l accountinput"
            name="emailsignup"
          ></input>
          <br></br>
          <br></br>
          <label for="pwdsignup" className="accountlabel-f">
            Password:
          </label>
          <label for="pwd2signup" className="accountlabel-l">
            Confirm Password:
          </label>
          <br></br>
          <input
            type={showPassword ? "text" : "password"}
            id="pwdsignup"
            value={password}
            onChange={(event) => _setPassword(event.target.value)}
            placeholder="  Enter password here..."
            className="accountinput-s accountinput"
            name="pwdsignup"
          ></input>
          <input
            type={showConfirm ? "text" : "password"}
            id="pwd2signup"
            value={confirm}
            onChange={(event) => _setConfirm(event.target.value)}
            placeholder="  Enter password again here..."
            className="accountinput-s accountinput"
            name="pwd2signup"
          ></input>
          <span onClick={_toggleShowPassword} className="show">
            {showPassword ? "Hide" : "Show"}
          </span>
          <span onClick={_toggleShowConfirm} className="show2">
            {showConfirm ? "Hide" : "Show"}
          </span>
          <button
            onClick={onSubmit}
            disabled={!isValid()}
            type="button"
            className="enterbtn"
          >
            <p>Sign Up!</p>
          </button>
          <p className="text-center">
            Already have an account? <a href="/login">Login</a>
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

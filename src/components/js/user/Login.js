import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "./../../../contexts/FirebaseContext";
import { UserContext } from "./../../../contexts/UserContext";

import * as ROUTES from "./../../../constants/routes";
import { formattedErrors } from "./../../../constants/helpers";

import "./../../css/User.css";

const Login = (props) => {
  const { auth, persistence } = useContext(FirebaseContext);
  const { remember, updateRemember, userData, updateUserData } = useContext(
    UserContext
  );

  useEffect(() => {
    userData && props.history.push(ROUTES.STORE);
  }, [userData, props.history]);

  const [showPassword, _setShowPassword] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };

  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");

  const [forgotPasswordOpen, _setForgotPasswordOpen] = useState(false);

  const [signupHover, _setSignupHover] = useState(false);

  const [errorMessage, _setErrorMessage] = useState(null);
  const updateErrorMessage = (message) => {
    if (formattedErrors[message]) _setErrorMessage(formattedErrors[message]);
    else _setErrorMessage(message);
  };

  const [loading, _setLoading] = useState(false);

  const isValid = () => {
    return email !== "" && password !== "";
  };

  const onSubmit = () => {
    if (isValid()) {
      _setLoading(true);
      auth
        .setPersistence(remember ? persistence.LOCAL : persistence.SESSION)
        .then(() =>
          auth
            .signInWithEmailAndPassword(email, password)
            .then((authUser) => {
              fetch(`https://api.youthcomputing.ca/users/${authUser.user.uid}`)
                .then((response) => response.json())
                .then((response) => {
                  if (!response["error"]) {
                    updateUserData(response["userData"]);
                  } else {
                    updateErrorMessage(response["message"]);
                  }
                  _setLoading(false);
                })
                .catch((error) => {
                  updateErrorMessage(error.message);
                  _setLoading(false);
                });
            })
            .catch((error) => {
              updateErrorMessage(error.message);
              _setLoading(false);
            })
        );
    } else {
      if (email === "") updateErrorMessage("Email cannot be blank!");
      else updateErrorMessage("Password cannot be blank!");
    }
  };
  return (
    <Container>
      <div id="loginbody" className="bg-white">
        <h2 className="logintab text-dark position-relative">Login</h2>
        <div className="horizontal-line position-relative bg-dark" />
        <h2 className="signuptab">
          <Button
            variant="link"
            onClick={() => props.history.push(ROUTES.SIGNUP)}
            onMouseEnter={() => _setSignupHover(true)}
            onMouseLeave={() => _setSignupHover(false)}
            className="text-secondary text-decoration-none shadow-none p-sm-1"
          >
            Signup
          </Button>
        </h2>
        <div
          style={signupHover ? {} : { display: "none" }}
          className="horizontal-line2 position-relative bg-secondary"
        />
        <form>
          <label for="emaillogin" className="accountlabel-f text-black">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            id="emaillogin"
            value={email}
            onChange={(event) => _setEmail(event.target.value)}
            placeholder="  Enter email here..."
            className="accountinput-l accountinput position-relative"
            name="emaillogin"
          ></input>
          <br></br>
          <label for="passwordlogin" className="accountlabel-f text-black">
            Password:
          </label>
          <br></br>
          <input
            type={showPassword ? "text" : "password"}
            id="passwordlogin"
            value={password}
            onChange={(event) => _setPassword(event.target.value)}
            placeholder="  Enter password here..."
            className="accountinput-l accountinput position-relative"
            name="passwordlogin"
          ></input>
          <span
            id="show3"
            onClick={_toggleShowPassword}
            className="position-relative"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          <br></br>
          <input
            type="checkbox"
            id="remember-me"
            checked={remember}
            onChange={() => {
              updateRemember(!remember);
            }}
            className="position-relative"
            name="remember-me"
          ></input>
          <label for="remember-me" id="remember-label">
            Remember Me
          </label>
          <br></br>
          <button
            onClick={onSubmit}
            disabled={loading}
            type="button"
            className="enterbtn  position-relative"
          >
            <p className="text-white">
              {loading ? (
                <Spinner animation="border" size="md" className="mb-sm-1" />
              ) : (
                "Login!"
              )}
            </p>
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.SIGNUP)}
              className="shadow-none mb-sm-1 p-0"
            >
              Signup
            </Button>
            <br />
            <Button
              variant="link"
              onClick={() => _setForgotPasswordOpen(true)}
              className="shadow-none mb-sm-1 p-0"
            >
              Forgot Password?
            </Button>
            <ForgotPasswordModal
              show={forgotPasswordOpen}
              handleClose={() => _setForgotPasswordOpen(false)}
            />
          </p>
        </form>
        {errorMessage && (
          <div className="error-message">Error: {errorMessage}</div>
        )}
      </div>
    </Container>
  );
};

export default withRouter(Login);

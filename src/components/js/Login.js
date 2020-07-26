import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../../contexts/FirebaseContext";
import { UserContext } from "./../../contexts/UserContext";

import * as ROUTES from "./../../constants/routes";
import { formattedErrors } from "../../constants/helpers";

import "../css/Login_signup.css";

const Login = (props) => {
  const { auth, persistence } = useContext(FirebaseContext);
  const { userData, updateUserData } = useContext(UserContext);

  useEffect(() => {
    userData && props.history.push(ROUTES.STORE);
  }, [userData, props.history]);

  const [showPassword, _setShowPassword] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };

  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");

  const [errorMessage, _setErrorMessage] = useState(null);
  const updateErrorMessage = (message) => {
    if (formattedErrors[message]) _setErrorMessage(formattedErrors[message]);
    else _setErrorMessage(message);
  };

  const isValid = () => {
    return email !== "" && password !== "";
  };

  const onSubmit = () => {
    auth.setPersistence(persistence.SESSION).then(() =>
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
            })
            .catch((error) => {
              updateErrorMessage(error.message);
            });
        })
        .catch((error) => {
          updateErrorMessage(error.message);
        })
    );
  };
  return (
    <Container>
      <div id="loginbody" className="bg-white">
        <div> </div>
        <h2 className="logintab text-dark position-relative">Login</h2>
        <div className="horizontal-line  position-relative bg-dark"></div>
        <h2 className="signuptab">
          <a href="/signup" className="text-secondary">
            Signup
          </a>
        </h2>
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
            className="accountinput-l accountinput  position-relative"
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
            className="accountinput-l accountinput  position-relative"
            name="passwordlogin"
          ></input>
          <span
            onClick={_toggleShowPassword}
            className="show3  position-relative"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          <br></br>
          <input
            type="checkbox"
            id="remember-me"
            className="position-relative"
            name="remember-me"
          ></input>
          <label for="remember-me" id="remember-label">
            Remember Me
          </label>
          <br></br>
          <button
            onClick={onSubmit}
            disabled={!isValid()}
            type="button"
            className="enterbtn  position-relative"
          >
            <p className="text-black">Login!</p>
          </button>
          <p className="text-center">
            Don't have an account? <a href="/signup">Sign up</a>
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

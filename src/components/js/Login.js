import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../../contexts/FirebaseContext";
import { UserContext } from "./../../contexts/UserContext";

import * as ROUTES from "./../../constants/routes";
import { formattedErrors } from "../../constants/helpers";

import "../css/Login_signup.css";

const Login = (props) => {
  const [showPassword, _setShowPassword] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };

  const { auth } = useContext(FirebaseContext);
  const { setUserData } = useContext(UserContext);

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
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        fetch(`https://api.youthcomputing.ca/users/${authUser.user.uid}`)
          .then((response) => response.json())
          .then((response) => {
            if (!response["error"]) {
              setUserData(response["userData"]);
              props.history.push(ROUTES.STORE);
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
      });
  };
  return (
    <Container>
      <div id="signupbody" className="bg-white">
        <div> </div>
        <h2 className="logintab text-dark">Login</h2>
        <div className="horizontal-line"></div>
        <h2 className="signuptab">
          <a href="/signup" className="text-secondary">
            Signup
          </a>
        </h2>
        <form>
          <label for="emaillogin" className="accountlabel-f">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            id="emaillogin"
            value={email}
            onChange={(event) => _setEmail(event.target.value)}
            placeholder="  Enter email here..."
            className="accountinput-l accountinput"
            name="emaillogin"
          ></input>
          <br></br>
          <label for="passwordlogin" className="accountlabel-f accountinput">
            Password:
          </label>
          <br></br>
          <input
            type={showPassword ? "text" : "password"}
            id="passwordlogin"
            value={password}
            onChange={(event) => _setPassword(event.target.value)}
            placeholder="  Enter password here..."
            className="accountinput-l accountinput"
            name="passwordlogin"
          ></input>
          <span onClick={_toggleShowPassword} className="show3">
            {showPassword ? "Hide" : "Show"}
          </span>
          <button
            onClick={onSubmit}
            disabled={!isValid()}
            type="button"
            className="enterbtn"
          >
            <p>Login!</p>
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

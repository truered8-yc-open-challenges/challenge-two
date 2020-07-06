import React, { useContext, useState } from "react";
import "../css/Login_signup.css";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import Container from "react-bootstrap/Container";
const Login = () => {
  const [showPassword, _setShowPassword] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };

  const { auth } = useContext(FirebaseContext);

  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");

  const [errorMessage, _setErrorMessage] = useState(null);

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
            localStorage.setItem(
              "userData",
              JSON.stringify(response["userData"])
            );
            window.location = "/";
          });
      })
      .catch((error) => {
        _setErrorMessage(error.message);
      });
  };
  return (
    <Container>
      <div id="signupbody">
        <div> </div>
        <h2 className="logintab text-dark">Login</h2>
        <div className="horizontal-line"></div>
        <h2 className="signuptab">
          <a href="/signup" className="text-secondary">
            Signup
          </a>
        </h2>
        <div className="horizontal-line2"></div>
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
            className="accountinput-l"
            name="emaillogin"
          ></input>
          <br></br>
          <label for="passwordlogin" className="accountlabel-f">
            Password:
          </label>
          <br></br>
          <input
            type={showPassword ? "text" : "password"}
            id="passwordlogin"
            value={password}
            onChange={(event) => _setPassword(event.target.value)}
            placeholder="  Enter password here..."
            className="accountinput-l"
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

export default Login;

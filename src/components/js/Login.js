import React from "react";
import "../css/Login_signup.css";
import Container from "react-bootstrap/Container";
import Vector from "../../../vector.svg";
const Login = () => {
  return (
    <Container>
      <img
        src={Vector}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="YouthComputing logo"
      />
      <div id="signupbody">
        <div> </div>
        <h2 className="logintab">Login</h2>
        <div className="horizontal-line"></div>
        <h2 className="signuptab">Signup</h2>
        <div className="horizontal-line2"></div>
      </div>
    </Container>
  );
};

export default Login;

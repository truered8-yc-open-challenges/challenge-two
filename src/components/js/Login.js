import React from "react";
import "../css/Login_signup.css";
import Container from "react-bootstrap/Container";
const Login = () => {
  return (
    <Container>
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

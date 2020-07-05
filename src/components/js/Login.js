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
        <form>
          <label for="emaillogin" className="accountlabel-f">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            id="emaillogin"
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
            type="password"
            id="passwordlogin"
            placeholder="  Enter password here..."
            className="accountinput-l"
            name="passwordlogin"
          ></input>
          <span className="show3">Show</span>
          <button type="button" className="enterbtn">
            <p>Login!</p>
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;

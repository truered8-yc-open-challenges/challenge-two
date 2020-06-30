import React from "react";
import "../css/Login.css";
import Container from "react-bootstrap/Container";

const Login = () => {
  return (
    <Container>
      <div id="signupbody">
        <h2 className="logintab">Login</h2>
        <div className="horizontal-line"></div>
        <h2 className="signuptab">Signup</h2>
        <div className="horizontal-line2"></div>
        <br></br>
        <form>
          <label for="fnamesignup" className="signuplabel-f">
            First name:
          </label>
          <label for="lnamesignup" className="signuplabel-l">
            Last name:
          </label>
          <br></br>
          <input
            type="text"
            id="fnamesignup"
            placeholder="  Enter first name here..."
            className="signupinput-s"
            name="fnamesignup"
          ></input>
          <input
            type="text"
            id="lnamesignup"
            placeholder="  Enter last name here..."
            className="signupinput-s"
            name="lnamesignup"
          ></input>
          <br></br>
          <br></br>
          <label for="emailsignup" className="signuplabel-f">
            Email:
          </label>
          <br></br>
          <input
            type="text"
            id="emailsignup"
            placeholder="  Enter email here..."
            className="signupinput-l"
            name="emailsignup"
          ></input>
          <br></br>
          <br></br>
          <label for="pwdsignup" className="signuplabel-f">
            Password:
          </label>
          <label for="pwd2signup" className="signuplabel-l">
            Confirm Password:
          </label>
          <br></br>
          <input
            type="password"
            id="pwdsignup"
            placeholder="  Enter password here..."
            className="signupinput-s"
            name="pwdsignup"
          ></input>
          <input
            type="text"
            id="pwd2signup"
            placeholder="  Enter password again here..."
            className="signupinput-s"
            name="pwd2signup"
          ></input>
          <span class="show">Show </span> <span class="show2">Show </span>
          <button type="button" className="enterbtn">
            <p>Sign Up!</p>
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;

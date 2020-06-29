import React from "react";
import "../css/Login.css";
import Container from "react-bootstrap/Container";

const Login = () => {
  return (
    <div id="signupbody" className="container">
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
          value="  Enter first name here..."
          className="signupinput-s"
          name="fnamesignup"
        ></input>
        <input
          type="text"
          id="lnamesignup"
          value="  Enter last name here..."
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
          value="  Enter email here..."
          className="signupinput-l"
          name="emailsignup"
        ></input>
        <br></br>
        <br></br>
        <label for="passsignup" className="signuplabel-f">
          Password:
        </label>
        <label for="pass2signup" className="signuplabel-l">
          Confirm Password:
        </label>
        <br></br>
        <input
          type="text"
          id="passsignup"
          value="  Enter first name here..."
          className="signupinput-s"
          name="passsignup"
        ></input>
        <input
          type="text"
          id="pass2signup"
          value="  Enter last name here..."
          className="signupinput-s"
          name="pass2signup"
        ></input>
        <br></br>
        <br></br>

        <button type="button" className="enterbutton">
          <p>Sign Up!</p>
        </button>
      </form>
    </div>
  );
};

export default Login;

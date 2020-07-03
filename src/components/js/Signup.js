import React, { useContext, useState } from "react";
import "../css/Login.css";
import FirebaseContext from "../../contexts/FirebaseContext";
import Container from "react-bootstrap/Container";

const Signup = () => {
  const [showPassword, _setShowPassword] = useState(false);
  const [showConfirm, _setShowConfirm] = useState(false);
  const _toggleShowPassword = () => {
    _setShowPassword(!showPassword);
  };
  const _toggleShowConfirm = () => {
    _setShowConfirm(!showConfirm);
  };

  const { auth } = useContext(FirebaseContext);
  const [firstName, _setFirstName] = useState("");
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");
  const [confirm, _setConfirm] = useState("");

  const [errorMessage, _setErrorMessage] = useState(null);

  const isValid = () => {
    return (
      password === confirm &&
      firstName !== "" &&
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
              userId: authUser.user.id,
              userName: firstName,
            }),
          });
        })
        .catch((error) => {
          _setErrorMessage(error.message);
        });
    }
  };

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
            value={firstName}
            onChange={(event) => _setFirstName(event.target.value)}
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
            value={email}
            onChange={(event) => _setEmail(event.target.value)}
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
            type={showPassword ? "text" : "password"}
            id="pwdsignup"
            value={password}
            onChange={(event) => _setPassword(event.target.value)}
            placeholder="  Enter password here..."
            className="signupinput-s"
            name="pwdsignup"
          ></input>
          <input
            type={showConfirm ? "text" : "password"}
            id="pwd2signup"
            value={confirm}
            onChange={(event) => _setConfirm(event.target.value)}
            placeholder="  Enter password again here..."
            className="signupinput-s"
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
        </form>
        {errorMessage && (
          <div className="error-message">Error: {errorMessage}</div>
        )}
      </div>
    </Container>
  );
};

export default Signup;

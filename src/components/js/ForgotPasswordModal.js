import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { FirebaseContext } from "../../contexts/FirebaseContext";

const ForgotPasswordModal = (props) => {
  const [email, _setEmail] = useState("");
  const [sent, _setSent] = useState(false);

  const [errorMessage, _setErrorMessage] = useState();
  const [loading, _setLoading] = useState(false);

  const { auth } = useContext(FirebaseContext);

  const onHide = () => {
    props.handleClose();
    _setSent(false);
  };
  const onSubmit = () => {
    _setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        _setSent(true);
        _setErrorMessage();
        _setLoading(false);
      })
      .catch((error) => {
        _setErrorMessage(error.message);
        _setLoading(false);
      });
  };

  return (
    <div id="forgot-pw">
      <Modal id="forgot-pw-modal" show={props.show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot password?</Modal.Title>
        </Modal.Header>
        {!sent ? (
          <Modal.Body>
            <Form.Label for="exampleEmail">
              Please enter the email address you signed up with:
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="exampleEmail"
              value={email}
              onChange={(event) => _setEmail(event.target.value)}
              placeholder="Enter your email"
            />
            {errorMessage && (
              <div className="error-message text-body p-sm-2">
                Error: {errorMessage}
              </div>
            )}
          </Modal.Body>
        ) : (
          <Modal.Body>
            A password reset email has been sent your inbox!
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={props.handleClose}
            className="float-left"
          >
            Close
          </Button>
          {!sent && (
            <Button variant="primary" onClick={onSubmit}>
              {loading ? (
                <div id="loading-promotion">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                "Next"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;

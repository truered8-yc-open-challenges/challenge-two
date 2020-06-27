import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import Logo from "../../../logo.svg";
import "../../css/partials.css";

const Header = () => {
  return (
    <Navbar variant="light" expand="lg">
      <Navbar.Brand href="/index.html">
        <img
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="YouthComputing logo"
        />
        Store
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/index.html">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Form inline className="mr-auto">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2 not-rounded border-white"
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

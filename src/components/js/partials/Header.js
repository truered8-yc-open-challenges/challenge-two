import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Account from "./Account";

import { SearchContext } from "./../../../contexts/SearchContext";

import Logo from "../../../logo.svg";
import "../../css/partials.css";

const Header = () => {
  const { query, setQuery } = useContext(SearchContext);

  return (
    <Navbar
      variant="light"
      expand="lg"
      sticky="top"
      className="pt-sm-4 bg-white"
    >
      <Navbar.Brand href="/">
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
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
        <Form inline className="w-50">
          <FormControl
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search prizes..."
            className="mx-sm-4 w-100 not-rounded border-white shadow"
            id="navbar-search"
          />
        </Form>
        <Account />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

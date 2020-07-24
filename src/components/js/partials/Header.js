import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Account from "./Account";
import { withRouter } from "react-router-dom";

import { UserContext } from "./../../../contexts/UserContext";
import { SearchContext } from "./../../../contexts/SearchContext";

import * as ROUTES from "./../../../constants/routes";

import Logo from "./../../../logo.svg";
import "./../../css/partials.css";

const Header = (props) => {
  const { userData } = useContext(UserContext);
  const { query, setQuery } = useContext(SearchContext);

  return (
    <Navbar
      collapseOnSelect
      id="header"
      variant="light"
      expand="lg"
      sticky="top"
      className="pt-sm-4 mb-sm-3 m-0 bg-gradient-1"
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
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userData ? (
          <Nav className="mr-auto">
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.STORE)}
              className="text-secondary shadow-none"
            >
              Home
            </Button>
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.LOGOUT)}
              className="text-secondary shadow-none"
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="mr-auto">
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.STORE)}
              className="text-secondary shadow-none"
            >
              Home
            </Button>
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.LOGIN)}
              className="text-secondary shadow-none"
            >
              Login
            </Button>
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.SIGNUP)}
              className="text-secondary shadow-none"
            >
              Sign Up
            </Button>
          </Nav>
        )}
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

export default withRouter(Header);

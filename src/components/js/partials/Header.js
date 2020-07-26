import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Account from "./Account";
import { withRouter } from "react-router-dom";

import { UserContext } from "./../../../contexts/UserContext";
import { SearchContext } from "./../../../contexts/SearchContext";

import * as ROUTES from "./../../../constants/routes";

import Logo from "./../../../logo.svg";
import "./../../css/Partials.css";

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
      <Navbar.Brand>
        <Button
          id="header-brand"
          variant="link"
          onClick={() => props.history.push(ROUTES.STORE)}
          className="text-body shadow-none"
        >
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="YouthComputing logo"
          />
          Store
        </Button>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userData ? (
          <Nav className="mr-auto">
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.STORE)}
              className="text-secondary shadow-none py-sm-1 px-sm-2"
            >
              Home
            </Button>
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.LOGOUT)}
              className="text-secondary shadow-none py-sm-1 px-sm-2"
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="">
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.STORE)}
              className="text-secondary shadow-none py-sm-1 px-sm-2"
            >
              Home
            </Button>
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.LOGIN)}
              className="text-secondary shadow-none py-sm-1 px-sm-2"
            >
              Login
            </Button>
            <Button
              variant="link"
              onClick={() => props.history.push(ROUTES.SIGNUP)}
              className="text-secondary shadow-none py-sm-1 px-sm-2"
            >
              Signup
            </Button>
          </Nav>
        )}
        <FormControl
          id="search-bar"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search prizes..."
          className="mx-auto mx-sm-4 not-rounded border-white shadow"
        />
        <Account />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Header);

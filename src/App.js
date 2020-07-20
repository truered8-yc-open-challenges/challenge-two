import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/js/Main";

import UserContextProvider from "./contexts/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  return (
    <div className="bg-gradient-1">
      <UserContextProvider>
        <Router>
          <Main />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;

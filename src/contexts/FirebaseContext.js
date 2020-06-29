import React, { createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import * as KEYS from "../constants/keys";

const firebaseAuthConfig = {
  apiKey: KEYS.FIREBASE_AUTH_API_KEY,
};

firebase.initializeApp(firebaseAuthConfig);
const auth = firebase.auth();

const FirebaseContext = createContext();

const FirebaseContextProvider = (props) => {
  return (
    <FirebaseContext.Provider value={{ auth }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;

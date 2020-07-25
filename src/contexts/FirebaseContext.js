import { createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import * as KEYS from "./../constants/keys";

const firebaseAuthConfig = {
  apiKey: KEYS.FIREBASE_AUTH_API_KEY,
};

firebase.initializeApp(firebaseAuthConfig);
const auth = firebase.auth();
const persistence = firebase.auth.Auth.Persistence;

export const FirebaseContext = createContext({ auth, persistence });

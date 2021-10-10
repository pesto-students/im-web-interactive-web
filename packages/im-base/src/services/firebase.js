import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth";

// Graphql
import { gqlClient } from "../graphql/gqlClient";
import { CREATE_USER } from "../graphql/mutation";

// Sentry
import * as Sentry from "@sentry/react";

dotenv.config();

// API Keys
let firebaseInit = {
  apiKey: process.env.REACT_APP_FB_DEV_API_KEY,
  authDomain: process.env.REACT_APP_FB_DEV_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_DEV_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_DEV_APP_ID,
  measurementId: process.env.REACT_APP_FB_DEV_MEASUREMENT_ID,
};

if (process.env.REACT_APP_NODE_ENV === "production") {
  firebaseInit = {
    apiKey: process.env.REACT_APP_FB_PROD_API_KEY,
    authDomain: process.env.REACT_APP_FB_PROD_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_PROD_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_PROD_APP_ID,
    measurementId: process.env.REACT_APP_FB_PROD_MEASUREMENT_ID,
  };
}

// Initialize Firebase
firebase.initializeApp(firebaseInit);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      gqlClient.mutate({
        mutation: CREATE_USER,
        variables: {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          emailVerified: res.user.emailVerified,
        },
      });
    })
    .catch((error) => {
      Sentry.captureMessage("Error at Login");
      Sentry.captureException(error);
    });
};

export const signInAsGuest = () => {
  auth
    .signInAnonymously()
    .then(() => {
      // Signed In
    })
    .catch((error) => {
      Sentry.captureMessage("Error at Login");
      Sentry.captureException(error);
    });
};

export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      Sentry.captureMessage("Error at Logout");
      Sentry.captureException(error);
    });
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

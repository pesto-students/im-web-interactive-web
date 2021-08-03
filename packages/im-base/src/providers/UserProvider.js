import React, { useState, useEffect, createContext } from "react";

// Components
import { auth } from "../services/firebase";

// User Context
export const UserContext = createContext({ user: null, setuser: () => {} });

const UserProvider = (props) => {
  const { children } = props;
  const [user, setuser] = useState(null);
  const value = { user, setuser };

  useEffect(() => {
    auth?.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, displayName, email, photoURL, emailVerified } = user;
        setuser({
          uid,
          displayName,
          email,
          photoURL,
          emailVerified,
        });
      }
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

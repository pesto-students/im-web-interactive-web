import React, { useState, useEffect, createContext } from "react";

// Components
import { auth } from "../services/firebase";

// User Context
export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
  const { children } = props;
  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email } = user;
        setuser({
          displayName,
          email,
        });
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;

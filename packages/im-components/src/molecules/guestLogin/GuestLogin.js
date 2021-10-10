import React from "react";

// Services
import { signInAsGuest } from "imbase/services/firebase";

// Styles
import styles from "./guestLogin.module.scss";

const GuestLogin = () => {
  return (
    <button
      type="button"
      className={styles.loginWithGoogleBtn}
      onClick={signInAsGuest}
    >
      Continue as Guest
    </button>
  );
};

GuestLogin.propTypes = {};

GuestLogin.defaultProps = {};

export default GuestLogin;

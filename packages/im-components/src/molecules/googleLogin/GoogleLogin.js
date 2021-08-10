import React from "react";

// Services
import { signInWithGoogle } from "imbase/services/firebase";

// Styles
import styles from "./googleLogin.module.scss";

const GoogleLogin = () => {
  return (
    <button
      type="button"
      className={styles.loginWithGoogleBtn}
      onClick={signInWithGoogle}
    >
      Continue with Google
    </button>
  );
};

GoogleLogin.propTypes = {};

GoogleLogin.defaultProps = {};

export default GoogleLogin;

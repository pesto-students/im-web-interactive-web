import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import Image from "imcomponents/atoms/image";
import { Title, Label } from "imcomponents/atoms/typography";
import { signInWithGoogle } from "../../services/firebase";
import { UserContext } from "../../providers/UserProvider";

// Images
import reel from "../../assets/images/reel.png";

// Styles
import styles from "./login.module.scss";

const Login = () => {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (user) {
      setredirect("/");
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Label className={styles.logo}>iFlix</Label>
      </div>
      <div className={styles.content}>
        <div className={styles.pictures}>
          <Image src={reel} className={styles.image} />
        </div>
        <div className={styles.loginForm}>
          <Title className={styles.title}>Welcome :)</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.inputField}></div>
          <div className={styles.inputField}>
            <button
              type="button"
              className={styles.loginWithGoogleBtn}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

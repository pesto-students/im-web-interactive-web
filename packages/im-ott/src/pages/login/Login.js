import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import Image from "imcomponents/atoms/image";
import { Title, Label } from "imcomponents/atoms/typography";
import { isMobile } from "imcomponents/atoms/device";
import GoogleLogin from "imcomponents/molecules/googleLogin";

// Providers
import { UserContext } from "imbase/providers/UserProvider";

// Images
import reel from "imbase/assets/images/reel.png";

// Styles
import styles from "./login.module.scss";

const Login = () => {
  const { user } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (user) {
      setredirect("/");
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (isMobile) {
    return (
      <div className={styles.containerMobile}>
        <div className={styles.navbarMobile}>
          <Label className={styles.logo}>iFlix </Label>
        </div>
        <div className={styles.loginForm}>
          <Title className={styles.title}>Welcome :)</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.inputField}></div>
          <div className={styles.inputField}>
            <GoogleLogin />
          </div>
        </div>
      </div>
    );
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
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;

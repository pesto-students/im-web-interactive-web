import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import { Title, Label } from "imcomponents/atoms/typography";
import { isMobile } from "imcomponents/atoms/device";
import Logo from "imcomponents/molecules/logo";
import GoogleLogin from "imcomponents/molecules/googleLogin";

// Providers
import { UserContext } from "imbase/providers/UserProvider";

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
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo />
          <Title className={styles.title}>Welcome to iFlix</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.googleLogin}>
            <GoogleLogin />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.animation}></div>
      <div className={styles.loginForm}>
        <div className={styles.content}>
          <Logo />
          <Title className={styles.title}>Welcome to iFlix</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.googleLogin}>
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

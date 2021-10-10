import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import { Title, Label } from "imcomponents/atoms/typography";
import { isMobile } from "imcomponents/atoms/device";
import Logo from "imcomponents/molecules/logo";
import GoogleLogin from "imcomponents/molecules/googleLogin";
import GuestLogin from "imcomponents/molecules/guestLogin";

// Utils
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

// Providers
import { UserContext } from "imbase/providers/UserProvider";

// Styles
import styles from "./login.module.scss";

const Login = () => {
  const { user } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  const homeRoute = getRoute(APPS.OTT, VIEWS.HOME);

  useEffect(() => {
    if (user) {
      setredirect(homeRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (isMobile) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo application={APPS.OTT} />
          <Title className={styles.title}>Welcome to iFlix</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.googleLogin}>
            <GoogleLogin />
          </div>
          <div className={styles.googleLogin}>
            <GuestLogin />
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
          <Logo application={APPS.OTT} />
          <Title className={styles.title}>Welcome to iFlix</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.googleLogin}>
            <GoogleLogin />
          </div>
          <div className={styles.googleLogin}>
            <GuestLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;

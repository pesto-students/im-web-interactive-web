import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Components
import Image from "imcomponents/atoms/image";
import { Title, Label } from "imcomponents/atoms/typography";
import { UserContext } from "../../providers/UserProvider";
import { logOut } from "../../services/firebase";

// Images
import reel from "../../assets/images/reel.png";

// Styles
import styles from "./logout.module.scss";

const Logout = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user != null) {
      logOut();
      console.log(user);
    }
  }, [user]);

  const handleRedirect = () => {
    history.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Label className={styles.logo}>iFlix</Label>
      </div>
      <div className={styles.content}>
        <div className={styles.pictures}>
          <Image src={reel} className={styles.image} />
        </div>
        <div className={styles.logoutForm}>
          <Title className={styles.title} level={4}>
            Yoh have been successfully logged out :)
          </Title>
          <div className={styles.inputField}>
            <button
              type="button"
              className={styles.goToLogin}
              onClick={() => handleRedirect()}
            >
              Go to login page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

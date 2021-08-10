import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "imcomponents/atoms/device";

// Components
import { Menu } from "antd";
import Logo from "imcomponents/molecules/logo";
import { UserContext } from "imbase/providers/UserProvider";
import { LogoutOutlined } from "imcomponents/atoms/icon";

// Service
import { logOut } from "imbase/services/firebase";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  const history = useHistory();
  const { setuser } = useContext(UserContext);

  const handleLogout = () => {
    logOut();
    setuser(null);
    history.push("/login");
  };

  const logoText = isMobile ? "" : "iFlix";

  return (
    <>
      <Logo text={logoText} />
      <Menu mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"logout"}>
          <div onClick={() => handleLogout()}>
            <LogoutOutlined className={styles.logout} />
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

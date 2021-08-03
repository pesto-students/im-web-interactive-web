import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// Components
import { Menu } from "antd";
import Logo from "imcomponents/molecules/logo";
import { UserContext } from "imbase/providers/UserProvider";

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

  return (
    <>
      <Logo text={"iFlix"} />
      <Menu theme="dark" mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"home"}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
        <Menu.Item key={"logout"}>
          <div onClick={() => handleLogout()}>Logout</div>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

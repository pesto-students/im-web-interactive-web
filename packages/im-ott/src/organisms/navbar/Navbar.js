import React from "react";
import { Link } from "react-router-dom";

// Components
import { Menu } from "antd";
import Logo from "imcomponents/molecules/logo";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <>
      <Logo text={"iFlix"} />
      <Menu theme="dark" mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"home"}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
        <Menu.Item key={"logout"}>
          <Link to={"/logout"}>Logout</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

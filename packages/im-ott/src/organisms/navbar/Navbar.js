import React from "react";
import { Link } from "react-router-dom";

// Components
import { Menu } from "antd";
import { VideoCameraFilled } from "imcomponents/atoms/icon";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <>
      <Link to={"/"} className={styles.brandLogo} >
        <VideoCameraFilled className={styles.brandImage} style={{ fontSize:"350%" }}/>
        <div className={styles.logo} >iFlix</div>
      </Link>
      <Menu theme="dark" mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"key1"}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

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
      <Logo text={"iFlix Studio"} />
      <Menu theme="dark" mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"key1"}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

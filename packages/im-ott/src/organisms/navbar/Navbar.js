import React from "react";

// Components
import { Menu } from "antd";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"key1"}>{"Home"}</Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

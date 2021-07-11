import React from "react";
import { Link } from "react-router-dom";

// Components
import { Menu } from "antd";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" className={styles.floatRight}>
        <Menu.Item key={"key1"}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;

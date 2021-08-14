import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "imcomponents/atoms/device";

// Components
import { Menu } from "antd";
import Logo from "imcomponents/molecules/logo";
import { UserContext } from "imbase/providers/UserProvider";
import {
  CloudUploadOutlined,
  LogoutOutlined,
  HomeOutlined,
  HomeFilled,
} from "imcomponents/atoms/icon";

// Service
import { logOut } from "imbase/services/firebase";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  const history = useHistory();
  const { setuser } = useContext(UserContext);
  const [selectedMenu, setSelectedMenu] = useState("home");

  const logoText = isMobile ? "Studio" : "iFlix Studio";
  const HomeIcon = selectedMenu === "home" ? <HomeFilled /> : <HomeOutlined />;

  const handleLogout = () => {
    logOut();
    setuser(null);
    history.push("/login");
  };

  const handleClick = (event) => {
    setSelectedMenu(event.key);
    if (event.key === "upload") {
      history.push("/upload");
    }
    if (event.key === "home") {
      history.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <Logo text={logoText} />
      <BrowserView className={styles.browserView}>
        <Menu
          mode="horizontal"
          className={styles.footerMenu}
          onClick={handleClick}
        >
          <Menu.Item
            className={styles.menuItem}
            key="home"
            icon={HomeIcon}
          ></Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key="upload"
            icon={<CloudUploadOutlined />}
          ></Menu.Item>
          <Menu.Item
            key={"logout"}
            className={styles.menuItem}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          ></Menu.Item>
        </Menu>
      </BrowserView>
      <MobileView>
        <Menu
          mode="horizontal"
          className={styles.footerMenu}
          onClick={handleClick}
        >
          <Menu.Item
            key={"logout"}
            className={styles.menuItem}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          ></Menu.Item>
        </Menu>
      </MobileView>
    </div>
  );
}

export default Navbar;

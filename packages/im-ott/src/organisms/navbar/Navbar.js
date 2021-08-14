import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { isMobile, BrowserView, MobileView } from "imcomponents/atoms/device";

// Components
import { Menu } from "antd";
import Logo from "imcomponents/molecules/logo";
import { UserContext } from "imbase/providers/UserProvider";
import {
  LogoutOutlined,
  HomeOutlined,
  SearchOutlined,
  HomeFilled,
  BellOutlined,
  BellFilled,
  HeartOutlined,
  HeartFilled,
} from "imcomponents/atoms/icon";

// Service
import { logOut } from "imbase/services/firebase";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { setuser } = useContext(UserContext);

  const handleLogout = () => {
    logOut();
    setuser(null);
    history.push("/login");
  };

  const HomeIcon = selectedMenu === "home" ? <HomeFilled /> : <HomeOutlined />;
  const LikesIcon =
    selectedMenu === "likes" ? <HeartFilled /> : <HeartOutlined />;
  const NotificationsIcon =
    selectedMenu === "notifications" ? <BellFilled /> : <BellOutlined />;

  const handleClick = (event) => {
    setSelectedMenu(event.key);
    if (event.key === "likes") {
      history.push("/watchlist");
    }
    if (event.key === "home") {
      history.push("/");
    }
    if (event.key === "search") {
      history.push("/movie/search");
    }
  };

  return (
    <div className={styles.container}>
      <Logo text={"iFlix"} />
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
            key="search"
            icon={<SearchOutlined style={{ fontWeight: "bold" }} />}
          ></Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key="likes"
            icon={LikesIcon}
          ></Menu.Item>
          <Menu.Item
            className={styles.menuItem}
            key="notifications"
            icon={NotificationsIcon}
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

import React, { useState } from "react";

// Components
import Menu from "imcomponents/atoms/menu";
import {
  HomeOutlined,
  SearchOutlined,
  HomeFilled,
  BellOutlined,
  BellFilled,
  HeartOutlined,
  HeartFilled,
} from "imcomponents/atoms/icon";

// Styles
import styles from "./footerMenu.module.scss";

function FooterMenu() {
  const [selectedMenu, setSelectedMenu] = useState("home");

  const handleClick = (event) => {
    setSelectedMenu(event.key);
  };

  const HomeIcon = selectedMenu === "home" ? <HomeFilled /> : <HomeOutlined />;
  const LikesIcon =
    selectedMenu === "likes" ? <HeartFilled /> : <HeartOutlined />;
  const NotificationsIcon =
    selectedMenu === "notifications" ? <BellFilled /> : <BellOutlined />;
  return (
    <div className={styles.container}>
      <Menu
        onClick={handleClick}
        className={styles.footerMenu}
        mode="inline"
        inlineIndent={16}
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
      </Menu>
    </div>
  );
}

export default FooterMenu;

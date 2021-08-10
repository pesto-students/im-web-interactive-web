import React, { useState } from "react";

// Components
import Menu from "imcomponents/atoms/menu";
import Drawer from "imcomponents/atoms/drawer";
import Notification from "imcomponents/molecules/notification";
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
  const [visible, setVisible] = useState(false);

  const handleClick = (event) => {
    setSelectedMenu(event.key);
    if (event.key === "notifications") {
      setVisible(true);
    }
  };

  const onClose = () => {
    setVisible(false);
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
      <Drawer
        title="Notifications"
        placement={"bottom"}
        closable={true}
        onClose={onClose}
        visible={visible}
        height={"100vh"}
        key={"notification-drawer"}
      >
        {selectedMenu === "notifications" && <Notification />}
      </Drawer>
    </div>
  );
}

export default FooterMenu;

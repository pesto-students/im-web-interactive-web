import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import Menu from "imcomponents/atoms/menu";
import Drawer from "imcomponents/atoms/drawer";
import Notification from "imcomponents/molecules/notification";
import SearchMovie from "../../../searchMovie";
import {
  HomeOutlined,
  SearchOutlined,
  HomeFilled,
  BellOutlined,
  BellFilled,
  HeartOutlined,
  HeartFilled,
} from "imcomponents/atoms/icon";

// Utils
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

// Styles
import styles from "./footerMenu.module.scss";

function FooterMenu() {
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [visible, setVisible] = useState(false);

  const watchlistRoute = getRoute(APPS.OTT, VIEWS.WATCHLIST);
  const homeRoute = getRoute(APPS.OTT, VIEWS.HOME);

  const handleClick = (event) => {
    setSelectedMenu(event.key);
    if (event.key === "notifications") {
      setSelectedTitle("Notifications");
      setVisible(true);
    }
    if (event.key === "likes") {
      history.push(watchlistRoute);
    }
    if (event.key === "home") {
      history.push(homeRoute);
    }
    if (event.key === "search") {
      setSelectedTitle("Search Movie");
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
          disabled={true}
        ></Menu.Item>
      </Menu>
      <Drawer
        title={selectedTitle}
        placement={"bottom"}
        closable={true}
        onClose={onClose}
        visible={visible}
        height={"100vh"}
        key={"notification-drawer"}
      >
        {selectedMenu === "notifications" ? <Notification /> : <SearchMovie />}
      </Drawer>
    </div>
  );
}

export default FooterMenu;

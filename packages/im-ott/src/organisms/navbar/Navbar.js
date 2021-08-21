import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BrowserView, MobileView } from "imcomponents/atoms/device";

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

// Utils
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

// Styles
import styles from "./navbar.module.scss";

function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { setuser } = useContext(UserContext);

  const watchlistRoute = getRoute(APPS.OTT, VIEWS.WATCHLIST);
  const movieSearchRoute = getRoute(APPS.OTT, VIEWS.SEARCHMOVIE);
  const homeRoute = getRoute(APPS.OTT, VIEWS.HOME);

  useEffect(() => {
    if (location.pathname === watchlistRoute) {
      setSelectedMenu("likes");
    } else if (location.pathname === movieSearchRoute) {
      setSelectedMenu("search");
    } else if (location.pathname === homeRoute) {
      setSelectedMenu("home");
    } else {
      setSelectedMenu(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
      history.push(watchlistRoute);
    }
    if (event.key === "home") {
      history.push(homeRoute);
    }
    if (event.key === "search") {
      history.push(movieSearchRoute);
    }
  };

  return (
    <div className={styles.container}>
      <Logo text={"iFlix"} application={APPS.OTT} />
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
            disabled={true}
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

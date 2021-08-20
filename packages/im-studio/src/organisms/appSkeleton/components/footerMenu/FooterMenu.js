import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import Menu from "imcomponents/atoms/menu";
import {
  HomeOutlined,
  HomeFilled,
  CloudUploadOutlined,
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
  const uploadRoute = getRoute(APPS.STUDIO, VIEWS.UPLOAD);
  const homeRoute = getRoute(APPS.STUDIO, VIEWS.HOME);

  const handleClick = (event) => {
    setSelectedMenu(event.key);

    if (event.key === "upload") {
      history.push(uploadRoute);
    }
    if (event.key === "home") {
      history.push(homeRoute);
    }
  };

  const HomeIcon = selectedMenu === "home" ? <HomeFilled /> : <HomeOutlined />;
  const UploadIcon =
    selectedMenu === "upload" ? (
      <CloudUploadOutlined />
    ) : (
      <CloudUploadOutlined />
    );
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
          key="upload"
          icon={UploadIcon}
        ></Menu.Item>
      </Menu>
    </div>
  );
}

export default FooterMenu;

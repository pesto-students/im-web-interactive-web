import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "imcomponents/atoms/device";
import cx from "classnames";

// Styles
import styles from "./footerContent.module.scss";

// Components
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
} from "imcomponents/atoms/icon";

function FooterContent() {
  const footerWrapperclassName = cx(styles.footerWrapper, {
    [styles.webWrapper]: !isMobile,
    [styles.mobileWrapper]: isMobile,
  });
  return (
    <div className={styles.footerContainer}>
      <div className={footerWrapperclassName}>
        <div className={styles.socialContainer}>
          <Link to="#" className={styles.social}>
            <FacebookFilled />
          </Link>
          <Link to="#" className={styles.social}>
            <TwitterOutlined />
          </Link>
          <Link to="#" className={styles.social}>
            <InstagramOutlined />
          </Link>
        </div>
        <div className={styles.footerLogo}>
          © 2021 iflix Media. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default FooterContent;

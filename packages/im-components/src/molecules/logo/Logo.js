import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import { VideoCameraFilled } from "imcomponents/atoms/icon";
import { isMobile } from "imcomponents/atoms/device";

// Styles
import styles from "./logo.module.scss";

// Constants
import { EMPTY_STRING } from "imbase/constants/base.constants";

const Logo = (props) => {
  const { text, children } = props;
  const textStyle = isMobile ? styles.textMobile : styles.text;
  const imgStyle = isMobile ? styles.imageMobile : styles.image;
  return (
    <>
      <Link to={"/"} className={styles.logo}>
        <VideoCameraFilled className={imgStyle} />
        <div className={textStyle}>{text}</div>
      </Link>
    </>
  );
};

Logo.propTypes = {
  text: PropTypes.string,
  children: PropTypes.element,
};

Logo.defaultProps = {
  text: EMPTY_STRING,
};

export default Logo;

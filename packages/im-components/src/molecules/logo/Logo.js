import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import { VideoCameraFilled } from "imcomponents/atoms/icon";

// Styles
import styles from "./logo.module.scss";

// Constants
import { EMPTY_STRING } from "imbase/constants/base.constants";

const Logo = ( props ) => {
  const { text, children } = props
  return (
    <>
      <Link to={"/"} className={styles.logo} >
        <VideoCameraFilled className={styles.image} style={{ fontSize:"250%" }} />
        <div className={styles.text} >{text}</div>
      </Link>
    </>
  );
}

Logo.propTypes = {
  text: PropTypes.string
};

Logo.defaultProps = {
  text: EMPTY_STRING
};

export default Logo;
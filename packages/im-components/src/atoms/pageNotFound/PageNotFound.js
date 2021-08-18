import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

//Components
import { isMobile } from "imcomponents/atoms/device";

//Styles
import styles from "./pageNotFound.module.scss";

const PageNotFound = (props) => {
  const { url, message, width, height } = props;
  let style = {
    width: width,
    height: height,
  };

  const wrapperClassName = cx(styles.wrapper, {
    [styles.mobileWrapper]: isMobile,
  });

  if (isMobile) {
    style = {
      width: "30rem",
      height: "auto",
    };
  }
  return (
    <div className={wrapperClassName}>
      <img src={url} alt={message} style={style} />
      <div className={styles.info}>
        <h3>{message}</h3>
      </div>
    </div>
  );
};

PageNotFound.propTypes = {
  url: PropTypes.string,
  message: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

PageNotFound.defaultProps = {
  url: "https://i.imgur.com/Q2BAOd2.png",
  message: "404! This page is not on the Map.",
  width: "40rem",
  height: "40rem",
};

export default PageNotFound;

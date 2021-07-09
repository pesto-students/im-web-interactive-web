import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Components
import { Title, Label } from "imcomponents/atoms/typography";

// Styles
import styles from "./error.module.scss";

const Error = ({ message, className }) => {
  const errorClassName = cx(styles.container, className);
  return (
    <div className={errorClassName}>
      <Title className={styles.title}>Error</Title>
      <Label className={styles.message}>{message}</Label>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

Error.defaultProps = {
  message: "",
  className: undefined,
};

export default Error;

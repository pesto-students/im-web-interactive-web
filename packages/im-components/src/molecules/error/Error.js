import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Components
import PageNotFound from "imcomponents/atoms/pageNotFound";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Styles
import styles from "./error.module.scss";

const Error = ({ message, className }) => {
  const errorClassName = cx(styles.container, className);
  if (_isEmpty(message)) {
    message = "An Error has occured! Please try to refresh or contact support";
  }
  return (
    <div className={errorClassName}>
      <PageNotFound message={message} />
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

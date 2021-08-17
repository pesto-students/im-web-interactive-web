import React from "react";
import PropTypes from "prop-types";

// Components
import { Button as AntdButton } from "antd";

// Helpers
import { getButtonClassName } from "./helpers/button.general";

// Constants
import BUTTON_TYPES from "./constants/button.types";
import BUTTON_SIZES from "./constants/button.sizes";

const Button = (props) => {
  const { className, label, type, children, ...restProps } = props;
  const buttonClassName = getButtonClassName(className, type);
  return (
    <AntdButton {...restProps} type={type} className={buttonClassName}>
      {label || children}
    </AntdButton>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
};

Button.defaultProps = {
  className: undefined,
  label: undefined,
  type: BUTTON_TYPES.PRIMARY,
  size: BUTTON_SIZES.MEDIUM,
};

export default Button;

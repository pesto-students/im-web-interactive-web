import React from "react";
import PropTypes from "prop-types";

// Components
import { Input as AntdInput } from "antd";

// Constants
import SIZES from "./constants/input.sizes";
import TYPES from "./constants/input.types";

const Input = (props) => {
  const { type, size, placeholder, ...restProps } = props;
  return (
    <AntdInput
      {...restProps}
      type={type}
      size={size}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: TYPES.TEXT,
  size: SIZES.MEDIUM,
  placeholder: "",
};

export default Input;

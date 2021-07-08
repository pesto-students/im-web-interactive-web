import React from "react";
import PropTypes from "prop-types";

// Components
import { Input as AntdInput } from "antd";

// Constants
import INPUT_SIZES from "./constants/input.sizes";

const Input = (props) => {
  const { size, placeholder, ...restProps } = props;
  return (
    <AntdInput {...restProps} size={size} placeholder={placeholder}/>
  );
};

Input.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  size: INPUT_SIZES.MEDIUM,
};

export default Input;

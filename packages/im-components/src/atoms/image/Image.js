import React from "react";
import PropTypes from "prop-types";

// Component
import { Image as AntdImage } from "antd";

// Image
import fallbackImg from "../../../public/fallback.png";

const Image = (props) => {
  const { className, src, ...restProps } = props;

  return <AntdImage {...restProps} src={src} className={className} />;
};

Image.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number,
  src: PropTypes.string,
  fallback: PropTypes.string,
  preview: PropTypes.bool,
};

Image.defaultProps = {
  className: undefined,
  width: undefined,
  height: undefined,
  src: "",
  preview: false,
  fallback: fallbackImg,
};
export default Image;

import React from "react";
import PropTypes from "prop-types";

// Icons
import { LeftOutlined, RightOutlined } from "../icon";

const SliderArrow = (props) => {
  const { className, style, type, onClick } = props;
  const styles = {
    display: "block",
    color: "#fff",
    fontSize: "4rem",
    twoToneColor: "#fff",
    width: "4rem",
    height: "4rem",
    ...style,
  };

  if (type === "next") {
    return (
      <RightOutlined className={className} style={styles} onClick={onClick} />
    );
  }
  if (type === "prev") {
    return (
      <LeftOutlined className={className} style={styles} onClick={onClick} />
    );
  }
};

SliderArrow.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

SliderArrow.defaultProps = {
  className: undefined,
  type: undefined,
  onClick: () => {},
};

export default SliderArrow;
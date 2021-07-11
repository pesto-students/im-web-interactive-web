import React from "react";
import PropTypes from "prop-types";

// Components
import { Carousel } from "antd";
import { SLIDER_SETTINGS } from "./constants/slider.constant";
import SliderArrow from "./SliderArrow";

const Slider = (props) => {
  const { children } = props;
  const settings = {
    ...SLIDER_SETTINGS,
    nextArrow: <SliderArrow type="next" />,
    prevArrow: <SliderArrow type="prev" />,
  };

  return (
    <div className="ant-slider-carousel">
      <Carousel {...settings}>{children}</Carousel>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.element
};

export default Slider;

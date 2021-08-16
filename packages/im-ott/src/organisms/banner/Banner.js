import React from "react";

// Components
import { Carousel } from "antd";
import { isMobile } from "imcomponents/atoms/device";
import Image from "imcomponents/atoms/image";

// Styles
import styles from "./banner.module.scss";

const Banner = () => {
  const imgHeight = isMobile ? 200 : 700;
  return (
    <Carousel autoplay>
      <div>
        <Image
          src="https://images.hungama.com/c/1/4e5/067/5261782/5261782_1280x800.jpg"
          height={imgHeight}
          width={"100%"}
          className={styles.thumb}
        />
      </div>
    </Carousel>
  );
};

export default Banner;

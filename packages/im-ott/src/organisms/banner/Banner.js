import React from "react";

// Components
import { Carousel } from "antd";
import Image from "imcomponents/atoms/image";

// Styles
import styles from './banner.module.scss';

// Images
import BannerImage1 from '../../assets/images/Banner-image-1.jpg';
import BannerImage2 from '../../assets/images/Banner-image-2.jpg';

const Banner = ({onlyOne}) => {
  return (
    <Carousel autoplay>
      <div>
        <Image
          src={BannerImage1}
          width={"100%"}
          className={styles.bannerImage}
        />
      </div>
      {!onlyOne && <div>
        <Image
          src={BannerImage2}
          width={"100%"}
          className={styles.bannerImage}
        />
      </div>}
    </Carousel>
  );
};

export default Banner;

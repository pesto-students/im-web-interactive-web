import React from "react";

// Components
import { Carousel } from "antd";
import Image from "imcomponents/atoms/image";

// Styles
import styles from "./banner.module.scss";

const Banner = () => {
  return (
    <Carousel autoplay>
      <div>
        <Image
          src="https://free4kwallpapers.com/uploads/originals/2020/11/14/interstellar-space-wallpaper.jpg"
          height={500}
          width={"100%"}
        />
      </div>
      <div className={styles.bannerContent}>
        <Image
          src="https://wallpaperaccess.com/full/788693.jpg"
          height={500}
          width={"100%"}
        />
      </div>
      <div>
        <Image
          src="https://wallpaper.dog/large/10915284.jpg"
          height={500}
          width={"100%"}
        />
      </div>
      <div>
        <Image
          src="https://wallpaperaccess.com/full/37945.jpg"
          height={500}
          width={"100%"}
        />
      </div>
      <div>
        <Image
          src="https://wallpapermemory.com/uploads/601/fantastic-four-movie-wallpaper-ultra-hd-4k-70140.jpg"
          height={500}
          width={"100%"}
        />
      </div>
    </Carousel>
  );
};

export default Banner;

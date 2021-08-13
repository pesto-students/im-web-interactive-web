import React from "react";

// Components
import { Carousel } from "antd";
import Image from "imcomponents/atoms/image";
import { Title, Label } from "imcomponents/atoms/typography";

// Styles
import styles from "./banner.module.scss";

const Banner = () => {
  return (
    <Carousel autoplay>
      <div>
        {/* <div className={styles.bannerOverlay}>
          <Title level={3}>Intersteller</Title>
          <Label>n Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home.</Label>
        </div> */}
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

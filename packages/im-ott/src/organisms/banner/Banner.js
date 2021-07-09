import React from "react";

// Components
import { Carousel } from "antd";
import Image from "imcomponents/atoms/image";
import { Title, Label } from "imcomponents/atoms/typography";

// Styles
import styles from "./banner.module.scss";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <div className={styles.bannerOverlay}>
          <Title level={3}>King Kong</Title>
          <Label>
            King Kong is a 2005 epic monster adventure film co-written,
            produced, and directed by Peter Jackson. ... Set in 1933, it follows
            the story of an ambitious filmmaker who coerces his cast and hired
            ship crew to travel to the mysterious Skull Island.
          </Label>
        </div>
        <Image src="https://picsum.photos/id/237/800/400" height={400} />
      </div>
      <div className={styles.bannerContent}>
        <Image src="https://picsum.photos/id/238/800/400" height={400} />
      </div>
      <div>
        <Image src="https://picsum.photos/id/239/800/400" height={400} />
      </div>
      <div>
        <Image src="https://picsum.photos/id/240/800/400" height={400} />
      </div>
    </Carousel>
  );
};

export default Banner;

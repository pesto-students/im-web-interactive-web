import React from "react";

// Components
import { Carousel } from "antd";
import { Title, Label } from "imcomponents/atoms/typography";

// Styles
import styles from "./watchPartyTips.module.scss";

function WatchPartyTips() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Watch Party Tips</Title>
      </div>

      <Carousel autoplay>
        <div className={styles.tipContainer}>
          <Label className={styles.tip}>
            The person who created the Watch Party controls the video, including
            pause, play, rewind, and fast forwarding. Each participant controls
            his or her own audio and subtitle settings.
          </Label>
        </div>
        <div className={styles.tipContainer}>
          <Label className={styles.tip}>
            To add more people, share the Watch Party link.
          </Label>
        </div>
      </Carousel>
    </div>
  );
}

export default WatchPartyTips;

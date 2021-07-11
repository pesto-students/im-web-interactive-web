import React, { useEffect, useState } from "react";

// Lodash
import _noop from "lodash/noop";

// Components
import Image from "imcomponents/atoms/image";
import { Label } from "imcomponents/atoms/typography";

// Images
import reel from "../../assets/images/reel.png";

// Styles
import styles from "./appLoader.module.scss";

let setAppLoaderVisibility = _noop;

const AppLoader = () => {
  const [visible, setVisibility] = useState(false);

  setAppLoaderVisibility = setVisibility;

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={reel} className={styles.image} />
        <Label className={styles.title}>
          <span>i</span>
          <span>F</span>
          <span>l</span>
          <span>i</span>
          <span>x</span>
        </Label>
      </div>
    </div>
  );
};

AppLoader.setVisibility = (visible) => {
  setAppLoaderVisibility(visible);
};

export default AppLoader;

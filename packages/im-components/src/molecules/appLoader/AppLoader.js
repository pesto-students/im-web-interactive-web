import React, { useState } from "react";

// Lodash
import _noop from "lodash/noop";

// Components
import Logo from "../logo";

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
    <div className={`${styles.container} ${styles.animation}`}>
      <div className={styles.logo}>
        <Logo />
      </div>
    </div>
  );
};

AppLoader.setVisibility = (visible) => {
  setAppLoaderVisibility(visible);
};

export default AppLoader;

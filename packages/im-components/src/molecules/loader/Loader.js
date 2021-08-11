import React from "react";
import Spin from "../../atoms/spin";

// Styles
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.spinContainer}>
      <Spin size="large" tip={"Loading..."} className={styles.spin} />
    </div>
  );
};

export default Loader;

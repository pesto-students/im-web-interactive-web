import React from "react";
import cx from "classnames";

// Styles
import styles from "./appsList.module.scss";

function AppsList() {
  const ottClassName = cx(styles.appTile, styles.appTitle, styles.ottApp);
  const studioClassName = cx(styles.appTile, styles.appTitle, styles.studioApp);
  return (
    <div className={styles.container}>
      <div className={styles.apps}>
        <div className={styles.app}>
          <div className={ottClassName}>App</div>
        </div>
        <div className={styles.app}>
          <div className={studioClassName}>Studio</div>
        </div>
      </div>
    </div>
  );
}

export default AppsList;

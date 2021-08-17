import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Readers
import OverlayReader from "imbase/readers/Overlay";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Styles
import styles from "./overlay.module.scss";

const Overlay = ({ overlay, currentTime, seekTo }) => {
  const [selected, setSelected] = useState(null);

  const overlayId = OverlayReader.id(overlay);
  const overlayTitle = OverlayReader.title(overlay);
  const overlayJumpPoint = OverlayReader.jumpPoint(overlay);
  const overlayLeftAction = OverlayReader.leftAction(overlay);
  const overlayLeftLabel = OverlayReader.leftLabel(overlay);
  const overlayRightAction = OverlayReader.rightAction(overlay);
  const overlayRightLabel = OverlayReader.rightLabel(overlay);

  const buttonLeftCss = selected === "left" ? styles.selected : null;
  const buttonRightCss = selected === "right" ? styles.selected : null;

  const handleOnClick = (action) => {
    setSelected(action);
  };

  useEffect(() => {
    return () => {
      if (selected === "left" && overlayJumpPoint + 10 - currentTime === 1) {
        seekTo(overlayLeftAction);
      } else if (
        selected === "right" &&
        overlayJumpPoint + 10 - currentTime === 1
      ) {
        seekTo(overlayRightAction);
      }
    };
  }, [
    seekTo,
    selected,
    overlayLeftAction,
    overlayRightAction,
    currentTime,
    overlayJumpPoint,
  ]);

  return (
    <div key={overlayId} className={styles.overlayWrapper}>
      <span className={styles.timeLeft}>
        {overlayJumpPoint + 10 - currentTime}
      </span>
      <div className={styles.details}>
        <h3>{overlayTitle}</h3>
        <div className={styles.center}>
          <button
            className={buttonLeftCss}
            onClick={() => handleOnClick("left")}
          >
            {overlayLeftLabel}
          </button>
          <button
            className={buttonRightCss}
            onClick={() => handleOnClick("right")}
          >
            {overlayRightLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

Overlay.propTypes = {
  overlay: PropTypes.object,
  currentTime: PropTypes.number,
  seekTo: PropTypes.func,
};

Overlay.defaultProps = {
  overlay: EMPTY_OBJECT,
  currentTime: 0,
  seekTo: () => {},
};

export default Overlay;

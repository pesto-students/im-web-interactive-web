import cx from "classnames";

// Constants
import BUTTON_TYPES from "../constants/button.types";

// Styles
import styles from "../button.module.scss";

export const getButtonClassName = (classNameFromProps, buttonType) => {
  return cx(classNameFromProps, styles.button, {
    [styles.primaryButton]: buttonType === BUTTON_TYPES.PRIMARY,
    [styles.secondaryButton]: buttonType === BUTTON_TYPES.SECONDARY,
    [styles.tertiaryButton]: buttonType === BUTTON_TYPES.TERTIARY,
  });
};

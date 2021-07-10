import cx from "classnames";

// Styles
import styles from "../filmlist.module.scss";

export const getFilmListClassName = (classNameFromProps, isFeatured) => {
  return cx(classNameFromProps, styles.filmCard, {
    [styles.filmSpacing]: !isFeatured,
  });
};

import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { isMobile } from "imcomponents/atoms/device";

// Lodash
import _times from "lodash/times";

// Icon
import { StarTwoTone } from "imcomponents/atoms/icon";

// Styles
import styles from "./filmcard.module.scss";

const FilmCard = (props) => {
  const {
    title,
    imgSrc,
    genre,
    rating,
    isFeatured,
    description,
    alignRight,
    showDetails,
  } = props;

  const filmCardContainerClassname = cx(styles.filmCard, {
    [styles.alignRight]: alignRight,
    [styles.alignBottom]: !alignRight,
  });

  const filmImageClassName = cx(styles.filmImage, {
    [styles.medium]: (isFeatured && isMobile) || (!isFeatured && !isMobile),
    [styles.large]: isFeatured && !isMobile,
    [styles.xsmall]: !isFeatured && isMobile,
  });

  const detailsClassName = cx(styles.details, {
    [styles.medium]: (isFeatured && isMobile) || (!isFeatured && !isMobile),
    [styles.large]: isFeatured && !isMobile,
    [styles.xsmall]: !isFeatured && isMobile,
    [styles.detailsRightPadding]: alignRight
  });
  return (
    <div className={filmCardContainerClassname}>
      <img className={filmImageClassName} src={imgSrc} alt={title} />
      {showDetails && (
        <div className={detailsClassName}>
          <div>
            <span className={styles.tag}>{genre && genre.toUpperCase()}</span>

            {_times(rating, () => (
              <StarTwoTone twoToneColor="#ffbf00" />
            ))}
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

FilmCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
  imgSrc: PropTypes.string,
};

FilmCard.defaultProps = {
  className: undefined,
  title: undefined,
  year: undefined,
  imgSrc: undefined,
};

export default FilmCard;

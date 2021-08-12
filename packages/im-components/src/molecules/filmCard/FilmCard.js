import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

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

  const filmCardContainerClassname = cx(styles.filmcard, {
    [styles.alignRight]: alignRight,
    [styles.alignBottom]: !alignRight,
  });
  const imgStyle = isFeatured ? styles.filmCardImgFeatured : styles.filmCardImg;
  const descriptionStyle = isFeatured
    ? styles.descriptionFeatured
    : styles.description;
  const titleStyle = isFeatured ? styles.titleFeatured : styles.title;

  return (
    <div className={filmCardContainerClassname}>
      <img className={imgStyle} src={imgSrc} alt={title} />
      <div className={styles.relative}>
        {showDetails && (
          <div className={styles.details}>
            <div>
              <span className={styles.tag}>{genre && genre.toUpperCase()}</span>
            </div>
            {_times(rating, () => (
              <StarTwoTone twoToneColor="#ffbf00" />
            ))}
            <p className={titleStyle}>{title}</p>
            <p className={descriptionStyle}>{description}</p>
          </div>
        )}
      </div>
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

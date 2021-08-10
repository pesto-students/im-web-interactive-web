import React from "react";
import PropTypes from "prop-types";

// Lodash
import _times from "lodash/times";

// Component
import Tag from "imcomponents/atoms/tag";

// Icon
import { StarTwoTone } from "imcomponents/atoms/icon";

// Styles
import styles from "./filmcard.module.scss";

const FilmCard = (props) => {
  const { className, title, imgSrc, genre, rating, isFeatured, description, ...restProps } =
    props;
  const imgStyle = isFeatured ? styles.filmCardImgFeatured : styles.filmCardImg;
  const descriptionStyle = isFeatured ? styles.descriptionFeatured : styles.description;
  const titleStyle = isFeatured ? styles.titleFeatured : styles.title;

  return (
    <div className={styles.filmcard} {...restProps}>
      <img className={imgStyle} src={imgSrc} alt={title} />
      <div className={styles.relative}>
        <div className={styles.details}>
          <div>
              <span className={styles.tag} >{genre && genre.toUpperCase()}</span>
          </div>
          {_times(rating, () => (
            <StarTwoTone twoToneColor="#fff" />
          ))}
          <p className={titleStyle}>{title}</p>
          <p className={descriptionStyle}>{description}</p>
        </div>
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

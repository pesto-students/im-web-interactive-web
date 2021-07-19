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
  const { className, title, imgSrc, genre, rating, isFeatured, ...restProps } =
    props;
  const imgStyle = isFeatured ? styles.filmCardImgFeatured : styles.filmCardImg;

  return (
    <div className={styles.filmcard} {...restProps}>
      <img className={imgStyle} src={imgSrc} alt={title} />
      <div className={styles.relative}>
        <div className={styles.details}>
          <div>
            <Tag className={styles.tag} color={"#1d1d1d"}>
              <span>{genre}</span>
            </Tag>
          </div>
          {_times(rating, () => (
            <StarTwoTone twoToneColor="#fff" />
          ))}
          <p className={styles.title}>{title}</p>
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

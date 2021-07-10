import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import { Title } from "imcomponents/atoms/typography";

// Helpers
import { getFilmListClassName } from "./helpers/filmlist.general";

// Styles
import styles from "./filmlist.module.scss";

// Test Data
import movieJson from "../../mock.json";

const FilmList = (props) => {
  const { label, isFeatured, className } = props;
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    Promise.resolve(movieJson).then((mvList) => {
      setMovieList(mvList);
    });
  }, []);

  const filmListClassName = getFilmListClassName(className, isFeatured);

  return (
    <div className={styles.horizontalList}>
      <Title level={2}>{label}</Title>
      {movieList.map((val, index) => {
        return (
          <FilmCard
            className={filmListClassName}
            key={val.id}
            title={val.title}
            year={val.year}
            imgSrc={val.posterurl}
            isFeatured={isFeatured}
          />
        );
      })}
    </div>
  );
};

FilmList.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  isFeatured: PropTypes.bool,
};

FilmList.defaultProps = {
  className: undefined,
  label: undefined,
  isFeatured: false,
};

export default FilmList;

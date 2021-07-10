import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import { Title } from "imcomponents/atoms/typography";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";
import { Slider, SLIDER_SETTINGS } from "imcomponents/atoms/slider";

// Utils
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Readers
import FilmReader from "imbase/readers/Film";

// Helpers
import { getFilmListClassName } from "./helpers/filmlist.general";

// Icon
import { RightOutlined } from "imcomponents/atoms/icon";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockDataWatchlist.json";

// Styles
import styles from "./filmlist.module.scss";

const renderMovie = (filmDetails = EMPTY_OBJECT, isFeatured) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc = FilmReader.thumbnail(filmDetails);

  const filmListClassName = getFilmListClassName(isFeatured);

  return (
    <Link to={`film/${filmId}`}>
      <FilmCard
        key={filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
        className={filmListClassName}
        isFeatured={isFeatured}
      />
    </Link>
  );
};

const FilmList = (props) => {
  const [loading, setLoading] = useState(true);
  const { label, isFeatured } = props;
  const [movieList, setMovieList] = useState(EMPTY_ARRAY);
  const [error, setError] = useState(EMPTY_OBJECT);

  useEffect(() => {
    Promise.resolve(MOCK_DATA)
      .then((response) => {
        const films = getDataFromResponse(response);
        setMovieList(films);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.horizontalList}>
      <Title level={4}>
        {label} &nbsp; <RightOutlined />
      </Title>
      <Slider {...SLIDER_SETTINGS}>
        {_map(movieList, (movie) => renderMovie(movie, isFeatured))}
      </Slider>
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

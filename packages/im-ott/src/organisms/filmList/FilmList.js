import React, { useState, useEffect, useRef } from "react";
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

// Utils
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Readers
import FilmReader from "imbase/readers/Film";

// Helpers
import { getFilmListClassName } from "./helpers/filmlist.general";

// Icon
import { LeftOutlined, RightOutlined } from "imcomponents/atoms/icon";

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

  return (
    <Link to={`film/${filmId}`}>
      <FilmCard
        key={filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
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
  const filmListRef = useRef();
  const stylesInline = {
    display: "block",
    color: "#ccc",
    fontSize: "4rem",
    twoToneColor: "#fff",
    width: "4rem",
    height: "4rem",
  };

  const filmListContainer = getFilmListClassName(isFeatured);

  // Handle Scrolling by increment / decreamenting scroll left
  const handleNav = (direction) => {
    if (direction === "left") {
      filmListRef.current.scrollLeft -= 500;
    } else {
      filmListRef.current.scrollLeft += 500;
    }
  };

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
    <div className={styles.mt1}>
      <Title level={4}>
        {label} &nbsp; <RightOutlined />
      </Title>
      <div className={filmListContainer}>
        <div className={styles.filmArrow}>
          <LeftOutlined
            style={stylesInline}
            onClick={() => handleNav("left")}
          />
        </div>
        <div className={styles.navItems} ref={filmListRef}>
          {_map(movieList, (movie) => renderMovie(movie, isFeatured))}
        </div>
        <div className={styles.filmArrow}>
          <RightOutlined
            style={stylesInline}
            onClick={() => handleNav("right")}
          />
        </div>
      </div>
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "imcomponents/atoms/device";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import FilmCardMobile from "imcomponents/molecules/filmCardMobile";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { NEW_RELEASES } from "imbase/graphql/queries";

// Readers
import FilmReader from "imbase/readers/Film";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "imbase/constants/base.constants";

// Styles
import styles from "./watchList.module.scss";

const renderFilm = (filmDetails = EMPTY_OBJECT) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc = FilmReader.thumbnail(filmDetails);

  if (isMobile) {
    return (
      <Link to={`film/${filmId}`}>
        <FilmCardMobile
          key={`mobile-${filmId}`}
          title={filmTitle}
          genre={filmGenre}
          imgSrc={filmImgSrc}
          rating={filmRating}
          {...filmDetails}
        />
      </Link>
    );
  }

  return (
    <Link to={`film/${filmId}`} className={styles.movieLinks}>
      <FilmCard
        key={filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
        className={styles.film}
      />
    </Link>
  );
};

const WatchList = () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState(EMPTY_ARRAY);
  const [error, setError] = useState(EMPTY_OBJECT);

  useEffect(() => {
    setLoading(true);
    gqlClient
      .query({
        query: NEW_RELEASES,
      })
      .then((response) => {
        const { data } = response;
        setFilms(data.filterMovies);
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
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Watchlist</h1>
        <div className={styles.movies}>{_map(films, renderFilm)}</div>
      </div>
    </div>
  );
};

export default WatchList;

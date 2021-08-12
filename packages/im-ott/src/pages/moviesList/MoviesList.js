import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isMobile } from "imcomponents/atoms/device";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import FilmCardMobile from "imcomponents/molecules/filmCardMobile";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// Readers
import FilmReader from "imbase/readers/Film";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { NEW_RELEASES, FEATURED_MOVIES } from "imbase/graphql/queries";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "imbase/constants/base.constants";

// Styles
import styles from "./moviesList.module.scss";

const renderMovie = (filmDetails = EMPTY_OBJECT, isFeatured) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc = FilmReader.thumbnail(filmDetails);

  if (isMobile) {
    return (
      <Link to={`/film/${filmId}`}>
        <FilmCardMobile
          key={filmId}
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
    <Link to={`/film/${filmId}`}>
      <FilmCard
        key={filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
      />
    </Link>
  );
};

const MoviesList = () => {
  const { movieCriteria } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState(EMPTY_ARRAY);
  const [error, setError] = useState(EMPTY_OBJECT);

  let headingName;
  if (movieCriteria === "new-releases") {
    headingName = "New Releases";
  } else {
    headingName = "Featured";
  }

  useEffect(() => {
    let movieQuery = NEW_RELEASES;
    if (movieCriteria === "featured") {
      movieQuery = FEATURED_MOVIES;
    }
    setLoading(true);
    gqlClient
      .query({
        query: movieQuery,
      })
      .then((response) => {
        const { data } = response;
        if (movieCriteria === "featured") {
          setMovieList(data.getFeatured);
        } else {
          setMovieList(data.getNewReleases);
        }

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [movieCriteria]);

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{headingName}</h1>
      <div className={styles.content}>
        <div className={styles.movies}>{_map(movieList, renderMovie)}</div>
      </div>
    </div>
  );
};

export default MoviesList;

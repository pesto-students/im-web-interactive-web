import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _times from "lodash/times";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import FilmCardMobile from "imcomponents/molecules/filmCardMobile";
import Skeleton from "imcomponents/atoms/skeleton";
import Error from "imcomponents/molecules/error";
import { isMobile } from "imcomponents/atoms/device";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { GET_WATCHLISTED_MOVIES } from "imbase/graphql/queries";

// Readers
import FilmReader from "imbase/readers/Film";

// Utils
import { getCurrentUser } from "imbase/services/firebase";
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

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

  const filmDetailsRoute = getRoute(APPS.OTT, VIEWS.FILMDETAILS, { filmId });

  if (isMobile) {
    return (
      <Link to={filmDetailsRoute}>
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
    <Link to={filmDetailsRoute} className={styles.movieLinks}>
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

  const uid = getCurrentUser()?.uid;

  useEffect(() => {
    setLoading(true);
    gqlClient
      .query({
        query: GET_WATCHLISTED_MOVIES,
        variables: {
          userId: uid,
        },
      })
      .then((response) => {
        const { data } = response;
        setFilms(data.getWatchlistedMovies);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [uid]);

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  const containerClassName = cx(styles.container, {
    [styles.mobileContainer]: isMobile,
  });

  return (
    <div className={containerClassName}>
      <div className={styles.content}>
        {loading ? (
          <Skeleton width="100%" paragraph={{ rows: 0 }} active={true} />
        ) : (
          <h1>Watchlist</h1>
        )}
        {loading ? (
          _times(8, (movie) => (
            <Skeleton.Image active={true} className={styles.skeleton} />
          ))
        ) : _isEmpty(films) ? (
          <div>
            <p className={styles.infoText}>
              You have not watchlisted any movies...
            </p>
          </div>
        ) : (
          <div className={styles.movies}>{_map(films, renderFilm)}</div>
        )}
      </div>
    </div>
  );
};

export default WatchList;

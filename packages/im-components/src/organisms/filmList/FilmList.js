import React, { useState, useEffect, useRef } from "react";
import { isMobile } from "imcomponents/atoms/device";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import cx from "classnames";

// Lodash
import _get from "lodash/get";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _times from "lodash/times";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import { Title } from "imcomponents/atoms/typography";
import Skeleton from "imcomponents/atoms/skeleton";
import Error from "imcomponents/molecules/error";

// Readers
import FilmReader from "imbase/readers/Film";

// Helpers
import { getFilmListClassName } from "./helpers/filmlist.general";

// Icon
import { LeftOutlined, RightOutlined } from "imcomponents/atoms/icon";

// Constants
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  EMPTY_STRING,
} from "imbase/constants/base.constants";

// Utils
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

// Styles
import styles from "./filmlist.module.scss";

const renderMovie = (
  filmDetails = EMPTY_OBJECT,
  isFeatured,
  label,
  showDetails,
  isDetailsRightAligned,
  application,
  listKey
) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc =
    FilmReader.userThumbnail(filmDetails) || FilmReader.thumbnail(filmDetails);

  let filmDetailsRoute;
  if (application === APPS.OTT) {
    filmDetailsRoute = getRoute(APPS.OTT, VIEWS.FILMDETAILS, { filmId });
  }
  if (application === APPS.STUDIO && listKey !== "published-movies") {
    filmDetailsRoute = getRoute(APPS.STUDIO, VIEWS.EDITVIDEO, { filmId });
  }
  if (application === APPS.STUDIO && listKey === "published-movies") {
    filmDetailsRoute = getRoute(APPS.STUDIO, VIEWS.PREVIEWVIDEO, { filmId });
  }

  return (
    <Link to={filmDetailsRoute}>
      <FilmCard
        key={label + filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
        isFeatured={isFeatured}
        alignRight={isDetailsRightAligned}
        showDetails={showDetails}
      />
    </Link>
  );
};

const FilmList = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const {
    label,
    isFeatured,
    listKey,
    showDetails,
    isDetailsRightAligned,
    query,
    dataPath,
    application,
    variables,
  } = props;
  const [movieList, setMovieList] = useState(EMPTY_ARRAY);
  const [error, setError] = useState(EMPTY_OBJECT);
  const filmListRef = useRef();
  const stylesInline = {
    display: "block",
    color: "#000",
    fontSize: "2.4rem",
    twoToneColor: "#fff",
    width: "4rem",
    height: "4rem",
  };

  const filmListContainer = getFilmListClassName(isFeatured);

  const movieListRoute = getRoute(application, VIEWS.MOVIELIST, { listKey });

  // Handle Scrolling by increment / decreamenting scroll left
  const handleNav = (direction) => {
    if (direction === "left") {
      if (filmListRef.current) filmListRef.current.scrollLeft -= 200;
    } else {
      if (filmListRef.current) filmListRef.current.scrollLeft += 200;
    }
  };

  const handleSeeAll = () => {
    history.push(movieListRoute);
  };

  useEffect(() => {
    setLoading(true);
    gqlClient
      .query({ query, variables })
      .then((response) => {
        const { data } = response;
        setMovieList(_get(data, dataPath));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listKey]);

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  const filmListContainerClassname = cx(styles.container, {
    [styles.gradientBackground]: !showDetails,
    [styles.mobilePadding]: isMobile,
  });

  const labelClassname = cx(styles.label, {
    [styles.mobileLabel]: isMobile,
  });

  const seeMoreClassname = cx(styles.seeMore, {
    [styles.mobileSeeMore]: isMobile,
  });

  if (!loading && _isEmpty(movieList)) {
    return null;
  }
  return (
    <div className={filmListContainerClassname}>
      {loading ? (
        <Skeleton width="100%" paragraph={{ rows: 0 }} active={true} />
      ) : (
        <Title
          level={4}
          className={`${styles.menuContainer} ${styles.titleContainer}`}
        >
          <div className={labelClassname}>{label}</div>
          <div className={seeMoreClassname} onClick={handleSeeAll}>
            <p>See All</p>
          </div>
        </Title>
      )}

      <div className={filmListContainer}>
        {!isMobile && (
          <div className={styles.filmArrow}>
            <LeftOutlined
              style={stylesInline}
              onClick={() => handleNav("left")}
            />
          </div>
        )}
        {loading ? (
          _times(5, (movie) => (
            <Skeleton.Image active={true} className={styles.skeleton} />
          ))
        ) : (
          <div className={styles.navItems} ref={filmListRef}>
            {_map(movieList, (movie) =>
              renderMovie(
                movie,
                isFeatured,
                label,
                showDetails,
                isDetailsRightAligned,
                application,
                listKey
              )
            )}
          </div>
        )}
        {!isMobile && (
          <div className={styles.filmArrow}>
            <RightOutlined
              style={stylesInline}
              onClick={() => handleNav("right")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

FilmList.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  listKey: PropTypes.string,
  isFeatured: PropTypes.bool,
  showDetails: PropTypes.bool,
  isDetailsRightAligned: PropTypes.bool,
  application: PropTypes.string,
  query: PropTypes.object,
  dataPath: PropTypes.string,
  variables: PropTypes.object,
};

FilmList.defaultProps = {
  className: undefined,
  label: undefined,
  listKey: undefined,
  isFeatured: false,
  showDetails: false,
  isDetailsRightAligned: false,
  query: EMPTY_OBJECT,
  dataPath: EMPTY_STRING,
  variables: EMPTY_OBJECT,
  application: EMPTY_STRING,
};

export default FilmList;

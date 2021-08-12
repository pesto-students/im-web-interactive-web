import React, { useState, useEffect, useRef } from "react";
import { isMobile } from "imcomponents/atoms/device";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { NEW_RELEASES, FEATURED_MOVIES } from "imbase/graphql/queries";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import { Title } from "imcomponents/atoms/typography";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// Readers
import FilmReader from "imbase/readers/Film";

// Helpers
import { getFilmListClassName } from "./helpers/filmlist.general";

// Icon
import { LeftOutlined, RightOutlined } from "imcomponents/atoms/icon";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "imbase/constants/base.constants";

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
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { label, isFeatured, listKey } = props;
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
      filmListRef.current.scrollLeft -= 200;
    } else {
      filmListRef.current.scrollLeft += 200;
    }
  };

  const handleSeeAll = () => {
    history.push(`/movies/${listKey}`);
  };

  useEffect(() => {
    let queryMovie = NEW_RELEASES;
    if (listKey === "featured") {
      queryMovie = FEATURED_MOVIES;
    }
    setLoading(true);
    gqlClient
      .query({
        query: queryMovie,
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        if (listKey === "featured") {
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
  }, [listKey]);

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.mt1}>
      <Title level={4} className={styles.menuContainer}>
        <div className={styles.label}>
          {label} &nbsp; <RightOutlined />
        </div>
        <div className={styles.seeMore} onClick={handleSeeAll}>
          <p>See all</p>
        </div>
      </Title>
      <div className={filmListContainer}>
        {!isMobile && (
          <div className={styles.filmArrow}>
            <LeftOutlined
              style={stylesInline}
              onClick={() => handleNav("left")}
            />
          </div>
        )}
        <div className={styles.navItems} ref={filmListRef}>
          {_map(movieList, (movie) => renderMovie(movie, isFeatured))}
        </div>
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
};

FilmList.defaultProps = {
  className: undefined,
  label: undefined,
  listKey: undefined,
  isFeatured: false,
};

export default FilmList;

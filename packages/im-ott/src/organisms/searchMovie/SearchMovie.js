import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Components
import noDataFound from "imbase/assets/images/noDataFound.png";
import SearchBox from "imcomponents/atoms/searchBox";
import Image from "imcomponents/atoms/image";
import { isMobile } from "imcomponents/atoms/device";
import FilmCard from "imcomponents/molecules/filmCard";
import FilmCardMobile from "imcomponents/molecules/filmCardMobile";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { QUERY_ALL_MOVIES } from "imbase/graphql/queries";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Readers
import FilmReader from "imbase/readers/Film";

// Constants
import { EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";

// Styles
import styles from "./searchMovie.module.scss";

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
          isFeatured={false}
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
        isFeatured={false}
      />
    </Link>
  );
};

const SearchMovie = (props) => {
  const [searchDetails, setSearchDetails] = useState(EMPTY_OBJECT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    setLoading(true);
    gqlClient
      .query({
        query: QUERY_ALL_MOVIES,
        variables: {
          isPublished: true,
          queryText: searchValue,
        },
      })
      .then((response) => {
        const { data } = response;
        setSearchDetails(data.movies);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
    setSearchClicked(true);
  };

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <SearchBox
          placeholder={"Search Movies"}
          className={styles.search}
          size={"large"}
          onSearch={handleSearch}
          allowClear
        />
      </div>
      {!loading ? (
        <div className={styles.content}>
          {searchClicked && searchDetails.length === 1 && (
            <p className={styles.searchResultText}>
              Found {searchDetails.length} result
            </p>
          )}
          {searchClicked && searchDetails.length > 1 && (
            <p className={styles.searchResultText}>
              Found {searchDetails.length} results
            </p>
          )}
          <div className={styles.movies}>
            {_map(searchDetails, renderMovie)}
          </div>
          {searchClicked && searchDetails.length === 0 && (
            <div className={styles.dataNotFound}>
              <Image src={noDataFound} />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

SearchMovie.propTypes = {
  children: PropTypes.element,
};

SearchMovie.defaultProps = {};

export default SearchMovie;

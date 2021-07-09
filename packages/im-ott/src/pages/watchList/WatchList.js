import React, { useEffect, useState } from "react";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "../../molecules/error";

// Utils
import getDataFromResponse from "../../utils/getDataFromResponse";

// Readers
import FilmReader from "../../readers/Film";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "../../constants/base.constants";
import MOCK_DATA from "../../constants/mockData.json";

// Styles
import styles from "./watchList.module.scss";

const renderFilm = (filmDetails = EMPTY_OBJECT) => {
  const filmId = FilmReader.id(filmDetails);
  return <FilmCard key={filmId} {...filmDetails} className={styles.film} />;
};

const WatchList = () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState(EMPTY_ARRAY);
  const [error, setError] = useState(EMPTY_OBJECT);

  useEffect(() => {
    Promise.resolve(MOCK_DATA)
      .then((response) => {
        const films = getDataFromResponse(response);
        setFilms(films);
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

  return <div className={styles.container}>{_map(films, renderFilm)}</div>;
};

export default WatchList;

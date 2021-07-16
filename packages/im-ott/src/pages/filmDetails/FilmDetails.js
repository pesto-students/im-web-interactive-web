import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cx from "classnames";

// Lodash
import _isEmpty from "lodash/isEmpty";
import _times from "lodash/times";

// Components
import Loader from "imcomponents/molecules/loader/Loader";
import { Title, Label } from "imcomponents/atoms/typography";
import Button from "imcomponents/atoms/button";
import Error from "imcomponents/molecules/error";

// Readers
import FilmReader from "imbase/readers/Film";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockDataSingleFilm.json";
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Styles
import styles from "./filmDetails.module.scss";

// Icon
import { StarFilled } from "imcomponents/atoms/icon";

const FilmDetails = (props) => {
  const { filmId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [filmDetails, setFilmDetails] = useState(EMPTY_OBJECT);

  useEffect(() => {
    Promise.resolve(MOCK_DATA)
      .then((response) => {
        const filmDetails = getDataFromResponse(response);
        setFilmDetails(filmDetails[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [filmId]);

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={cx("film-details", styles.container)}>
      <div className={styles.bannerImage}>
        <img
          src={FilmReader.cover(filmDetails)}
          alt={`${FilmReader.title(filmDetails)} cover`}
        />
      </div>
      <div className={styles.metadata}>
        <div className={styles.thumbnail}>
          <img
            src={FilmReader.thumbnail(filmDetails)}
            alt={`${FilmReader.title(filmDetails)} thumbnail`}
          />
        </div>
        <div className={styles.titleMetadata}>
          <div className={styles.ml2}>
            <Title>{FilmReader.title(filmDetails)}</Title>
            {_times(FilmReader.rating(filmDetails), () => (
              <StarFilled style={{ color: "white" }} />
            ))}
            <Button className={cx(styles.ml2)} label={"Host a Party"} danger></Button>
            <Button className={cx(styles.ml2)} label={"Add to Watchlist"} danger></Button>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <Title level={3} className={styles.mb1}>
          Overview
        </Title>
        <Label>{FilmReader.description(filmDetails)}</Label>
      </div>
    </div>
  );
};

FilmDetails.propTypes = {};

FilmDetails.defaultProps = {};

export default FilmDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isMobile } from "imcomponents/atoms/device";
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

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { QUERY_MOVIE_ID } from "imbase/graphql/queries";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

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
    gqlClient
      .query({
        query: QUERY_MOVIE_ID,
        variables: {
          id: filmId,
        },
      })
      .then((response) => {
        const { data } = response;
        setFilmDetails(data.movie);
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
        {!isMobile && (
          <div className={styles.thumbnail}>
            <img
              src={FilmReader.thumbnail(filmDetails)}
              alt={`${FilmReader.title(filmDetails)} thumbnail`}
            />
          </div>
        )}
        <div className={styles.titleMetadata}>
          <div className={styles.ml2}>
            <Title level={3}>{FilmReader.title(filmDetails)}</Title>
            {_times(FilmReader.rating(filmDetails), () => (
              <StarFilled style={{ color: "yellow" }} />
            ))}
            <Button label={"Play Movie"} danger></Button>
            <Button
              className={styles.ml2}
              label={"Add to Watchlist"}
              danger
            ></Button>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <Title level={5} className={styles.mb1}>
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

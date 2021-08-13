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
import { Modal } from "imcomponents/atoms/modal";
import Error from "imcomponents/molecules/error";
import Player from "imcomponents/organisms/player";

// Readers
import FilmReader from "imbase/readers/Film";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import {
  QUERY_MOVIE_ID,
  QUERY_INTERACTIVE_DATA_BY_MOVIE_ID,
} from "imbase/graphql/queries";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Styles
import styles from "./filmDetails.module.scss";

// Icon
import { StarFilled } from "imcomponents/atoms/icon";

const FilmDetails = (props) => {
  const { filmId } = useParams();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [filmDetails, setFilmDetails] = useState(EMPTY_OBJECT);
  const [overlayDetails, setOverlayDetails] = useState(EMPTY_OBJECT);

  let triggerDetails = EMPTY_OBJECT;
  if (filmDetails?.triggers) {
    triggerDetails = filmDetails.triggers;
  }
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

  const handlePlay = () => {
    setLoading(true);
    gqlClient
      .query({
        query: QUERY_INTERACTIVE_DATA_BY_MOVIE_ID,
        variables: {
          movieId: filmId,
        },
      })
      .then((response) => {
        const { data } = response;
        setOverlayDetails(data.getInteractiveData);
        setVisible(true);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className={cx("film-details", styles.container)}>
      <div className={styles.bannerImage}>
        <img
          src={
            FilmReader.cover(filmDetails) ||
            FilmReader.coverStandard(filmDetails) ||
            FilmReader.coverHigh(filmDetails)
          }
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
            <Button label={"Play Movie"} onClick={handlePlay} danger></Button>
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
      <Modal
        title={FilmReader.title(filmDetails)}
        width={"80vw"}
        centered
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Player
          videoUrl={FilmReader.url(filmDetails)}
          overlayData={overlayDetails}
          triggerData={triggerDetails}
        />
      </Modal>
    </div>
  );
};

FilmDetails.propTypes = {};

FilmDetails.defaultProps = {};

export default FilmDetails;

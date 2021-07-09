import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Components
import Loader from "imcomponents/molecules/loader/Loader";
import { Title, Label } from "imcomponents/atoms/typography";
import Error from "../../molecules/error";

// Readers
import FilmReader from "../../readers/Film";

// Constants
import { EMPTY_OBJECT } from "../../constants/base.constants";
import getDataFromResponse from "../../utils/getDataFromResponse";

// Styles
import styles from "./filmDetails.module.scss";

// To be removed.
import wonderwoman from "../../assets/images/wonderwoman.jpg";
import wonderwomanthumbnail from "../../assets/images/wonderwomanthumbnail.jpeg";

const FilmDetails = (props) => {
  const { filmId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [filmDetails, setFilmDetails] = useState(EMPTY_OBJECT);

  useEffect(() => {
    Promise.resolve()
      .then((response) => {
        const filmDetails = getDataFromResponse(response);
        setFilmDetails(filmDetails);
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
    <div className={styles.container}>
      <div className={styles.bannerImage}>
        <img src={wonderwoman} />
      </div>
      <div className={styles.metadata}>
        <div className={styles.thumbnail}>
          <img src={wonderwomanthumbnail} />
        </div>
        <div className={styles.titleMetadata}>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.description}>
        <Title>{FilmReader.title(filmDetails)}</Title>
        <Label>{FilmReader.description(filmDetails)}</Label>
      </div>
    </div>
  );
};

FilmDetails.propTypes = {};

FilmDetails.defaultProps = {};

export default FilmDetails;

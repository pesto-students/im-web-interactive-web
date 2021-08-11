import React from "react";
import PropTypes from "prop-types";

// Component
import { Row, Col } from "imcomponents/atoms/grid";

// Styles
import styles from "./filmcardMobile.module.scss";

const FilmCardMobile = (props) => {
  const { title, imgSrc } = props;

  return (
    <Row className={styles.filmCardRowMobile}>
      <Col>
        <img className={styles.imageWrapper} src={imgSrc} alt={title} />
      </Col>
      <Col className={styles.textWrapper}>
        <p>{title}</p>
      </Col>
    </Row>
  );
};

FilmCardMobile.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  imgSrc: PropTypes.string,
};

FilmCardMobile.defaultProps = {
  className: undefined,
  title: undefined,
  imgSrc: undefined,
};

export default FilmCardMobile;

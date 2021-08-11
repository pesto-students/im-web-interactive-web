import React from "react";
import PropTypes from "prop-types";

//Components
import { Row, Col } from "imcomponents/atoms/grid";
import SearchBox from "imcomponents/atoms/searchBox";

// Styles
import styles from "./searchMovie.module.scss";

const SearchMovie = (props) => {
  return (
    <div>
      <SearchBox
        placeholder={"Search Movie"}
        className={styles.uploadLinkInput}
        size={"large"}
        // onSearch={handleSearch}
        allowClear
      />
      <Row className={styles.searchRow}>
        <Col flex={"10rem"}>
          <img
            className={styles.imageWrapper}
            src="https://raw.githack.com/beercss/beercss/v1.1.0/dist/alok-001.jpg"
            alt="test"
          />
        </Col>
        <Col flex={"auto"} className={styles.textWrapper}>
          <h4>New Release</h4>
          <span>Raavan Part 100</span>
        </Col>
      </Row>
    </div>
  );
};

SearchMovie.propTypes = {
  children: PropTypes.element,
};

SearchMovie.defaultProps = {};

export default SearchMovie;

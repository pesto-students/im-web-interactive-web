import React from "react";
import PropTypes from "prop-types";

//Components
import { Row, Col } from "imcomponents/atoms/grid";

// Styles
import styles from "./notification.module.scss";

const Notification = (props) => {
  return (
    <div>
      <Row className={styles.notificationRow}>
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

      <Row className={styles.notificationRow}>
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

      <Row className={styles.notificationRow}>
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

      <Row className={styles.notificationRow}>
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

      <Row className={styles.notificationRow}>
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

      <Row className={styles.notificationRow}>
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

Notification.propTypes = {
  children: PropTypes.element,
};

Notification.defaultProps = {};

export default Notification;

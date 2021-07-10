import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Component
import Image from "imcomponents/atoms/image";
import Card from "imcomponents/atoms/card";
import { Label, Title } from "imcomponents/atoms/typography";

// Styles
import styles from "./filmcard.module.scss";

const FilmCard = (props) => {
  const { className, title, imgSrc, year, isFeatured, ...restProps } = props;
  const filmCardClassName = cx(styles.filmcard, className);
  const cardWidth = isFeatured ? 300 : 200;
  const cardHeight = isFeatured ? 300 : 200;

  return (
    <Card
      hoverable
      className={filmCardClassName}
      bodyStyle={{ padding: "1rem" }}
      bordered={false}
      cover={<Image src={imgSrc} width={cardWidth} height={cardHeight} />}
      {...restProps}
    >
      <Title level={4} className={styles.title}>
        {title}
      </Title>
      <Label className={styles.year}>{year}</Label>
    </Card>
  );
};

FilmCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
  imgSrc: PropTypes.string,
};

FilmCard.defaultProps = {
  className: undefined,
  title: undefined,
  year: undefined,
  imgSrc: undefined,
};

export default FilmCard;

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
  const { className, title, year, ...restProps } = props;
  const filmCardStyles = cx(styles.filmcard);
  return (
    <Card
      hoverable
      className={filmCardStyles}
      bodyStyle={{ padding: "10px" }}
      cover={
        <Image src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      }
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
};

FilmCard.defaultProps = {
  className: undefined,
  title: undefined,
  year: undefined,
};

export default FilmCard;

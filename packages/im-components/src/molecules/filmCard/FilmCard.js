import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Lodash
import _times from "lodash/times";

// Component
import Image from "imcomponents/atoms/image";
import Tag from "imcomponents/atoms/tag";
import { Title } from "imcomponents/atoms/typography";

// Icon
import { StarTwoTone } from "imcomponents/atoms/icon";

// Styles
import styles from "./filmcard.module.scss";

const FilmCard = (props) => {
    const { className, title, imgSrc, genre, rating, isFeatured, ...restProps } =
        props;
    const filmCardClassName = cx(styles.filmcard, className);
    const cardWidth = isFeatured ? 400 : 300;
    const cardHeight = isFeatured ? 400 : 300;
    const detailsStyle = isFeatured ? styles.detailsFeatured : styles.detailsNotFeatured;

    return (
        <div className={filmCardClassName} {...restProps}>
            <Image src={imgSrc} width={cardWidth} height={cardHeight} />
            <div className={cx(styles.details,detailsStyle)}>
                <div>
                    <Tag className={styles.tag} color={"#1d1d1d"}>
                        <span>{genre}</span>
                    </Tag>
                </div>
                {_times(rating, () => (
                    <StarTwoTone twoToneColor="#fff" />
                ))}
                <Title level={3} className={styles.title}>
                    {title}
                </Title>
            </div>
        </div>
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
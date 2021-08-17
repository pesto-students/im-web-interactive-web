import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isMobile } from "imcomponents/atoms/device";
import cx from "classnames";

// Graphql
import { FEATURED_MOVIES } from "imbase/graphql/queries";

// Lodash
import _isEmpty from "lodash/isEmpty";
import _times from "lodash/times";
import _truncate from "lodash/truncate";

// Components
import Skeleton from "imcomponents/atoms/skeleton";
import { Title, Label } from "imcomponents/atoms/typography";
import Button, { BUTTON_TYPES } from "imcomponents/atoms/button";
import Error from "imcomponents/molecules/error";
import Player from "imcomponents/organisms/player";
import Watchlist from "../../organisms/watchlist";
import FilmList from "imcomponents/organisms/filmList";
import Image from "imcomponents/atoms/image";
import { CaretRightOutlined } from "imcomponents/atoms/icon";

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

const DESCRIPTION_INITIAL_DISPLAY_LIMIT = 400;

const FilmDetails = (props) => {
  const { filmId } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [filmDetails, setFilmDetails] = useState(EMPTY_OBJECT);
  const [overlayDetails, setOverlayDetails] = useState(EMPTY_OBJECT);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

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

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  const handlePlay = () => {
    setLoadingModal(true);
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
        setLoadingModal(false);
      })
      .catch((error) => {
        setError(error);
        setLoadingModal(false);
      });
  };

  const handleVisible = (val) => {
    setVisible(val);
  };

  const handleExpandContent = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  const detailsToBeDisplayed = isDetailsExpanded
    ? FilmReader.description(filmDetails)
    : _truncate(FilmReader.description(filmDetails), {
        length: DESCRIPTION_INITIAL_DISPLAY_LIMIT,
      });

  const descriptionDetailsClassname = cx(styles.descriptionDetails, {
    [styles.minimisedDescription]: !isDetailsExpanded,
  });

  const buttonWrapperClassname = cx(styles.btnWrapper, {
    [styles.mobileButtonsOrder]: isMobile,
  });

  const buttonClassName = cx(styles.button, {
    [styles.mobileButton]: isMobile,
  });

  const titleMarginClassname = cx(styles.titleMargin, {
    [styles.titleMarginMobile]: isMobile,
  });

  return (
    <div className={cx("film-details", styles.container)}>
      {loading ? (
        <Skeleton.Image className={styles.skeletonBanner} active={true} />
      ) : (
        <Image
          src={
            FilmReader.cover(filmDetails) ||
            FilmReader.coverStandard(filmDetails) ||
            FilmReader.coverHigh(filmDetails)
          }
          className={styles.bannerImage}
          alt={`${FilmReader.title(filmDetails)} cover`}
        />
      )}

      <div className={styles.metadata}>
        <div className={styles.titleMetadata}>
          {!isMobile && (
            <div className={styles.thumbnail}>
              <Image
                src={
                  FilmReader.cover(filmDetails) ||
                  FilmReader.coverStandard(filmDetails) ||
                  FilmReader.coverHigh(filmDetails)
                }
                alt={`${FilmReader.title(filmDetails)} cover`}
              />
            </div>
          )}
          <div className={titleMarginClassname}>
            {loading ? (
              <Skeleton width="100%" paragraph={{ rows: 0 }} active={true} />
            ) : (
              <Title level={3}>{FilmReader.title(filmDetails)}</Title>
            )}
            {_times(FilmReader.rating(filmDetails), () => (
              <StarFilled style={{ color: "yellow" }} />
            ))}
            {!loading && (
              <div className={buttonWrapperClassname}>
                <Button
                  onClick={handlePlay}
                  loading={loadingModal}
                  type={BUTTON_TYPES.TERTIARY}
                  className={buttonClassName}
                >
                  <CaretRightOutlined />{" "}
                  <span className={styles.playMovieLabel}>{"Play Movie"}</span>
                </Button>
                <Watchlist movieId={filmId} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionBorder}>
          {loading ? (
            <Skeleton width="100%" paragraph={{ rows: 0 }} active={true} />
          ) : (
            <Title level={5} className={styles.mb1}>
              Overview
            </Title>
          )}
          {loading ? (
            <Skeleton width="100%" paragraph={{ rows: 5 }} active={true} />
          ) : (
            <>
              <Label className={descriptionDetailsClassname}>
                {detailsToBeDisplayed}
              </Label>
              {FilmReader.description(filmDetails).length >
                DESCRIPTION_INITIAL_DISPLAY_LIMIT && (
                <span
                  className={styles.viewMoreText}
                  onClick={handleExpandContent}
                >
                  {isDetailsExpanded ? "SHOW LESS" : "SHOW MORE"}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <FilmList
        key="featured-movies"
        label={"More to watch"}
        listKey={"featured"}
        isFeatured
        query={FEATURED_MOVIES}
        dataPath={"getFeatured"}
        linkTo={(id) => {
          return `film/${id}`;
        }}
      />

      {visible && (
        <Player
          videoUrl={FilmReader.url(filmDetails)}
          overlayData={overlayDetails}
          triggerData={triggerDetails}
          fullScreen={true}
          handleVisible={handleVisible}
          autoPlay={true}
        />
      )}
    </div>
  );
};

FilmDetails.propTypes = {};

FilmDetails.defaultProps = {};

export default FilmDetails;

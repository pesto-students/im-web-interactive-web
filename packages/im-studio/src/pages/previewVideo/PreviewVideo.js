import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Components
import Button from "imcomponents/atoms/button";
import Error from "imcomponents/molecules/error";
import Player from "imcomponents/organisms/player";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { QUERY_INTERACTIVE_DATA_BY_MOVIE_ID } from "imbase/graphql/queries";

// Redux Actions
import { getMovieByID, updateMovieByID } from "../../redux/movies/actions";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Utils
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

// Styles
import styles from "./previewVideo.module.scss";

const PreviewVideo = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { movie, error } = useSelector((state) => state.MovieReducer);
  const [overlayDetails, setOverlayDetails] = useState(EMPTY_OBJECT);
  const [errorgql, setError] = useState(EMPTY_OBJECT);
  const { videoId } = useParams();
  const history = useHistory();
  const homeRoute = getRoute(APPS.STUDIO, VIEWS.HOME);

  useEffect(() => {
    gqlClient
      .query({
        query: QUERY_INTERACTIVE_DATA_BY_MOVIE_ID,
        variables: {
          movieId: videoId,
        },
      })
      .then((response) => {
        const { data } = response;
        setOverlayDetails(data.getInteractiveData);
      })
      .catch((error) => {
        setError(error);
      });
    dispatch(getMovieByID(videoId));
  }, [dispatch, videoId, location]);

  if (!_isEmpty(error || errorgql)) {
    return <Error {...error} />;
  }

  const onUnpublish = (values) => {
    dispatch(
      updateMovieByID({
        ...movie,
        isPublished: false,
      })
    );
    history.push(homeRoute);
  };

  return (
    <div className={styles.container}>
      <Player
        isHost={false}
        disableExternalButtons={true}
        videoUrl={`http://www.youtube.com/watch?v=${movie.mId}`}
        overlayData={overlayDetails}
        triggerData={movie?.triggers}
        fullScreen={true}
        autoPlay={true}
      ></Player>
      <Button
        className={styles.formButton}
        label={"Unpublish"}
        onClick={onUnpublish}
      />
    </div>
  );
};

export default PreviewVideo;

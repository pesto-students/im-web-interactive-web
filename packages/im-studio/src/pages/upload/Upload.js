import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Components
import Button from "imcomponents/atoms/button";
import { CloudUploadOutlined } from "imcomponents/atoms/icon";
import Image from "imcomponents/atoms/image";
import SearchBox from "imcomponents/atoms/searchBox";
import Error from "imcomponents/molecules/error";

// Redux Actions
import { addMovie } from "../../redux/movies/actions";

// Styles
import styles from "./upload.module.scss";

// Helpers
import { getVideoId, isUploadDisabled } from "./helper/upload.general";

// Services
import youtubeService from "../../services/youtubeService";

const Upload = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState(EMPTY_OBJECT);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);

  const handleSearch = (value, event) => {
    if (_isEmpty(value)) {
      setIsLinkInvalid(false);
      setVideoDetails(EMPTY_OBJECT);
    } else {
      const videoIdFromUrl = getVideoId(value);
      if (_isEmpty(videoIdFromUrl)) {
        setIsLinkInvalid(true);
        setVideoDetails(EMPTY_OBJECT);
        return;
      }

      Promise.resolve(youtubeService.getMovieById({ videoId: videoIdFromUrl }))
        .then((response) => {
          if (
            _isEmpty(response) ||
            _isEmpty(response.data) ||
            response.data.items.length === 0
          ) {
            setIsLinkInvalid(true);
            setVideoDetails(EMPTY_OBJECT);
          } else {
            const videoData = youtubeService.getVideoDataFromResponse(response);
            setVideoDetails(videoData);
            setIsLinkInvalid(false);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  const handleUpload = () => {
    setLoading(true);
    dispatch(addMovie(videoDetails, history));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.center}>
          <CloudUploadOutlined className={styles.uploadIcon} />
          <h1>Paste a Youtube link below to start</h1>
          <div className={styles.inputField}>
            <SearchBox
              placeholder={"Enter youtube link"}
              className={styles.uploadLinkInput}
              size={"large"}
              onSearch={handleSearch}
              allowClear
            />
            {isLinkInvalid && (
              <p className={styles.error}>This link is invalid</p>
            )}
          </div>
          {!_isEmpty(videoDetails) && (
            <div className={styles.videoDetails}>
              <h2 className={styles.title}>{videoDetails?.snippet?.title}</h2>
              <Image
                className={styles.thumbnailImage}
                src={videoDetails?.snippet?.thumbnails.high.url}
                height={videoDetails?.snippet?.thumbnails.high.height}
                width={videoDetails?.snippet?.thumbnails.high.width}
              />
            </div>
          )}
          {/* <Link to={`/video/${videoId}/create`}> */}
          <Button
            className={styles.uploadbutton}
            label={"Upload"}
            shape={"round"}
            disabled={isUploadDisabled(videoDetails)}
            danger
            onClick={handleUpload}
            loading={loading}
          />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Upload;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import getVideoId from "get-video-id";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Components
import Button, { BUTTON_TYPES } from "imcomponents/atoms/button";
import { CloudUploadOutlined } from "imcomponents/atoms/icon";
import { BrowserView, MobileView, isMobile } from "imcomponents/atoms/device";
import Drawer from "imcomponents/atoms/drawer";
import Image from "imcomponents/atoms/image";
import { Modal } from "imcomponents/atoms/modal";
import SearchBox from "imcomponents/atoms/searchBox";
import Error from "imcomponents/molecules/error";
import Loader from "imcomponents/molecules/loader/Loader";

// Redux Actions
import { addMovie } from "../../redux/movies/actions";

// Styles
import styles from "./upload.module.scss";

// Services
import youtubeService from "../../services/youtubeService";

const Upload = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState(EMPTY_OBJECT);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const inputStyle = isMobile
    ? styles.uploadLinkInputmobile
    : styles.uploadLinkInput;
  const iconStyle = isMobile ? styles.uploadIconMobile : styles.uploadIcon;

  const handleSearch = (value, event) => {
    if (_isEmpty(value)) {
      setIsLinkInvalid(false);
      setVideoDetails(EMPTY_OBJECT);
    } else {
      const idData = getVideoId(value);
      const videoIdFromUrl = idData && idData["id"];

      if (_isEmpty(videoIdFromUrl)) {
        setIsLinkInvalid(true);
        setVideoDetails(EMPTY_OBJECT);
        return;
      }

      setLoading(true);
      Promise.resolve(youtubeService.getMovieById({ videoId: videoIdFromUrl }))
        .then((response) => {
          setLoading(false);
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

  const handleOk = () => {
    setLoading(true);
    dispatch(addMovie(videoDetails, history));
  };

  const handleCancel = () => {
    setVideoDetails(EMPTY_OBJECT);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          <div className={styles.center}>
            <CloudUploadOutlined className={iconStyle} />
            <h1>Paste a Youtube link below to start</h1>
            <div className={styles.inputField}>
              <SearchBox
                placeholder={"Enter youtube link"}
                className={inputStyle}
                size={"large"}
                enterButton={"Verify"}
                onSearch={handleSearch}
                allowClear
              />
              {isLinkInvalid && (
                <p className={styles.error}>This link is invalid</p>
              )}
            </div>
            <BrowserView>
              <Modal
                className={styles.videoDetailsModal}
                visible={!_isEmpty(videoDetails)}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"Proceed"}
              >
                <div className={styles.videoDetails}>
                  <Image
                    className={styles.thumbnailImage}
                    src={videoDetails?.snippet?.thumbnails.medium.url}
                    height={videoDetails?.snippet?.thumbnails.medium.height}
                    width={videoDetails?.snippet?.thumbnails.medium.width}
                  />
                  <h3 className={styles.title}>
                    {videoDetails?.snippet?.title}
                  </h3>
                </div>
              </Modal>
            </BrowserView>
            <MobileView>
              <Drawer
                className={styles.videoDetailsDrawer}
                visible={!_isEmpty(videoDetails)}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className={styles.videoDetails}>
                  <Image
                    className={styles.thumbnailImage}
                    src={videoDetails?.snippet?.thumbnails.medium.url}
                  />
                  <h3 className={styles.title}>
                    {videoDetails?.snippet?.title}
                  </h3>
                  {
                    <Button
                      className={styles.drawerButton}
                      label={"Cancel"}
                      type={BUTTON_TYPES.TERTIARY}
                      onClick={() => {
                        setVideoDetails(EMPTY_OBJECT);
                      }}
                    ></Button>
                  }
                  {
                    <Button
                      className={styles.drawerButton}
                      label={"Proceed"}
                      onClick={() => {
                        handleOk();
                      }}
                    ></Button>
                  }
                </div>
              </Drawer>
            </MobileView>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;

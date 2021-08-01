import React, { useState } from "react";

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
import Loader from "imcomponents/molecules/loader/Loader";

// Helpers

// Styles
import styles from "./landingPage.module.scss";
import { getVideoData, isUploadDisabled } from "./helper/landingPage.general";

const LandingPage = () => {
  const [uploadlink, setUploadlink ] = useState('');
  const [videoDetails, setVideoDetails] = useState(EMPTY_OBJECT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);

  const handleSearch = (value, event) => {
    if (_isEmpty(value)) {
      setIsLinkInvalid(false);
      setVideoDetails(EMPTY_OBJECT);
    } else {
      
      Promise.resolve(getVideoData(value))
      .then((response) => {
        if(_isEmpty(response) || _isEmpty(response.data) || response.data.items.length === 0) {
          setIsLinkInvalid(true);
          setVideoDetails(EMPTY_OBJECT);
        } else {
          setVideoDetails(response.data.items[0]);
          setUploadlink(value);
        }
      }).catch(error => {
        setError(error);
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.container}>
        <div className={styles.content} >
          <div className={styles.center} >
            <CloudUploadOutlined
              className={styles.uploadIcon}
              style={{ fontSize:"1500%"}}
            />
            <h1>Paste a Youtube link below to start</h1>
            <div className={styles.inputField}>
              <SearchBox
                placeholder={"Enter youtube link"}
                className={styles.uploadLinkInput}
                size={"large"}
                onSearch={handleSearch}
                allowClear
                />
              {isLinkInvalid && <p className={styles.error} >This link is invalid</p>}
            </div>
            {
            !_isEmpty(videoDetails) && 
            <div className={styles.videoDetails}>
              <h2 className={styles.title} >{videoDetails.snippet.title}</h2>
              <Image 
                className={styles.thumbnailImage}
                src={videoDetails.snippet.thumbnails.high.url}
                height={videoDetails.snippet.thumbnails.high.height}
                width={videoDetails.snippet.thumbnails.high.width} 
              />
            </div>
            }
            <Button 
              className={styles.uploadbutton}
              label={"Upload"}
              shape={"round"}
              disabled={isUploadDisabled(videoDetails)}
              danger
            />
          </div>
        </div>
      </div>
  );
}

export default LandingPage;

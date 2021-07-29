import React, { useState } from "react";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Components
import Button from "imcomponents/atoms/button";
import { CloudUploadOutlined } from "imcomponents/atoms/icon";
import Image from "imcomponents/atoms/image";
import SearchBox from "imcomponents/atoms/searchBox";
import Error from "imcomponents/molecules/error";
import Loader from "imcomponents/molecules/loader/Loader";

// Helpers
import { getVideoIdFromURL } from "./helper/landingPage.general";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";
import { YOUTUBE_API_KEY } from "./constants/landingPage.constants";

// Services 
import youtubeService from "../../services/youtubeService";

// Styles
import styles from "./landingPage.module.scss";

const LandingPage = () => {
  const [uploadlink, setUploadlink ] = useState('');
  const [videoDetails, setVideoDetails] = useState(EMPTY_OBJECT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);

  const handleSearch = async (value, event) => {
    // if searchText is empty
    if (!_isEmpty(value)) {

      // setError({message: "There is an error!"});
      setUploadlink(value);
      const videoId = getVideoIdFromURL(value);
      
      // if valid videoId
      if (!_isEmpty(videoId)) {
        
        // TODO: create ENV_VAR for API key
        let videoData = EMPTY_OBJECT;

        try {
          // videoData = await getVideoData(YOUTUBE_API_KEY, videoId);
        } catch (error) {
            console.log("Error while fetching video data !!");
            setError(error);
        }
        
        // video found with the link
        if(videoData && !_isEmpty(videoData.items)) {
          setVideoDetails(videoData.items[0]);
          setIsLinkInvalid(false);
        } else {
          // no video found by this id
          setIsLinkInvalid(true);
        }
      } else {
        // if invalid URL or invalid id
        setIsLinkInvalid(true);
      }
    } else {
      // if text cleared
      setIsLinkInvalid(false);
      setVideoDetails(EMPTY_OBJECT);
    }
  };

  async function getVideoData(key, videoId) {
    const res = await fetch(youtubeService.getMovieById(key, videoId));
    const data = await res.json();
    return data;
  }

  const isUploadDisabled = () => {
    return _isEmpty(videoDetails)
  }

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
            <div className="videos">
              <h2 className="title">{videoDetails.snippet.title}</h2>
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
              disabled={isUploadDisabled()}
              danger
            />
          </div>
        </div>
      </div>
  );
}

export default LandingPage;

import React, { useEffect, useParams, useState } from "react";

import PropTypes from "prop-types";

// Constants
import { EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockYoutubeVideoResponse.json";
import VideoReader from "imbase/readers/Video";

// Components
import Tabs from "imcomponents/atoms/tabs";

// Services
import youtubeService from "../../services/youtubeService";

// Styles
import styles from "./editVideo.module.scss";

// Organisms
import EditTab from "../../organisms/editTab";

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const EditVideo = () => {
    // const { videoId } = useParams();
    const [ videoData, setVideoData ] = useState(EMPTY_OBJECT);
    const [ activeTabKey, setActiveTabKey ] = useState("1");
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(EMPTY_OBJECT);

    // const videoIdFromData = VideoReader.id(videoData);
    // const videoTitle = VideoReader.title(videoData);
    // const videoDescription = VideoReader.description(videoData);

    const changeTab = (key) => {
        setActiveTabKey(key);
    };

    useEffect(() => {
        Promise.resolve(MOCK_DATA)
            .then((response) => {
                const video = youtubeService.getVideoDataFromResponse(response);
                setVideoData(video);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.player}>

                </div>
                <div className={styles.movieData}>
                    <Tabs
                        onChange={callback}
                        type="card"
                        // activeKey={activeTabKey}
                    >
                        <TabPane className={styles.editTab} tab="Edit" key="1">
                           <EditTab changeTab={changeTab} activeTabKey={activeTabKey} />
                        </TabPane>
                        <TabPane tab="Hotspots" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Overlays" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Time Triggers" key="4">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Publish" key="5">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

EditVideo.propTypes = {
    videoId: PropTypes.string,
    videoDataFromProps: PropTypes.object,
}

EditVideo.defaultProps = {
    videoId: EMPTY_STRING,
    videoDataFromProps: EMPTY_OBJECT
}

export default EditVideo;
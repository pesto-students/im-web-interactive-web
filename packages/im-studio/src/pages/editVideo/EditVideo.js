import React, { useEffect, useState } from "react";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockYoutubeVideoResponse.json";

// Components
import Tabs from "imcomponents/atoms/tabs";
import Player from "imcomponents/organisms/player";
import EditTab from "../../organisms/editTab";
import Hotspots from "../../organisms/hotspots";
import OverlaysTab from "../../organisms/overlaysTab";
import PublishTab from "../../organisms/publishTab";
import TimeTriggersTab from "../../organisms/timeTriggersTab";

// Services
import youtubeService from "../../services/youtubeService";

// Styles
import styles from "./editVideo.module.scss";


const { TabPane } = Tabs;

const EditVideo = () => {
    // TODO: save id from params and fetch data with id
    const [videoData, setVideoData] = useState(EMPTY_OBJECT);
    const [activeTabKey, setActiveTabKey] = useState("1");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(EMPTY_OBJECT);

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
                    {/* TODO: load movie preview */}
                    <Player url="https://www.youtube.com/watch?v=zT62eVxShsY&t=1211s"></Player>
                </div>
                <div className={styles.movieData}>
                    <Tabs type="card" >
                        <TabPane className={styles.editTab} tab="Edit Details" key="1">
                            <EditTab changeTab={changeTab} activeTabKey={activeTabKey} />
                        </TabPane>
                        <TabPane tab="Hotspots" key="2">
                            <Hotspots changeTab={changeTab} activeTabKey={activeTabKey} />
                        </TabPane>
                        <TabPane tab="Overlays" key="3">
                            <OverlaysTab changeTab={changeTab} activeTabKey={activeTabKey} />
                        </TabPane>
                        <TabPane tab="Time Triggers" key="4">
                            <TimeTriggersTab changeTab={changeTab} activeTabKey={activeTabKey} />
                        </TabPane>
                        <TabPane tab="Publish" key="5">
                            <PublishTab changeTab={changeTab} activeTabKey={activeTabKey} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default EditVideo;
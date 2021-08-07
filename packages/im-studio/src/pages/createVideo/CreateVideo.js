import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Components
import Tabs from "imcomponents/atoms/tabs";
import Error from "imcomponents/molecules/error";
import Loader from "imcomponents/molecules/loader";
import Player from "imcomponents/organisms/player";
import EditTab from "../../organisms/editTab";
import Hotspots from "../../organisms/hotspots";
import OverlaysTab from "../../organisms/overlaysTab";
import PublishTab from "../../organisms/publishTab";
import TimeTriggersTab from "../../organisms/timeTriggersTab";

// Services
import youtubeService from "../../services/youtubeService";

// Styles
import styles from "./createVideo.module.scss";

const { TabPane } = Tabs;

const CreateVideo = () => {
  const location = useLocation();
  const { hash } = location;
  const history = useHistory();
  const { videoId } = useParams();
  const [movieData, setMovieData] = useState(EMPTY_OBJECT);
  const [activeTab, setActiveTab] = useState("#1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(EMPTY_OBJECT);

  useEffect(() => {
    Promise.resolve(youtubeService.getMovieById({ videoId: videoId }))
      .then((response) => {
        if (
          _isEmpty(response) ||
          _isEmpty(response.data) ||
          response.data.items.length === 0
        ) {
          setMovieData(EMPTY_OBJECT);
          setLoading(false);
        } else {
          const videoData = youtubeService.getVideoDataFromYT(response);
          setMovieData(videoData);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [videoId]);

  useEffect(() => {
    if (hash) {
      setActiveTab(hash);
    } else {
      setActiveTab("#1");
    }
  }, [hash]);

  const handleChangeTab = (activeKey) => {
    history.push("create" + activeKey);
  };

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.player}>
          {/* TODO: load movie preview */}
          <Player
            isHost={false}
            videoUrl={`http://www.youtube.com/watch?v=${movieData.id}`}
          ></Player>
        </div>
        <div className={styles.movieData}>
          <Tabs activeKey={activeTab} type="card" onChange={handleChangeTab}>
            <TabPane className={styles.editTab} tab="Create Details" key={"#1"}>
              <EditTab tabdata={movieData} history={history} />
            </TabPane>
            <TabPane tab="Hotspots" key={"#2"}>
              <Hotspots tabdata={movieData} history={history} />
            </TabPane>
            <TabPane tab="Overlays" key={"#3"}>
              <OverlaysTab tabdata={movieData} history={history} />
            </TabPane>
            <TabPane tab="Time Triggers" key={"#4"}>
              <TimeTriggersTab />
            </TabPane>
            <TabPane tab="Publish" key={"#5"}>
              <PublishTab />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;

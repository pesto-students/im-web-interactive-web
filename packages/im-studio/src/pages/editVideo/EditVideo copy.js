import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockDBResponse.json";

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

// Utils
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Services
import youtubeService from "../../services/youtubeService";

// Readers
import MovieReader from "imbase/readers/Movie";

// Styles
import styles from "./editVideo.module.scss";

const { TabPane } = Tabs;

const EditVideo = () => {
  const location = useLocation();
  const { hash } = location;
  const history = useHistory();
  const { videoId } = useParams();
  const [movieData, setMovieData] = useState(EMPTY_OBJECT);
  const [activeTab, setActiveTab] = useState("#1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(EMPTY_OBJECT);

  useEffect(() => {
    // Promise.resolve(EMPTY_OBJECT)
    //   .then((response) => {
    //     const movie = getDataFromResponse(response);
    //     if (!_isEmpty(movie)) {
    //       setMovieData(movie);
    //       setLoading(false);
    //     } else {
    //       setLoading(true);
          // use youtube service
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
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     setLoading(false);
    //   });
  }, []);

  useEffect(() => {
    if (hash) {
      setActiveTab(hash);
    } else {
      setActiveTab("#1");
    }
  }, [hash]);

  const handleChangeTab = (activeKey) => {
    history.push("edit" + activeKey);
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
            <TabPane className={styles.editTab} tab="Edit Details" key={"#1"}>
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

export default EditVideo;

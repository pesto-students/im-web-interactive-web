import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

// Redux Actions
import { getMovieByID } from "../../redux/movies/actions";

// Styles
import styles from "./editVideo.module.scss";

const { TabPane } = Tabs;

const EditVideo = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, movie, error } = useSelector((state) => state.MovieReducer);
  const { hash } = location;
  const history = useHistory();
  const { videoId } = useParams();
  const [activeTab, setActiveTab] = useState("#1");

  console.log(loading);
  useEffect(() => {
    if (hash) {
      setActiveTab(hash);
    } else {
      setActiveTab("#1");
    }
    dispatch(getMovieByID(videoId));
  }, [location]);

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
            videoUrl={`http://www.youtube.com/watch?v=${movie.mId}`}
          ></Player>
        </div>
        <div className={styles.movieData}>
          <Tabs activeKey={activeTab} type="card" onChange={handleChangeTab}>
            <TabPane className={styles.editTab} tab="Edit Details" key={"#1"}>
              <EditTab tabdata={movie} history={history} />
            </TabPane>
            <TabPane tab="Hotspots" key={"#2"}>
              <Hotspots tabdata={movie} history={history} />
            </TabPane>
            <TabPane tab="Overlays" key={"#3"}>
              <OverlaysTab tabdata={movie} history={history} />
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

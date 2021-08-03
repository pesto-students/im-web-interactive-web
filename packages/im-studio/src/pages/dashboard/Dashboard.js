import React, { useEffect, useParams, useState } from "react";

import PropTypes from "prop-types";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockVideosData.json";
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Components
import Tabs from "imcomponents/atoms/tabs";

// Styles
import styles from "./dashboard.module.scss";


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const Dashboard = () => {
    const [ myVideos, setMyVideos ] = useState(EMPTY_ARRAY);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(EMPTY_OBJECT);

    useEffect(() => {
        Promise.resolve(MOCK_DATA)
            .then((response) => {
                const video = getDataFromResponse(response);
                setMyVideos(video);
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
               This is the dashboard
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    userId: PropTypes.string
}

Dashboard.defaultProps = {
    userId: EMPTY_STRING
}

export default Dashboard;
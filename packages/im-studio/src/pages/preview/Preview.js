import React, { useEffect, useParams, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockVideoData.json";
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Components
import Button from "imcomponents/atoms/button";

// Styles
import styles from "./preview.module.scss";

function callback(key) {
    console.log(key);
}

const Preview = () => {
    // const { videoId } = useParams();
    const videoId = "1";
    const [ videodata, setVideodata ] = useState(EMPTY_OBJECT);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(EMPTY_OBJECT);

    useEffect(() => {
        Promise.resolve(MOCK_DATA)
            .then((response) => {
                const video = getDataFromResponse(response);
                setVideodata(video);
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
               This is the preview page
               <Link to={`/video/${videoId}/edit`}>
                <Button 
                    label="Edit"
                    danger
                    />
                </Link>
            </div>
        </div>
    );
}

Preview.propTypes = {
    userId: PropTypes.string
}

Preview.defaultProps = {
    userId: EMPTY_STRING
}

export default Preview;
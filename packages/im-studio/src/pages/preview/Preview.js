import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Constants
import { EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockVideoData.json";
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Components
import Button from "imcomponents/atoms/button";
import Player from "imcomponents/organisms/player";

// Styles
import styles from "./preview.module.scss";

const Preview = () => {
    // TODO: const { videoId } = useParams();
    const videoId = "1";
    const [videodata, setVideodata] = useState(EMPTY_OBJECT);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(EMPTY_OBJECT);

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

                <div className={styles.player}>
                    {/* TODO: load movie preview */}
                    <Player url="https://www.youtube.com/watch?v=zT62eVxShsY&t=1211s"></Player>
                </div>
                <div className={styles.buttonsContainer}>
                    <Link to={`/dashboard`}>
                        <Button
                            className={styles.backButton}
                            label={"Back"}
                            shape={"round"}
                        />
                    </Link>
                    <Link to={`/video/${videoId}/edit`}>
                        <Button
                            className={styles.editButton}
                            label={"Edit"}
                            shape={"round"}
                            danger
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Preview;
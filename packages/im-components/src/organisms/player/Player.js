import React, { useRef, useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Lodash
import _map from "lodash/map";

// Components
import screenfull from "screenfull";
import ReactPlayer from "react-player/youtube";
import Progress from "imcomponents/atoms/progress";
import Overlay from "../overlay";

// Constants
import { EMPTY_STRING, EMPTY_OBJECT } from "imbase/constants/base.constants";

// Styles
import styles from "./player.module.scss";

const Player = (props) => {
  const {
    classname,
    videoUrl,
    isHost,
    overlayData,
    triggerData,
    fullScreen,
    handleVisible,
    autoPlay,
  } = props;

  // player wrapper
  const playerWrapper = useRef(null);

  // player
  const player = useRef(null);

  const [state, setState] = useState({
    url: null,
    playing: autoPlay,
    controls: false,
    light: false,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    seeking: false,
    visible_button_refresh: true,
  });

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (!screenfull.isFullscreen && fullScreen) {
          setState({ ...state, url: null, playing: false });
          handleVisible(false);
        }
      });
    }
  });

  // to play pause player
  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  // to stop player
  const handleStop = () => {
    setState({ ...state, url: null, playing: false });
  };

  // on play
  const handlePlay = () => {
    if (!state.playing) {
      setState({ ...state, playing: true });
    }
  };

  // on pause
  const handlePause = () => {
    setState({ ...state, playing: false });
  };

  // handle progress
  const handleProgress = (stateIn) => {
    if (triggerData) {
      _map(triggerData, (trigger) => {
        if (Math.round(state.played * state.duration) === trigger.startPoint) {
          if (player?.current) {
            player.current.seekTo(trigger.skipTo);
          }
        }
      });
    }

    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState({ ...state, ...stateIn });
    }
  };

  // handle on ended
  const handleEnded = () => {
    setState({ ...state, playing: false });
  };

  // handle on duration
  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  // handle reset
  const handleReset = () => {
    player?.current.seekTo(0);
  };

  // handle full screen
  // uses screenfull a JavaScript Fullscreen API
  const handleClickFullscreen = () => {
    screenfull.request(playerWrapper.current);
  };

  // handle overlay action
  const handleOverlayAction = (seconds) => {
    if (player?.current) {
      player.current.seekTo(seconds);
    }
  };

  const handleReady = (seconds) => {
    if (fullScreen) {
      if (screenfull.isEnabled) {
        if (playerWrapper.current) {
          screenfull.request(playerWrapper.current);
        }
        screenfull.on("error", (event) => {
          console.error("Failed to enable fullscreen", event);
        });
      }
    }
  };

  return (
    <div>
      <div className={styles.playerWrapper} ref={playerWrapper}>
        <ReactPlayer
          ref={player}
          className={cx(styles.reactPlayer, classname)}
          url={state.url || videoUrl}
          width="100%"
          height="100%"
          playing={state.playing}
          controls={state.controls || isHost}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onReady={handleReady}
        />

        <div>
          {_map(overlayData, (overlay) => {
            if (
              Math.round(state.played * state.duration) >= overlay.jumpPoint &&
              Math.round(state.played * state.duration) <=
                overlay.jumpPoint + 10
            ) {
              return (
                <Overlay
                  key={`overlay-${overlay.id}`}
                  overlay={overlay}
                  currentTime={Math.round(state.played * state.duration)}
                  seekTo={handleOverlayAction}
                />
              );
            }
          })}
        </div>
      </div>
      {state.visible_button_refresh && (
        <div className={styles.wrapper}>
          <div className={styles.progress}>
            <Progress
              strokeColor={{
                from: "#23395d",
                to: "#152238",
              }}
              percent={Math.round(state.played * state.duration)}
              status="active"
            />
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.mr1}
              onClick={() => handlePlayPause()}
            >
              {state.playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              className={styles.mr1}
              onClick={() => handleClickFullscreen()}
            >
              Fullscreen
            </button>
            <button onClick={handleStop} className={styles.mr1}>
              Stop
            </button>
            <button type="button" onClick={() => handleReset()}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Player.propTypes = {
  className: PropTypes.string,
  videoUrl: PropTypes.string,
  isHost: PropTypes.bool,
  overlayData: PropTypes.object,
  triggerData: PropTypes.object,
  fullScreen: PropTypes.bool,
  handleVisible: PropTypes.func,
};

Player.defaultProps = {
  className: undefined,
  videoUrl: EMPTY_STRING,
  isHost: false,
  overlayData: EMPTY_OBJECT,
  triggerData: EMPTY_OBJECT,
  fullScreen: false,
  handleVisible: () => {},
};

export default memo(Player);

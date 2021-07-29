import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Lodash
import _map from "lodash/map";

// Components
import screenfull from "screenfull";
import ReactPlayer from "react-player/youtube";
import Overlay from "../overlay";

// Styles
import styles from "./player.module.scss";

// Mock Data
import { overlayData } from "imbase/constants/mockOverlayData";

const Player = (props) => {
  const { classname, videoUrl, isHost } = props;

  const [state, setState] = useState({
    url: null,
    playing: true,
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

  // player wrapper
  const playerWrapper = useRef(null);

  // player
  const player = useRef(null);

  // to load url
  const load = (url) => {
    setState({
      ...state,
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  // to play pause player
  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  // to stop player
  const handleStop = () => {
    setState({ ...state, url: null, playing: false });
  };

  // to show/hide controls
  const handleToggleControls = () => {
    const { url } = state;
    setState(
      {
        ...state,
        controls: !state.controls,
        url: null,
      },
      () => this.load(url)
    );
  };

  // to show preview image rather than yt default
  const handleToggleLight = () => {
    setState({ ...state, light: !state.light });
  };

  // on play
  const handlePlay = () => {
    console.log("onPlay");
    if (!state.playing) {
      setState({ ...state, playing: true });
    }
  };

  // on pause
  const handlePause = () => {
    console.log("onPause");
    setState({ ...state, playing: false });
  };

  // handle progress
  const handleProgress = (stateIn) => {
    console.log("onProgress", state.playbackRate);
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState({ ...state, ...stateIn });
    }
  };

  // handle on ended
  const handleEnded = () => {
    console.log("onEnded");
    setState({ ...state, playing: false });
  };

  // handle on duration
  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    setState({ ...state, duration });
  };

  // handle full screen
  // uses screenfull a JavaScript Fullscreen API
  const handleClickFullscreen = () => {
    if (playerWrapper.current) {
      screenfull.request(playerWrapper.current);
    }
  };

  // handle overlay action
  const handleOverlayAction = (seconds) => {
    console.log("aagate" + seconds);
    if (player?.current) {
      player.current.seekTo(seconds);
    }
  };

  return (
    <div className={styles.playerWrapper} ref={playerWrapper}>
      <ReactPlayer
        ref={player}
        className={cx(styles.reactPlayer, classname)}
        url={state.url || videoUrl}
        width="100%"
        height="95%"
        playing={state.playing}
        controls={state.controls || isHost}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onEnded={handleEnded}
        onError={(e) => console.log("onError", e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={() => handlePlayPause()}
      />

      <div>
        {_map(overlayData, (overlay) => {
          if (
            Math.round(state.played * state.duration) > overlay.jumpPoint &&
            Math.round(state.played * state.duration) < overlay.jumpPoint + 10
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

      {state.visible_button_refresh && (
        <div className={styles.controls}>
          <div>
            <button type="button" onClick={() => handlePlayPause()}>
              {state.playing ? "Pause" : "Play"}
            </button>
          </div>
          <div>
            <button type="button" onClick={() => handleClickFullscreen()}>
              Fullscreen {Math.round(state.played * state.duration)}
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
  debug: PropTypes.bool,
  isHost: PropTypes.bool,
};

Player.defaultProps = {
  className: undefined,
  videoUrl: "https://www.youtube.com/watch?v=bxnYFOixIoc",
  debug: false,
  isHost: true,
};

export default Player;

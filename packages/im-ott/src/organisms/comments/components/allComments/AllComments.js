import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Lodash
import _noop from "lodash/noop";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import Drawer from "imcomponents/atoms/drawer";
import { PlusCircleOutlined } from "imcomponents/atoms/icon";
import { isMobile } from "imcomponents/atoms/device";
import CommentThread from "../../components/commentThread";

// Services
import youtubeService from "imbase/services/youtubeService";

// Utils
import getYTDataFromResponse from "imbase/utils/getYTDataFromResponse";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "imbase/constants/base.constants";

// Readers
import commentThreadReader from "imbase/readers/CommentThread";

// Styles
import styles from "./allComments.module.scss";

const renderComment = (commentThread = EMPTY_OBJECT) => {
  const commentTheadId = commentThreadReader.id(commentThread);
  const commentTheadEtag = commentThreadReader.etag(commentThread);
  return (
    <CommentThread
      key={commentTheadId + commentTheadEtag}
      commentThread={commentThread}
      isFullScreenView
    />
  );
};

function AllComments({ videoId, onClose, visible }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");
  const [comments, setComments] = useState(EMPTY_ARRAY);
  const headerStyles = {
    display: "flex",
    justifyContent: "center",
  };

  useEffect(() => {
    youtubeService
      .getComments({
        videoId,
        maxResults: 20,
        order: "relevance",
        ...(!_isEmpty(nextPageToken) ? { pageToken: nextPageToken } : {}),
      })
      .then((response) => {
        const commentsDetails = getYTDataFromResponse(response) || EMPTY_OBJECT;
        const nextPageTokenFromResponse = commentsDetails.nextPageToken;
        const commentsList = commentsDetails.items || EMPTY_ARRAY;
        setComments([...comments, ...commentsList]);
        if (nextPageTokenFromResponse) {
          setNextPageToken(nextPageTokenFromResponse);
        }
      })
      .catch((error) => {
        console.log(`Error: Failed to load all comments, ${error}`);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, currentPageNumber]);

  const handleLoadMoreComments = () => {
    if (nextPageToken) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  if (isMobile) {
    return (
      <Drawer
        title="Comments"
        onClose={onClose}
        visible={visible}
        key={videoId + "mobile"}
        className={styles.container}
        headerStyle={headerStyles}
        height={"100vh"}
        width={"100vw"}
      >
        <div className={styles.commentsList}>
          {_map(comments, renderComment)}
          <PlusCircleOutlined
            className={styles.loadMore}
            onClick={handleLoadMoreComments}
          />
        </div>
      </Drawer>
    );
  } else {
    return (
      <Drawer
        title="Comments"
        onClose={onClose}
        visible={visible}
        key={videoId + "desktop"}
        className={styles.container}
        headerStyle={headerStyles}
        height={"100vh"}
        width={"40vw"}
      >
        <div className={styles.commentsList}>
          {_map(comments, renderComment)}
          {nextPageToken && (
            <PlusCircleOutlined
              className={styles.loadMore}
              onClick={handleLoadMoreComments}
            />
          )}
        </div>
      </Drawer>
    );
  }
}

AllComments.propTypes = {
  videoId: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

AllComments.defaultProps = {
  onClose: _noop,
  visible: false,
};

export default AllComments;

import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Components
import TimeAgo from "react-timeago";
import Image from "imcomponents/atoms/image";
import CollapsibleContent from "imcomponents/molecules/collapsibleContent";

// Readers
import commentThreadReader from "imbase/readers/CommentThread";
import commentReader from "imbase/readers/Comment";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Styles
import styles from "./comment.module.scss";

function Comment({ commentThread, isFullScreenView }) {
  const topLevelComment = commentThreadReader.topLevelComment(commentThread);
  const authorDisplayName = commentReader.authorDisplayName(topLevelComment);
  const authorProfileImageUrl =
    commentReader.authorProfileImageUrl(topLevelComment);
  const updatedTime = commentReader.updatedAt(topLevelComment);
  const textOriginal = commentReader.textOriginal(topLevelComment);

  const containerClassName = cx(styles.container, {
    [styles.fullScreenPadding]: isFullScreenView,
  });

  return (
    <div className={containerClassName}>
      {isFullScreenView && (
        <div className={styles.authorImage}>
          <Image src={authorProfileImageUrl} className={styles.icon} />
        </div>
      )}

      <div className={styles.commentDetails}>
        <span className={styles.authorName}>{authorDisplayName}</span>
        <span className={styles.comment}>
          <CollapsibleContent text={textOriginal} disabled={isFullScreenView} />
        </span>
        {isFullScreenView && (
          <TimeAgo date={updatedTime} className={styles.dateTime} />
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  commentThread: PropTypes.object,
};

Comment.defaultProps = {
  commentThread: EMPTY_OBJECT,
};

export default Comment;

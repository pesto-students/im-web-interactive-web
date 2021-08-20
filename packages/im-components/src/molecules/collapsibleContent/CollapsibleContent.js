import React, { useState } from "react";
import PropTypes from "prop-types";

// Constants
import { EMPTY_STRING } from "imbase/constants/base.constants";

// Styles
import styles from "./collapsibleContent.module.scss";

function CollapsibleContent({ text, limit, disabled }) {
  const [expanded, setExpanded] = useState(false);
  const previewText = text.substring(0, limit);
  const textToDisplay = disabled || expanded ? text : previewText;

  const handleExpandContent = () => {
    setExpanded(true);
  };

  return (
    <>
      {textToDisplay}
      {!expanded && !disabled && text.length > limit && (
        <>
          <span>...</span>
          <span className={styles.viewMoreText} onClick={handleExpandContent}>
            more
          </span>
        </>
      )}
    </>
  );
}

CollapsibleContent.propTypes = {
  text: PropTypes.string,
  limit: PropTypes.number,
  disabled: PropTypes.bool,
};

CollapsibleContent.defaultProps = {
  text: EMPTY_STRING,
  limit: 60,
  disabled: false,
};

export default CollapsibleContent;

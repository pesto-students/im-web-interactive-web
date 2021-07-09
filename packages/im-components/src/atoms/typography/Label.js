import React from "react";
import PropTypes from "prop-types";

// Component
import { Typography, Skeleton } from "antd";

// Styles
import styles from "./typography.module.scss";

const Label = (props) => {
  const { Text } = Typography;
  const { className, children, type, ...restProps } = props;

  return (
    <Text
      {...restProps}
      type={type}
      className={[className, styles.textWhite].join(" ")}
    >
      {children ? (
        children
      ) : (
        <Skeleton.Input className={styles.rowWidthLabel} />
      )}
    </Text>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

Label.defaultProps = {
  className: undefined,
  type: undefined,
};

export default Label;

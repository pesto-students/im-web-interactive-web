import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Component
import { Typography, Skeleton } from "antd";

// Styles
import styles from "./typography.module.scss";

const { Text } = Typography;

const Label = (props) => {
  const { className, children, type, ...restProps } = props;
  const labelClassName = cx(styles.textWhite, className);
  return (
    <Text {...restProps} type={type} className={labelClassName}>
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

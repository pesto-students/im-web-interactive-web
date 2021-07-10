import React from "react";
import PropTypes from "prop-types";

// Component
import { Typography, Skeleton } from "antd";

// Styles
import styles from "./typography.module.scss";

const Title = (props) => {
  const { Title } = Typography;
  const { className, children, level, ...restProps } = props;
  return (
    <Title
      {...restProps}
      level={level}
      className={[className, styles.textWhite].join(" ")}
    >
      {children ? (
        children
      ) : (
        <Skeleton.Input active className={styles.rowWidthTitle} />
      )}
    </Title>
  );
};

Title.propTypes = {
  className: PropTypes.string,
  level: PropTypes.number,
  ellipsis: PropTypes.bool,
};

Title.defaultProps = {
  className: undefined,
  level: undefined,
  ellipsis: true,
};

export default Title;
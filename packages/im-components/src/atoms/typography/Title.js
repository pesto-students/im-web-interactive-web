import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Component
import { Typography, Skeleton } from "antd";

// Styles
import styles from "./typography.module.scss";

const { Title: AntdTitle } = Typography;

const Title = (props) => {
  const { className, children, level, ...restProps } = props;
  const titleClassName = cx(styles.textWhite, className);
  return (
    <AntdTitle {...restProps} level={level} className={titleClassName}>
      {children ? (
        children
      ) : (
        <Skeleton.Input active className={styles.rowWidthTitle} />
      )}
    </AntdTitle>
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

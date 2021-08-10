import React from "react";
import PropTypes from "prop-types";

// Components
import { Drawer as AntdDrawer} from "antd";

const Drawer = (props) => {
  const { children, ...restProps } = props;
  return <AntdDrawer {...restProps}>{children}</AntdDrawer>;
};

Drawer.propTypes = {
  children: PropTypes.element,
};

export default Drawer;

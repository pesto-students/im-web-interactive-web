import React from "react";
import PropTypes from "prop-types";

// Components
import { Modal as AntdModal, Button } from "antd";

const Modal = (props) => {
  const { children, ...restProps } = props;
  return <AntdModal {...restProps}>{children}</AntdModal>;
};

Modal.propTypes = {
  children: PropTypes.element,
};

export { Modal, Button };

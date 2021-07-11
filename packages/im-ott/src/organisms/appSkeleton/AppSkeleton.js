import React from "react";
import PropTypes from "prop-types";

// Components
import { Layout } from "antd";
import Navbar from "../navbar";

// Styles
import styles from "./appskeleton.module.scss";

const { Header, Content, Footer } = Layout;

const AppSkeleton = (props) => {
  const { children } = props;
  return (
    <Layout className={"layout"}>
      <Header className={styles.header}>
        <Navbar />
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>Interactive Web Platform 2021</Footer>
    </Layout>
  );
};

AppSkeleton.propTypes = {
  children: PropTypes.element,
};

export default AppSkeleton;

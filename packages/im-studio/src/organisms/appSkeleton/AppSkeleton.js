import React from "react";
import PropTypes from "prop-types";

// Components
import { Layout } from "antd";
import Navbar from "../navbar";
import FooterContent from "imcomponents/organisms/footerContent";

// Styles
import styles from "./appskeleton.module.scss";

const { Header, Content, Footer } = Layout;

const AppSkeleton = (props) => {
  const { children } = props;
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <Navbar />
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        <FooterContent />
      </Footer>
    </Layout>
  );
};

AppSkeleton.propTypes = {
  children: PropTypes.element,
};

export default AppSkeleton;

import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import { Layout } from "antd";
import FooterContent from "imcomponents/organisms/footerContent";
import { UserContext } from "imbase/providers/UserProvider";
import Navbar from "../navbar";

// Styles
import styles from "./appskeleton.module.scss";

const { Header, Content, Footer } = Layout;

const AppSkeleton = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (!user) {
      setredirect("/login");
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

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

import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import cx from "classnames";
import { BrowserView, MobileView, isMobile } from "imcomponents/atoms/device";

// Components
import { Layout } from "antd";
import FooterContent from "imcomponents/organisms/footerContent";
import { UserContext } from "imbase/providers/UserProvider";
import Navbar from "../navbar";
import FooterMenu from "./components/footerMenu";

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

  const headerClassName = cx(styles.header, {
    [styles.webHeader]: !isMobile,
    [styles.mobileHeader]: isMobile,
  });

  return (
    <Layout className={styles.container}>
      <Header className={headerClassName}>
        <Navbar />
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        <BrowserView className={styles.webFooter}>
          <FooterContent />
        </BrowserView>
        <MobileView className={styles.mobileFooter}>
          <FooterMenu />
        </MobileView>
      </Footer>
    </Layout>
  );
};

AppSkeleton.propTypes = {
  children: PropTypes.element,
};

export default AppSkeleton;

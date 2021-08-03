import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";

// Components
import { Layout } from "antd";
import FooterContent from "imcomponents/organisms/footerContent";
import { UserContext } from "imbase/providers/UserProvider";
import Navbar from "../navbar";

// Styles
import styles from "./appskeleton.module.scss";
import { CREATE_USER } from "../../graphql/mutation";

const { Header, Content, Footer } = Layout;

const AppSkeleton = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (!user) {
      setredirect("/login");
    }
    if (user) {
      createUser({
        variables: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        },
      });
    }
  }, [user, createUser]);

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

import React, { useEffect, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";

// Components
import { Layout } from "antd";
import FooterContent from "imcomponents/organisms/footerContent";
import { UserContext } from "imbase/providers/UserProvider";
import Navbar from "../navbar";

// firebase auth
import { getCurrentUser } from "imbase/services/firebase";

// Styles
import styles from "./appskeleton.module.scss";
import { HELLO_WORLD } from "../../graphql/queries";
import { CREATE_USER } from "../../graphql/mutation";

const { Header, Content, Footer } = Layout;

const AppSkeleton = (props) => {
  const { children } = props;
  const { user } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  // below are examples to how to query and mutate data through graphql
  // const { loading, error, data } = useQuery(HELLO_WORLD);
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (!user) {
      setredirect("/login");
    }
  }, [user]);

  useEffect(() => {
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
  }, []);

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

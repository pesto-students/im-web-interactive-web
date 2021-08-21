import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";

// Sentry
import * as Sentry from "@sentry/react";

// Redux Actions
import { deleteMovie, updateMovieByID } from "../../redux/movies/actions";

// Styles
import styles from "./publishTab.module.scss";

const PublishTab = (props) => {
  const dispatch = useDispatch();
  const { tabdata, history } = props;
  const { id, title, description, url, genre, isPublished } = tabdata;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 2 },
  };

  const [form] = Form.useForm();
  const onPublish = (values) => {
    dispatch(
      updateMovieByID({
        ...tabdata,
        isPublished: true,
        publishedAt: new Date(),
      })
    );
    history.push("/dashboard");
  };

  const onUnpublish = (values) => {
    dispatch(
      updateMovieByID({
        ...tabdata,
        isPublished: false,
      })
    );
    history.push("/dashboard");
  };

  const onDelete = (values) => {
    dispatch(deleteMovie({ movieId: id }, history));
    history.push("/dashboard");
  };

  const onFinishFailed = (errorInfo) => {
    Sentry.captureMessage("User Error at Hotspots");
    Sentry.captureException(errorInfo);
  };
  return (
    <div className={styles.container}>
      <Form
        {...formItemLayout}
        className={styles.publishForm}
        layout={"horizontal"}
        form={form}
        onFinish={isPublished ? onUnpublish : onPublish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="YouTube URL">{url}</Form.Item>
        <Form.Item label="Title">{title}</Form.Item>
        <Form.Item label="Description">{description}</Form.Item>
        <Form.Item label="Genre">{genre}</Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            className={styles.formButton}
            label={"Delete"}
            onClick={onDelete}
            disabled={isPublished}
          />
          <Button
            className={styles.formButton}
            label={"Unpublish"}
            onClick={onUnpublish}
            disabled={!isPublished}
          />
          <Button
            className={styles.formButton}
            label={"Publish"}
            onClick={onPublish}
            disabled={isPublished}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

PublishTab.propTypes = {
  tabdata: PropTypes.object,
  history: PropTypes.object,
};

PublishTab.defaultProps = {
  tabdata: EMPTY_OBJECT,
  history: EMPTY_OBJECT,
};

export default PublishTab;

import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Input from "imcomponents/atoms/input";
import TextArea from "imcomponents/atoms/textArea";

// Sentry
import * as Sentry from "@sentry/react";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Redux Actions
import { updateMovieByID } from "../../redux/movies/actions";

// Styles
import styles from "./editTab.module.scss";

const EditTab = (props) => {
  const dispatch = useDispatch();
  const { tabdata, history } = props;
  const { id, name, title, description, url, genre } = tabdata;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 2 },
  };

  const [form] = Form.useForm();

  //initial values
  const initialValues = {
    movie_name: name,
    movie_url: url || `http://www.youtube.com/watch?v=${id}`,
    movie_title: title,
    movie_description: description,
    movie_genre: genre,
  };

  const onFinish = (values) => {
    dispatch(
      updateMovieByID({
        ...tabdata,
        name: values.movie_name,
        title: values.movie_title,
        description: values.movie_description,
        genre: values.movie_genre,
      })
    );
    history.push("#2");
  };

  const onFinishFailed = (errorInfo) => {
    Sentry.captureMessage("User Error at EditTab");
    Sentry.captureException(errorInfo);
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <div className={styles.container}>
      <Form
        initialValues={initialValues}
        {...formItemLayout}
        className={styles.editForm}
        layout={"horizontal"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="movie_name"
          rules={[{ required: true, message: "Please input movie name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="YouTube URL"
          name="movie_url"
          rules={[{ required: true, message: "Please input movie url!" }]}
        >
          <Input placeholder="Enter YouTube URL" disabled />
        </Form.Item>
        <Form.Item
          label="Title"
          name="movie_title"
          rules={[{ required: true, message: "Please input movie title!" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="movie_description"
          rules={[
            { required: true, message: "Please input movie description!" },
          ]}
        >
          <TextArea placeholder="Enter description" rows={4} />
        </Form.Item>
        <Form.Item
          label="Genre"
          name="movie_genre"
          rules={[{ required: true, message: "Please input movie genre!" }]}
        >
          <Input placeholder="Enter genre" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Link to="/dashboard">
            <Button
              className={styles.backButton}
              label={"Back"}
              shape={"round"}
              ghost
            />
          </Link>
          <Button
            className={styles.saveButton}
            label={"Save"}
            shape={"round"}
            onClick={handleSubmit}
            danger
          />
        </Form.Item>
      </Form>
    </div>
  );
};

EditTab.propTypes = {
  tabdata: PropTypes.object,
  history: PropTypes.object,
};

EditTab.defaultProps = {
  tabdata: EMPTY_OBJECT,
  history: EMPTY_OBJECT,
};

export default EditTab;

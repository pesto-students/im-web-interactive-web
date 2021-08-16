import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Image } from "cloudinary-react";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Input from "imcomponents/atoms/input";
import TextArea from "imcomponents/atoms/textArea";

import _isEmpty from "lodash/isEmpty";

// Sentry
import * as Sentry from "@sentry/react";

// Constants
import { EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";

// Redux Actions
import { updateMovieByID } from "../../redux/movies/actions";

// Styles
import styles from "./editTab.module.scss";

const EditTab = (props) => {
  const dispatch = useDispatch();
  const { tabdata, history } = props;
  const { id, title, description, url, genre } = tabdata;

  const [selectedBackgroundId, setSelectedBackgroundId] =
    useState(EMPTY_STRING);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState(EMPTY_STRING);

  const cloudName = "iflix-cloud";
  const key = "yqkzec2f";

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
    movie_url: url || `http://www.youtube.com/watch?v=${id}`,
    movie_title: title,
    movie_description: description,
    movie_genre: genre,
  };

  const onFinish = (values) => {
    dispatch(
      updateMovieByID({
        ...tabdata,
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

  const handleThumbnailChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", key);

      Axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      ).then((response) => {
        console.log(response);
        const publicId = response && response.data && response.data.public_id;
        setSelectedThumbnailId(publicId);
      });
    }
  };

  const handleBackgroundChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", key);

      Axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      ).then((response) => {
        console.log(response);
        const publicId = response && response.data && response.data.public_id;
        setSelectedBackgroundId(publicId);
      });
    }
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
        <Form.Item label={"Thumbnail Image"} name={"movie_thumbmail"}>
          <Input
            className={styles.chooseImageInput}
            type={"file"}
            id={"uploadedThumbnail"}
            onChange={handleThumbnailChange}
          />
          {!_isEmpty(selectedThumbnailId) && (
            <Image
              className={styles.uploadImagePreview}
              cloudName={cloudName}
              publicId={selectedThumbnailId}
            ></Image>
          )}
        </Form.Item>

        <Form.Item label={"Background Image"} name={"movie_background"}>
          <Input
            className={styles.chooseImageInput}
            type={"file"}
            id={"uploadedBackground"}
            onChange={handleBackgroundChange}
          />
          {!_isEmpty(selectedBackgroundId) && (
            <Image
              className={styles.uploadImagePreview}
              cloudName={cloudName}
              publicId={selectedBackgroundId}
            ></Image>
          )}
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

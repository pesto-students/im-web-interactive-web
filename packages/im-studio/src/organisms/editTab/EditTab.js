import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import { DeleteOutlined } from "imcomponents/atoms/icon";
import Button, { BUTTON_TYPES } from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Image from "imcomponents/atoms/image";
import Input from "imcomponents/atoms/input";
import TextArea from "imcomponents/atoms/textArea";
import Loader from "imcomponents/molecules/loader";

import _isEmpty from "lodash/isEmpty";

// Sentry
import * as Sentry from "@sentry/react";

// Constants
import { EMPTY_OBJECT, EMPTY_STRING } from "imbase/constants/base.constants";

// Redux Actions
import { updateMovieByID } from "../../redux/movies/actions";

// Styles
import styles from "./editTab.module.scss";
import { uploadImageToCloudinary } from "./utils/cloudinary";

const EditTab = (props) => {
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [deleteThumbnailClicked, setDeleteThumbnailClicked] = useState(false);
  const [deleteBackgroundClicked, setDeleteBackgroundClicked] = useState(false);
  const [userBackgroundURL, setUserBackgroundURL] = useState(EMPTY_STRING);
  const [userThumbnailURL, setUserThumbnailURL] = useState(EMPTY_STRING);

  const dispatch = useDispatch();
  const { tabdata, history, loading } = props;
  const { mId, title, description, url, genre, thumbnails } = tabdata;
  const userThumbnailDB =
    thumbnails && thumbnails.userThumbnail && thumbnails.userThumbnail.url;
  const userBackgroundDB =
    thumbnails && thumbnails.userBackground && thumbnails.userBackground.url;

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 2 },
  };

  const [form] = Form.useForm();

  form.setFieldsValue({
    movieurl: url || `http://www.youtube.com/watch?v=${mId}`,
    movietitle: title,
    moviedescription: description,
    moviegenre: genre,
  });

  const onFinish = (values) => {
    dispatch(
      updateMovieByID({
        ...tabdata,
        title: values.movietitle,
        description: values.moviedescription,
        genre: values.moviegenre,
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
      setThumbnailLoading(true);
      uploadImageToCloudinary(image).then((response) => {
        setThumbnailLoading(false);
        setDeleteThumbnailClicked(false);
        const data = response && response.data;
        const { url } = data;
        setUserThumbnailURL(url);
        tabdata.thumbnails.userThumbnail = {
          url,
          height: 360,
          width: 480,
        };
      });
    }
  };

  const handleBackgroundChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      setBackgroundLoading(true);
      uploadImageToCloudinary(image).then((response) => {
        setBackgroundLoading(false);
        setDeleteBackgroundClicked(false);
        const data = response && response.data;
        const { url } = data;
        setUserBackgroundURL(url);
        tabdata.thumbnails.userBackground = {
          url,
          height: 720,
          width: 1280,
        };
      });
    }
  };

  const handleDeleteThumbnail = () => {
    console.log("deleting");
    setUserThumbnailURL(EMPTY_STRING);
    tabdata.thumbnails.userThumbnail = EMPTY_OBJECT;
    setDeleteThumbnailClicked(true);
  };

  const handleDeleteBackground = () => {
    console.log("deleting");
    setUserBackgroundURL(EMPTY_STRING);
    tabdata.thumbnails.userBackground = EMPTY_OBJECT;
    setDeleteBackgroundClicked(true);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <Form
          initialValues={{
            movieurl: url || `http://www.youtube.com/watch?v=${mId}`,
            movietitle: title,
            moviedescription: description,
            moviegenre: genre,
          }}
          {...formItemLayout}
          className={styles.editForm}
          layout={"horizontal"}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="YouTube URL"
            name="movieurl"
            rules={[{ required: true, message: "Please input movie url!" }]}
          >
            <Input placeholder="Enter YouTube URL" disabled />
          </Form.Item>
          <Form.Item
            label="Title"
            name="movietitle"
            rules={[{ required: true, message: "Please input movie title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="moviedescription"
            rules={[
              { required: true, message: "Please input movie description!" },
            ]}
          >
            <TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="moviegenre"
            rules={[{ required: false, message: "Please input movie genre!" }]}
          >
            <Input placeholder="Enter genre" disabled />
          </Form.Item>
          <Form.Item
            className={styles.uploadImageContainer}
            label={"Thumbnail Image"}
            name="movieUserThumbnail"
          >
            <Input
              className={styles.chooseImageInput}
              type={"file"}
              onChange={handleThumbnailChange}
              accept="image/*"
            />
            {thumbnailLoading ? (
              <Loader />
            ) : (
              ((!deleteThumbnailClicked && !_isEmpty(userThumbnailURL)) ||
                !_isEmpty(userThumbnailDB)) && (
                <div>
                  <Image
                    className={styles.uploadImagePreview}
                    src={userThumbnailURL || userThumbnailDB}
                  />
                  <DeleteOutlined
                    className={styles.deleteIcon}
                    onClick={handleDeleteThumbnail}
                  />
                </div>
              )
            )}
          </Form.Item>
          <Form.Item
            className={styles.uploadImageContainer}
            label={"Background Image"}
            name="movieUserBackground"
          >
            <Input
              className={styles.chooseImageInput}
              type={"file"}
              onChange={handleBackgroundChange}
              accept="image/*"
            />
            {backgroundLoading ? (
              <Loader />
            ) : (
              ((!deleteBackgroundClicked && !_isEmpty(userBackgroundURL)) ||
                !_isEmpty(userBackgroundDB)) && (
                <div>
                  <Image
                    className={styles.uploadImagePreview}
                    src={userBackgroundURL || userBackgroundDB}
                  />
                  <DeleteOutlined
                    className={styles.deleteIcon}
                    onClick={handleDeleteBackground}
                  />
                </div>
              )
            )}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Link to="/dashboard">
              <Button
                className={styles.backButton}
                label={"Back"}
                type={BUTTON_TYPES.TERTIARY}
              />
            </Link>
            <Button
              className={styles.saveButton}
              label={"Save"}
              onClick={handleSubmit}
            />
          </Form.Item>
        </Form>
      )}
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

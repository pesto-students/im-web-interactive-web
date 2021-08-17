import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Button from "imcomponents/atoms/button";
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
  const dispatch = useDispatch();
  const { tabdata, history, loading } = props;
  const { mId, title, description, url, genre } = tabdata;

  const [userBackgroundURL, setUserBackgroundURL] = useState(EMPTY_STRING);
  const [userThumbnailURL, setUserThumbnailURL] = useState(EMPTY_STRING);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 2 },
  };

  const [form] = Form.useForm();

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
      uploadImageToCloudinary(image).then((response) => {
        const data = response && response.data;
        const { url } = data;
        setUserThumbnailURL(url);
        tabdata.thumbnails.userThumbnail = {
          url,
          height: 360,
          width: 480,
        };
        console.log("inside thumbnail ");
        console.log(tabdata);
      });
    }
  };

  const handleBackgroundChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      uploadImageToCloudinary(image).then((response) => {
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
            {!_isEmpty(userThumbnailURL) && (
              <Image
                className={styles.uploadImagePreview}
                src={userThumbnailURL}
              />
            )}
          </Form.Item>

          <Form.Item label={"Background Image"} name={"movie_background"}>
            <Input
              className={styles.chooseImageInput}
              type={"file"}
              id={"uploadedBackground"}
              onChange={handleBackgroundChange}
            />
            {!_isEmpty(userBackgroundURL) && (
              <Image
                className={styles.uploadImagePreview}
                src={userBackgroundURL}
              />
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

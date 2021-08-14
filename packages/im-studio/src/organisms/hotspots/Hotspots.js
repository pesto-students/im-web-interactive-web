import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Input from "imcomponents/atoms/input";
import Table from "imcomponents/atoms/table";
import Seeker from "imcomponents/organisms/seeker";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Utils
import { getFormattedTime, countSeconds } from "imbase/utils/getFormattedTime";

// Sentry
import * as Sentry from "@sentry/react";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Redux Actions
import { addAction, deleteAction } from "../../redux/movies/actions";

// icons
import { EditOutlined, DeleteOutlined } from "imcomponents/atoms/icon";

// Styles
import styles from "./hotspots.module.scss";

const Hotspots = (props) => {
  const dispatch = useDispatch();
  const { tabdata } = props;
  const { id, mId, hotspots } = tabdata;
  const hotspotData = !_isEmpty(hotspots) ? Object.values(hotspots) : [];
  const [jumpIn, setJumpIn] = useState("00:00:01");

  const hotspotSeekRef = useRef(null);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 1 },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const sec = countSeconds(jumpIn);
    dispatch(
      addAction(
        {
          id: id,
          data: {
            id: values.hotspotid,
            name: values.name,
            startPoint: sec,
          },
        },
        "HOTSPOT"
      )
    );
  };

  const onFinishFailed = (errorInfo) => {
    Sentry.captureMessage("User Error at Hotspots");
    Sentry.captureException(errorInfo);
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleSetJumpIn = (val) => {
    setJumpIn(val);
  };

  const handleReset = () => {
    form.resetFields();
    hotspotSeekRef.current.seekTo(0);
    setJumpIn("00:00:01");
  };

  const handleEdit = (id, record) => {
    form.setFieldsValue({
      hotspotid: id,
      name: record.name,
    });
    hotspotSeekRef.current.seekTo(record.startPoint);
    const formattedTime = getFormattedTime(record.startPoint);
    setJumpIn(formattedTime);
  };

  const handleDelete = (hotspotid) => {
    form.resetFields();
    hotspotSeekRef.current.seekTo(0);
    setJumpIn("00:00:01");
    dispatch(deleteAction(id, hotspotid, "HOTSPOT"));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Start Point",
      dataIndex: "startPoint",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, data) => (
        <div className={styles.buttonContainer}>
          <span className={styles.editIcon}>
            <EditOutlined onClick={() => handleEdit(id, data)} />
          </span>
          <span className={styles.deleteIcon}>
            <DeleteOutlined onClick={() => handleDelete(id)} />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Form
        initialValues={{
          hotspotid: "",
          name: "",
        }}
        className={styles.hotspotsForm}
        layout={"horizontal"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        <Form.Item label="hotspotid" name="hotspotid" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input hotspot name!" }]}
        >
          <Input placeholder="Enter hotspot name" />
        </Form.Item>
        <Form.Item label="Jump to point in video">
          <div className={styles.testPlayerDiv}>
            <Seeker
              ref={hotspotSeekRef}
              videoUrl={`http://www.youtube.com/watch?v=${mId}`}
              setSeekerTime={handleSetJumpIn}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Input
            className={styles.jumpInTimer}
            value={jumpIn}
            placeholder="00:00:01"
            disabled
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            className={styles.saveButton}
            label={"Save"}
            shape={"round"}
            onClick={handleSubmit}
            danger
          />
          <Button
            className={styles.addNewButton}
            label={"Add New"}
            shape={"round"}
            onClick={() => {
              handleReset();
            }}
            danger
          />
        </Form.Item>
      </Form>

      <Table
        className={styles.hotspotsTable}
        columns={columns}
        dataSource={hotspotData}
        pagination={false}
        bordered
      />
    </div>
  );
};

Hotspots.propTypes = {
  tabdata: PropTypes.object,
  history: PropTypes.object,
};

Hotspots.defaultProps = {
  tabdata: EMPTY_OBJECT,
  history: EMPTY_OBJECT,
};

export default Hotspots;

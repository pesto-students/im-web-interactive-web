import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Input from "imcomponents/atoms/input";
import Table from "imcomponents/atoms/table";
import Seeker from "imcomponents/organisms/seeker";
import Loader from "imcomponents/molecules/loader";

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
import styles from "./timeTriggersTab.module.scss";

const TimeTriggersTab = (props) => {
  const dispatch = useDispatch();
  const { tabdata, loading } = props;
  const { id, mId, triggers } = tabdata;
  const triggerData = !_isEmpty(triggers) ? Object.values(triggers) : [];
  const [jumpIn, setJumpIn] = useState("00:00:01");
  const [jumpOut, setJumpOut] = useState("00:00:01");

  const triggerSeekInRef = useRef(null);
  const triggerSeekOutRef = useRef(null);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 1 },
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    const secIn = countSeconds(jumpIn);
    const secOut = countSeconds(jumpOut);
    dispatch(
      addAction(
        {
          id: id,
          data: {
            id: values.triggerid,
            type: values.type,
            name: values.name,
            startPoint: secIn,
            skipTo: secOut,
          },
        },
        "TRIGGER"
      )
    );
  };

  const onFinishFailed = (errorInfo) => {
    Sentry.captureMessage("User Error at Triggers");
    Sentry.captureException(errorInfo);
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleSetJumpIn = (val) => {
    setJumpIn(val);
  };

  const handleSetJumpOut = (val) => {
    setJumpOut(val);
  };

  const handleReset = () => {
    form.resetFields();
    triggerSeekInRef.current.seekTo(0);
    triggerSeekOutRef.current.seekTo(0);
    setJumpIn("00:00:01");
    setJumpOut("00:00:01");
  };

  const handleEdit = (id, record) => {
    form.setFieldsValue({
      triggerid: id,
      name: record.name,
    });
    triggerSeekInRef.current.seekTo(record.startPoint);
    triggerSeekOutRef.current.seekTo(record.skipTo);
    const formattedTimeIn = getFormattedTime(record.startPoint);
    const formattedTimeOut = getFormattedTime(record.skipTo);
    setJumpIn(formattedTimeIn);
    setJumpOut(formattedTimeOut);
  };

  const handleDelete = (triggerid) => {
    form.resetFields();
    triggerSeekInRef.current.seekTo(0);
    triggerSeekOutRef.current.seekTo(0);
    setJumpIn("00:00:01");
    setJumpOut("00:00:01");
    dispatch(deleteAction(id, triggerid, "TRIGGER"));
  };

  const columns = [
    {
      title: "Trigger Name",
      dataIndex: "name",
    },
    {
      title: "Start Point",
      dataIndex: "startPoint",
      render: (val) => getFormattedTime(val),
    },
    {
      title: "Skip To",
      dataIndex: "skipTo",
      render: (val) => getFormattedTime(val),
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
      {loading ? (
        <Loader />
      ) : (
        <Form
          {...formItemLayout}
          className={styles.timeTriggersForm}
          layout={"horizontal"}
          form={form}
          initialValues={{
            triggerid: "",
            type: "JUMP_POINT",
            name: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="triggerid" name="triggerid" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Input value={"Jump Point"} disabled={true} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input trigger name!" }]}
          >
            <Input placeholder="Enter hotspot name" />
          </Form.Item>
          <Form.Item label="In point">
            <div className={styles.testPlayerDiv}>
              <Seeker
                ref={triggerSeekInRef}
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
          <Form.Item label="Out point">
            <div className={styles.testPlayerDiv}>
              <Seeker
                ref={triggerSeekOutRef}
                videoUrl={`http://www.youtube.com/watch?v=${mId}`}
                setSeekerTime={handleSetJumpOut}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Input
              className={styles.jumpInTimer}
              value={jumpOut}
              placeholder="00:00:01"
              disabled
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
          <Button
              className={styles.addNewButton}
              label={"Add New"}
              onClick={() => {
                handleReset();
              }}
            />
            <Button
              className={styles.saveButton}
              label={"Save"}
              onClick={handleSubmit}
            />
          </Form.Item>
        </Form>
      )}
      <Table
        className={styles.timeTriggersTable}
        columns={columns}
        dataSource={triggerData}
        pagination={true}
        bordered
      />
    </div>
  );
};

TimeTriggersTab.propTypes = {
  tabdata: PropTypes.object,
  history: PropTypes.object,
};

TimeTriggersTab.defaultProps = {
  tabdata: EMPTY_OBJECT,
  history: EMPTY_OBJECT,
};

export default TimeTriggersTab;

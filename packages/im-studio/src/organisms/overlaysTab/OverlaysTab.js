import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Input from "imcomponents/atoms/input";
import Table from "imcomponents/atoms/table";
import { Select, Option } from "imcomponents/atoms/select";
import Seeker from "imcomponents/organisms/seeker";
import Loader from "imcomponents/molecules/loader";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Utils
import { getFormattedTime, countSeconds } from "imbase/utils/getFormattedTime";

// Constants
import { EMPTY_OBJECT, EMPTY_ARRAY } from "imbase/constants/base.constants";

// Sentry
import * as Sentry from "@sentry/react";

// Redux Actions
import { addAction, deleteAction } from "../../redux/movies/actions";

// icons
import { EditOutlined, DeleteOutlined } from "imcomponents/atoms/icon";

// Styles
import styles from "./overlaysTab.module.scss";

const OverlaysTab = (props) => {
  const dispatch = useDispatch();
  const { tabdata, loading } = props;
  const { id, mId, overlays, hotspots } = tabdata;
  const hotspotData = !_isEmpty(hotspots)
    ? Object.values(hotspots)
    : EMPTY_ARRAY;
  const overlayData = !_isEmpty(overlays)
    ? Object.values(overlays)
    : EMPTY_ARRAY;
  const [jumpIn, setJumpIn] = useState("00:00:01");

  // Ref for seeker
  const overlaySeekRef = useRef(null);

  // Styles for tabs
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 1 },
  };

  // Table Config
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Jump Point",
      dataIndex: "jumpPoint",
      render: (val) => getFormattedTime(val),
    },
    {
      title: "Template",
      dataIndex: "templateTitle",
    },
    {
      title: "Left Hotspot",
      dataIndex: "leftActionHotspot",
      render: (id, data) => (
        <span>
          {hotspotData
            .filter((obj) => obj.id === id)
            .map((obj) => {
              if (obj.name) {
                return obj.name;
              }
              return "";
            })}
        </span>
      ),
    },
    {
      title: "Right Hotspot",
      dataIndex: "rightActionHotspot",
      render: (id, data) => (
        <span>
          {hotspotData
            .filter((obj) => obj.id === id)
            .map((obj) => {
              if (obj.name) {
                return obj.name;
              }
              return "";
            })}
        </span>
      ),
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

  // Form Methods
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const sec = countSeconds(jumpIn);
    dispatch(
      addAction(
        {
          id: id,
          data: {
            id: values.overlayid,
            name: values.name,
            jumpPoint: sec,
            templateTitle: values.title,
            leftActionHotspot: values.lefthotspot,
            rightActionHotspot: values.righthotspot,
          },
        },
        "OVERLAY"
      )
    );
  };

  const onFinishFailed = (errorInfo) => {
    Sentry.captureMessage("User Error at Overlays");
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
    overlaySeekRef.current.seekTo(0);
    setJumpIn("00:00:01");
  };

  const handleEdit = (id, record) => {
    // Somewhere else, even another file
    form.setFieldsValue({
      overlayid: id,
      name: record.name,
      title: record.templateTitle,
      lefthotspot: record.leftActionHotspot,
      righthotspot: record.rightActionHotspot,
    });
    overlaySeekRef.current.seekTo(record.jumpPoint);
    const formattedTime = getFormattedTime(record.jumpPoint);
    setJumpIn(formattedTime);
  };

  const handleDelete = (overlayid) => {
    form.resetFields();
    overlaySeekRef.current.seekTo(0);
    setJumpIn("00:00:01");
    dispatch(deleteAction(id, overlayid, "OVERLAY"));
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <Form
          initialValues={{
            templateid: "1",
            overlayid: "",
            name: "",
            title: "",
            lefthotspot: "",
            righthotspot: "",
          }}
          {...formItemLayout}
          className={styles.overlaysForm}
          layout={"horizontal"}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="overlayid" name="overlayid" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Template"
            name="templateid"
            rules={[{ required: true, message: "Please input overlay name!" }]}
          >
            <Select defaultValue="1" disabled>
              <Option value="1">STICKY_MODAL</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input overlay name!" }]}
          >
            <Input placeholder="Enter overlay name" />
          </Form.Item>
          <Form.Item label="Jump to point in video">
            <div className={styles.testPlayerDiv}>
              <Seeker
                ref={overlaySeekRef}
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
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="lefthotspot"
            label="Left Hotspot Action"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a option and change input text above">
              {_map(hotspotData, (hotspot) => {
                if (!_isEmpty(hotspot)) {
                  return (
                    <Option key={`hotspot-${hotspot.id}`} value={hotspot.id}>
                      {hotspot.name}
                    </Option>
                  );
                }
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="righthotspot"
            label="Right Hotspot Action"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              {_map(hotspotData, (hotspot) => {
                if (!_isEmpty(hotspot)) {
                  return (
                    <Option key={`hotspot-${hotspot.id}`} value={hotspot.id}>
                      {hotspot.name}
                    </Option>
                  );
                }
              })}
            </Select>
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
      )}
      <Table
        className={styles.overlaysTable}
        columns={columns}
        dataSource={overlayData}
        pagination={true}
        bordered
      />
    </div>
  );
};

OverlaysTab.propTypes = {
  tabdata: PropTypes.object,
  history: PropTypes.object,
};

OverlaysTab.defaultProps = {
  tabdata: EMPTY_OBJECT,
  history: EMPTY_OBJECT,
};

export default OverlaysTab;

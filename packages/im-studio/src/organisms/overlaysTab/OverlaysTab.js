import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form";
import Input from "imcomponents/atoms/input";
import Table from "imcomponents/atoms/table";
import { Modal, AntdButton } from "imcomponents/atoms/modal";
import { Select, Option } from "imcomponents/atoms/select";
import Seeker from "imcomponents/organisms/seeker";

// Utils
import { getFormattedTime } from "imbase/utils/getFormattedTime";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// icons
import { EditOutlined, DeleteOutlined } from "imcomponents/atoms/icon";

// Styles
import styles from "./overlaysTab.module.scss";

const OverlaysTab = (props) => {
  const { tabdata, history } = props;
  const { id, overlays, template, templateActions } = tabdata;

  const [jumpIn, setJumpIn] = useState("0:01");

  // Modal
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
      title: "Start Point",
      dataIndex: "startPoint",
    },
    {
      title: "Template",
      dataIndex: "template",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, data) => (
        <div className={styles.buttonContainer}>
          {/* TODO: buttons working */}
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
    console.log("Success:", values);
    console.log("Success:", jumpIn);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onBack = (errorInfo) => {
    history.push("#2");
  };

  const onNext = (errorInfo) => {
    history.push("#4");
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleSetJumpIn = (val) => {
    console.log(val);
    setJumpIn(val);
  };

  const handleReset = () => {
    form.resetFields();
    overlaySeekRef.current.seekTo(0);
    setJumpIn("0:01");
  };

  const handleEdit = (id, record) => {
    console.log(id);
    form.setFieldsValue({
      hotspotid: id,
      name: record.name,
    });
    overlaySeekRef.current.seekTo(record.startPoint);
    const formattedTime = getFormattedTime(record.startPoint);
    setJumpIn(formattedTime);
  };

  const handleDelete = () => {
    form.resetFields();
    overlaySeekRef.current.seekTo(0);
    setJumpIn("0:01");
  };

  const handleAddTemplate = () => {
    setVisible(true);
  };

  // Modal
  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };
  return (
    <div className={styles.container}>
      <Form
        initialValues={{
          templateid: "1",
          overlayid: "",
          name: "",
        }}
        {...formItemLayout}
        className={styles.overlaysForm}
        layout={"horizontal"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
              videoUrl={`http://www.youtube.com/watch?v=${id}`}
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
        <Form.Item label="Template Action">
          <Button
            label="Add/Edit"
            className={styles.addEditOverlaybutton}
            shape={"round"}
            onClick={handleAddTemplate}
            danger
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            className={styles.backButton}
            label={"Back"}
            shape={"round"}
            onClick={onBack}
            ghost
          />
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
          <Button
            className={styles.backButton}
            label={"Next"}
            shape={"round"}
            onClick={onNext}
            ghost
          />
        </Form.Item>
      </Form>

      <Table
        className={styles.overlaysTable}
        columns={columns}
        dataSource={overlays}
        pagination={false}
        bordered
      />
      <Modal
        visible={visible}
        title={"Template Action"}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={[
          <AntdButton key="back" onClick={handleCancel}>
            Return
          </AntdButton>,
          <AntdButton
            key="submit"
            type="danger"
            loading={loading}
            onClick={handleSave}
          >
            Save
          </AntdButton>,
        ]}
      >
        <Form
          initialValues={{
            templateActionid: "",
            templateid: "1",
            overlayid: "",
            title: "",
            lefthotspot: "male",
            righthotspot: "female",
          }}
          className={styles.overlaysForm}
          layout={"horizontal"}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          labelAlign="left"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="lefthotspot"
            label="Left Hotspot Action"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a option and change input text above">
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
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
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
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

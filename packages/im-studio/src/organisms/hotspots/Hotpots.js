import React from "react";
import PropTypes from "prop-types";

// Components
import { Table } from 'antd';
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form"
import Input from "imcomponents/atoms/input";
import { EditOutlined, DeleteOutlined } from "imcomponents/atoms/icon";
import TextArea from "imcomponents/atoms/textArea";

// Styles
import styles from "./hotspots.module.scss";

// Helper
import { isBackDisabled } from "../../utils/tabHelper.general";

const columns = [
    {
        title: 'No.',
        dataIndex: 'serialNumber',
        // render: text => <a>{text}</a>
    },
    {
        title: 'Group Name',
        dataIndex: 'groupName',
        // render: text => <a>{text}</a>
    },
    {
        title: 'Start Point',
        dataIndex: 'startPoint',
        // render: text => <a>{text}</a>
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        render: icons => (
        <>
            <a className={styles.editIcon}>
                <EditOutlined />
            </a>
            <a className={styles.deleteIcon}>
                <DeleteOutlined />
            </a>
        </>
        )
    },
];

const data = [
    {
        key: '1',
        serialNumber: '1',
        groupName: 'Explore Kitchen',
        startPoint: '01:00',
        actions: 'TODO',
    },
    {
        key: '2',
        serialNumber: '2',
        groupName: 'Explore Living',
        startPoint: '03:00',
        actions: 'TODO',
    },
    {
        key: '3',
        serialNumber: '3',
        groupName: 'Explore Gallery',
        startPoint: '05:00',
        actions: 'TODO',
    },
    {
        key: '4',
        serialNumber: '4',
        groupName: 'Explore Terrace',
        startPoint: '07:00',
        actions: 'TODO',
    },
];

const Hotspots = (props) => {
    const { changeTab, activeTabKey, ...restProps } = props;

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };

    const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 2 },
    };

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
            <Form
                {...formItemLayout}
                className={styles.hotspotsForm}
                layout={"horizontal"}
                form={form}
            >
                <Form.Item label="Group Name">
                    <Input
                        placeholder="Enter group name"
                    // value={videoTitle}
                    />
                </Form.Item>
                <Form.Item label="Jump to point in video">
                    <div className={styles.testPlayerDiv}>

                    </div>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button
                        className={styles.backButton}
                        label={"Back"}
                        shape={"round"}
                        disabled={isBackDisabled(activeTabKey)}
                    // onClick={() => changeTab("2")}
                    />
                    <Button
                        className={styles.saveButton}
                        label={"Save"}
                        shape={"round"}
                        // onClick={() => changeTab("2")}
                        danger
                    />
                    <Button
                        className={styles.addNewButton}
                        label={"Add New"}
                        shape={"round"}
                        // onClick={() => changeTab((parseInt(activeTabKey) + 1).toString())}
                        danger
                    />
                </Form.Item>
            </Form>

            <Table
                className={styles.hotspotsTable}
                columns={columns}
                dataSource={data}
                bordered
            />
        </div>
    );
};

Hotspots.propTypes = {
    changeTab: PropTypes.func
}

Hotspots.defaultProps = {
    changeTab: () => { }
}

export default Hotspots;
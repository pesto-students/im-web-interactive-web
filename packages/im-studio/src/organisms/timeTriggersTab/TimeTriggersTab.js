import React from "react";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form"
import Input from "imcomponents/atoms/input";
import Table from 'imcomponents/atoms/table';
import { EditOutlined, DeleteOutlined, DownOutlined } from "imcomponents/atoms/icon";

// Styles
import styles from "./timeTriggersTab.module.scss";

const columns = [
    {
        title: 'No.',
        dataIndex: 'serialNumber',
        width: '5%'
    },
    {
        title: 'Trigger Name',
        dataIndex: 'triggerName',
    },
    {
        title: 'In Point',
        dataIndex: 'inPoint',
        sorter: true
    },
    {
        title: 'Out Point',
        dataIndex: 'outPoint',
        sorter: true
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: '',
        dataIndex: 'actions',
        render: icons => (
            <div className={styles.buttonContainer}>
                <a className={styles.editIcon}>
                    <EditOutlined />
                </a>
                <a className={styles.deleteIcon}>
                    <DeleteOutlined />
                </a>
            </div>
        )
    },
];

const data = [
    {
        key: '1',
        serialNumber: '1',
        triggerName: 'Trigger-1',
        inPoint: '01:00',
        outPoint: '02:00',
        type: 'Jump point',
        actions: 'TODO'
    },
    {
        key: '2',
        serialNumber: '2',
        triggerName: 'Trigger-2',
        inPoint: '03:00',
        outPoint: '04:00',
        type: 'Jump point',
        actions: 'TODO'
    },
    {
        key: '3',
        serialNumber: '3',
        triggerName: 'Trigger-3',
        inPoint: '05:00',
        outPoint: '06:00',
        type: 'Jump point',
        actions: 'TODO'
    }
];

const TimeTriggersTab = (props) => {
    const { changeTab, activeTabKey, ...restProps } = props;

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };

    const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 1 },
    };

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
            <Form
                {...formItemLayout}
                className={styles.timeTriggersForm}
                layout={"horizontal"}
                form={form}
            >
                <Form.Item label="Type">
                    <Input
                        value={"Jump Point"}
                        disabled={true}
                    />
                </Form.Item>
                <Form.Item label="Label">
                    <Input
                        placeholder="Enter label"
                    />
                </Form.Item>
                <Form.Item label="In point">
                    <div className={styles.testPlayerDiv}>
                        {/* TODO: Add player */}
                    </div>
                </Form.Item>
                <Form.Item>
                    <Input
                        className={styles.jumpInTimer}
                        placeholder="00:01:00"
                    />
                </Form.Item>
                <Form.Item label="Out point">
                    <div className={styles.testPlayerDiv}>
                        {/* TODO: Add player */}
                    </div>
                </Form.Item>
                <Form.Item>
                    <Input
                        className={styles.jumpInTimer}
                        placeholder="00:01:00"
                    />
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button
                        className={styles.backButton}
                        label={"Back"}
                        shape={"round"}
                    // TODO: Should move to previous tab
                    />
                    <Button
                        className={styles.saveButton}
                        label={"Save"}
                        shape={"round"}
                        // TODO: should save to DB and move to next tab
                        danger
                    />
                    <Button
                        className={styles.addNewButton}
                        label={"Add New"}
                        shape={"round"}
                        // TODO: Add new hotspot
                        danger
                    />
                </Form.Item>
            </Form>

            <Table
                className={styles.timeTriggersTable}
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
            />
        </div>
    );
};

TimeTriggersTab.propTypes = {
    changeTab: PropTypes.func
}

TimeTriggersTab.defaultProps = {
    changeTab: () => { }
}

export default TimeTriggersTab;
import React from "react";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form"
import Input from "imcomponents/atoms/input";
import Table from 'imcomponents/atoms/table';

// Styles
import styles from "./hotspots.module.scss";

const columns = [
    {
        title: 'No.',
        dataIndex: 'serialNumber',
        width: '5%'
    },
    {
        title: 'Group Name',
        dataIndex: 'groupName',
    },
    {
        title: 'Start Point',
        dataIndex: 'startPoint',
        sorter: true
    },
    {
        title: '',
        dataIndex: 'actions',
        render: () => (
            <div className={styles.buttonContainer}>
                {/* TODO: buttons working */}
                {/* <a 
                className={styles.editIcon}
                href={"#"}
            >
                <EditOutlined />
            </a>
            <a 
                className={styles.deleteIcon}
                href="#"
            >
                <DeleteOutlined />
            </a> */}
            </div>
        )
    },
];

// TODO: Get data from server
const data = [
    {
        key: '1',
        serialNumber: '1',
        groupName: 'Explore Kitchen',
        startPoint: '01:00',
        actions: 'TODO'
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
        actions: 'TODO'
    }
];

const Hotspots = (props) => {
    const { changeTab, activeTabKey } = props;
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
                className={styles.hotspotsForm}
                layout={"horizontal"}
                form={form}
            >
                <Form.Item label="Group Name">
                    <Input
                        placeholder="Enter group name"
                    />
                </Form.Item>
                <Form.Item label="Jump to point in video">
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
                        onClick={changeTab((parseInt(activeTabKey) - 1).toString())}
                    // TODO: Should move to previous tab
                    />
                    <Button
                        className={styles.saveButton}
                        label={"Save"}
                        shape={"round"}
                        onClick={changeTab((parseInt(activeTabKey) + 1).toString())}
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
                className={styles.hotspotsTable}
                columns={columns}
                dataSource={data}
                pagination={false}
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
import React from "react";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Dropdown from "imcomponents/atoms/dropdown";
import Form from "imcomponents/atoms/form"
import Input from "imcomponents/atoms/input";
import Menu from "imcomponents/atoms/menu";
import Table from 'imcomponents/atoms/table';
import { DownOutlined } from "imcomponents/atoms/icon";

// Styles
import styles from "./overlaysTab.module.scss";

const columns = [
    {
        title: 'No.',
        dataIndex: 'serialNumber',
        width: '5%'
    },
    {
        title: 'Overlay Name',
        dataIndex: 'overlayName',
    },
    {
        title: 'Start Point',
        dataIndex: 'startPoint',
        sorter: true
    },
    {
        title: 'Template',
        dataIndex: 'template',
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

// TODO: fetch data from server
const data = [
    {
        key: '1',
        serialNumber: '1',
        overlayName: 'Overlay-1',
        startPoint: '01:00',
        template: 'Sticky_Modal',
        actions: 'TODO'
    },
    {
        key: '2',
        serialNumber: '2',
        overlayName: 'Overlay-2',
        startPoint: '03:00',
        template: 'Sticky_Modal',
        actions: 'TODO',
    },
    {
        key: '3',
        serialNumber: '3',
        overlayName: 'Overlay-3',
        startPoint: '05:00',
        template: 'Sticky_Modal',
        actions: 'TODO',
    },
    {
        key: '4',
        serialNumber: '4',
        overlayName: 'Overlay-4',
        startPoint: '07:00',
        template: 'Sticky_Modal',
        actions: 'TODO'
    }
];

const OverlaysTab = (props) => {
    const { changeTab, activeTabKey } = props;

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };

    const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 1 },
    };

    function handleMenuClick(e) {
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" >
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" >
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" >
                3rd menu item
            </Menu.Item>
        </Menu>
    );

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
            <Form
                {...formItemLayout}
                className={styles.overlaysForm}
                layout={"horizontal"}
                form={form}
            >
                <Form.Item label="Change Overlay Template">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            className={styles.dropDownButton}
                            label={"Select template"}
                            icon={<DownOutlined />}
                            type={"default"}
                        >

                        </Button>
                    </Dropdown>
                </Form.Item>
                <Form.Item label="Overlay Name">
                    <Input
                        placeholder="Enter overlay name"
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
                <Form.Item label="Template Action">
                    <Button
                        label="Add/Edit"
                        className={styles.addEditOverlaybutton}
                        shape={"round"}
                        danger
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
                        // TODO: Add new overlay for template
                        danger
                    />
                </Form.Item>
            </Form>

            <Table
                className={styles.overlaysTable}
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
            />
        </div>
    );
};

OverlaysTab.propTypes = {
    changeTab: PropTypes.func
}

OverlaysTab.defaultProps = {
    changeTab: () => { }
}

export default OverlaysTab;
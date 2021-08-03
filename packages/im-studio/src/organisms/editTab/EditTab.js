import React from "react";
import PropTypes from "prop-types";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form"
import Input from "imcomponents/atoms/input";
import TextArea from "imcomponents/atoms/textArea";

// Styles
import styles from "./editTab.module.scss";

// Helper
import { isBackDisabled } from "../../utils/tabHelper.general";


const EditTab = (props) => {
    const { changeTab, activeTabKey, ...restProps } = props;

    const formItemLayout = {
        labelCol: { span: 3 },
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
                className={styles.editForm}
                layout={"horizontal"}
                form={form}
            >
                <Form.Item label="Name">
                    <Input
                        placeholder="Enter name"
                    // value={videoTitle}
                    />
                </Form.Item>
                <Form.Item label="YouTube URL">
                    <Input placeholder="Enter YouTube URL" />
                </Form.Item>
                <Form.Item label="Title">
                    <Input
                        placeholder="Enter title"
                    // value={videoTitle}
                    />
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea
                        placeholder="Enter description"
                        // value={videoDescription}
                        rows={4}
                    />
                </Form.Item>
                <Form.Item label="Genre">
                    <Input placeholder="Enter genre" />
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
                        // onClick={() => changeTab((parseInt(activeTabKey) + 1).toString())}
                        danger
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

EditTab.propTypes = {
    changeTab: PropTypes.func
}

EditTab.defaultProps = {
    changeTab: () => { }
}

export default EditTab;
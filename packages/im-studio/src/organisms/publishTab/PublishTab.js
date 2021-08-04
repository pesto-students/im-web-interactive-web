import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Components
import Button from "imcomponents/atoms/button";
import Form from "imcomponents/atoms/form"
import Input from "imcomponents/atoms/input";
import TextArea from "imcomponents/atoms/textArea";

// Styles
import styles from "./publishTab.module.scss";

const PublishTab = (props) => {
    // const [ state, setState ] = useState(EMPTY_OBJECT)
    const { changeTab, activeTabKey, data, ...restProps } = props;
    // setState(data);

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };

    const buttonItemLayout = {
        wrapperCol: { span: 10, offset: 2 },
    };

    const [form] = Form.useForm();

    return (
        <div className={styles.container}>
            <Form
                {...formItemLayout}
                className={styles.publishForm}
                layout={"horizontal"}
                form={form}
            >
                <Form.Item label="Name">
                    Test name
                </Form.Item>
                <Form.Item label="YouTube URL">
                    Test URL
                </Form.Item>
                <Form.Item label="Title">
                    Test Title                   
                </Form.Item>
                <Form.Item label="Description">
                    Test Description
                </Form.Item>
                <Form.Item label="Genre">
                    Test Genre
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Link to="/dashboard">
                        <Button
                            className={styles.backButton}
                            label={"Back"}
                            shape={"round"}
                        />
                    </Link>
                    <Button
                        className={styles.saveButton}
                        label={"Publish"}
                        shape={"round"}
                        // TODO: Should save to DB and move to hoptspots tab 
                        danger
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

PublishTab.propTypes = {
    changeTab: PropTypes.func,
    data: PropTypes.element
}

PublishTab.defaultProps = {
    changeTab: () => { },
    data: EMPTY_OBJECT
}

export default PublishTab;
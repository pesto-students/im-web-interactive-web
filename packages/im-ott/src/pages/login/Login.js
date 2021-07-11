import React, { useState } from "react";

// Components
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Input from "imcomponents/atoms/input";
import Image from "imcomponents/atoms/image";
import Button from "imcomponents/atoms/button";
import { Title, Label } from "imcomponents/atoms/typography";

// Images
import camera from "../../assets/images/camera.png";
import clap from "../../assets/images/clap.png";
import reel from "../../assets/images/reel.png";

// Styles
import styles from "./login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Label className={styles.logo}>iFlix</Label>
      </div>
      <div className={styles.content}>
        <div className={styles.pictures}>
          <Image src={reel} className={styles.image} />
        </div>
        <div className={styles.loginForm}>
          <Title className={styles.title}>Welcome :)</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your personal
            information by mobile number and otp
          </Label>
          <div className={styles.inputField}>
            <Input
              placeholder={"Username"}
              prefix={<UserOutlined className="site-form-item-icon" />}
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <Input
              placeholder={"Password"}
              prefix={<LockOutlined className="site-form-item-icon" />}
              className={styles.input}
            />
          </div>
          <Button label={"Login"} />
        </div>
      </div>
    </div>
  );
};

export default Login;

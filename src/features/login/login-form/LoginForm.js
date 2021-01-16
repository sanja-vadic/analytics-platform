import React from "react";
import { Input, Button, Form } from "antd";
import styles from "./LoginForm.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = ({
   onFinish,
   title,
   badCredentials,
   badCredentialsMessage,
   loginServerFailed,
   loginServerFailedMessage,
   usernameInputRules,
   passwordInputRules,
}) => {
   return (
      <div className={styles.loginFormContainer}>
         <h2>{title}</h2>
         <Form className={styles.loginForm} onFinish={onFinish}>
            <Form.Item name="username" rules={usernameInputRules}>
               <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={passwordInputRules}>
               <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
               <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                  Log in
               </Button>
               <p>{badCredentials ? badCredentialsMessage : ""}</p>
               <p>{loginServerFailed ? loginServerFailedMessage : ""}</p>
            </Form.Item>
         </Form>
      </div>
   );
};

export default LoginForm;

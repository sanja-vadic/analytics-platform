import React from "react";
import LoginForm from "./login-form/LoginForm";
import styles from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./loginPageSlice";
import { Row } from "antd";

const LoginPage = (props) => {
   const dispatch = useDispatch();
   const badCredentials = useSelector((state) => state.loginPage.badCredentials);
   const loginServerFailed = useSelector((state) => state.loginPage.loginServerFailed);

   const onFinish = (values) => {
      dispatch(login(values.username, values.password));
   };

   const usernameInputRules = [
      {
         required: true,
         message: "Please input your Username!",
      },
   ];

   const passwordInputRules = [
      {
         required: true,
         message: "Please input your Password!",
      },
   ];

   return (
      <Row align="middle" justify="center" className={styles.loginFormContainer}>
         <LoginForm
            title="Login"
            onFinish={onFinish}
            badCredentials={badCredentials}
            badCredentialsMessage="Wrong credentials! Try again..."
            loginServerFailed={loginServerFailed}
            loginServerFailedMessage="There is an error on server. Try again later."
            usernameInputRules={usernameInputRules}
            passwordInputRules={passwordInputRules}
         />
      </Row>
   );
};

export default LoginPage;

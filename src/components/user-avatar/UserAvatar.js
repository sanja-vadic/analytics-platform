import React from "react";
import styles from "./UserAvatar.module.css";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { signOut } from "./userAvatarService";
import { useDispatch } from "react-redux";

const UserAvatar = ({ fullName = "John Doe", email = "john.doe@gmail.com" }) => {
   const dispatch = useDispatch();

   const menu = (
      <Menu className={styles.antDropdownMenu}>
         <Menu.Item disabled>
            <div className={styles.userInfo}>
               <div className={styles.userFullName}>
                  <UserOutlined />
                  <span className={styles.userNameText}>{fullName}</span>
               </div>
               <div className={styles.userEmail}>
                  <MailOutlined />
                  <span className={styles.userEmailText}>{email}</span>
               </div>
            </div>
         </Menu.Item>
         <Menu.Item key="0" icon={<LogoutOutlined />} onClick={(event) => signOut(dispatch)}>
            <a href="#">Sign out</a>
         </Menu.Item>
      </Menu>
   );

   return (
      <>
         <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <a className={styles.user} onClick={(e) => e.preventDefault()}>
               <div className={styles.userMenuContainer}>
                  <Avatar style={{ backgroundColor: "#1890FF" }} icon={<UserOutlined />} />
               </div>
            </a>
         </Dropdown>
      </>
   );
};

export default UserAvatar;

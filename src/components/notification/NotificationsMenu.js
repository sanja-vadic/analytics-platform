import React from "react";
import styles from "./NotificationsMenu.module.css";
import { Badge, Dropdown, Menu } from "antd";
import { BellFilled } from "@ant-design/icons";
import NotificationItem from "./notification-item/NotificationItem";
import { ALERT_NOTIFICATION_TYPE, GOAL_NOTIFICATION_TYPE } from "../../constants/constants";

const NotificationsMenu = (props) => {
   const extendedMenu = (
      <Menu className={styles.antDropdownMenu}>
         <Menu.Item key="0" style={{ height: "var(--notification-item-height)", borderBottom: "1px solid #e6e6e6" }}>
            <NotificationItem
               type={ALERT_NOTIFICATION_TYPE}
               title="Site loading speed is too high"
               description="Number of sites affected: 2"
            />
         </Menu.Item>
         <Menu.Item key="1" style={{ height: "var(--notification-item-height)", borderBottom: "1px solid #e6e6e6" }}>
            <NotificationItem
               type={GOAL_NOTIFICATION_TYPE}
               title="Visitors Goal Reached"
               description="Goal: 200 -> Reached: 225"
            />
         </Menu.Item>
         <Menu.Item
            key="2"
            style={{
               height: "var(--notification-item-height)",
               borderBottom: "1px solid #e6e6e6",
               backgroundColor: "#f1f1f1",
            }}
         >
            <NotificationItem
               type={ALERT_NOTIFICATION_TYPE}
               title="Site loading speed is too high"
               description="Number of sites affected: 2"
            />
         </Menu.Item>
         <Menu.Item key="3" style={{ height: "var(--notification-item-height)", borderBottom: "1px solid #e6e6e6" }}>
            <NotificationItem
               type={GOAL_NOTIFICATION_TYPE}
               title="Visitors Goal Reached"
               description="Goal: 200 -> Reached: 225"
            />
         </Menu.Item>
         <Menu.Item key="4" style={{ textAlign: "center" }}>
            <span className={styles.viewAllNotificationLink}>View all notifications</span>
         </Menu.Item>
      </Menu>
   );

   return (
      <>
         <Dropdown overlay={extendedMenu} trigger={["click"]} placement="bottomRight">
            <a className={styles.notifications} onClick={(e) => e.preventDefault()}>
               <Badge
                  count={5}
                  offset={[30, -20]}
                  size="small"
                  style={{ backgroundColor: "var(--primary-element-color)" }}
               ></Badge>
               <BellFilled />
            </a>
         </Dropdown>
      </>
   );
};

export default NotificationsMenu;

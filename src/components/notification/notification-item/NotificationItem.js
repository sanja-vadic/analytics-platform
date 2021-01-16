import { AlertFilled, FlagFilled } from "@ant-design/icons";
import React from "react";
import { ALERT_NOTIFICATION_TYPE, GOAL_NOTIFICATION_TYPE } from "../../../constants/constants";
import styles from "./NotificationItem.module.css";

const NotificationItem = ({ type, title = "Title", description = "Description", link = "#" }) => {
   return (
      <div className={styles.notificationItemContainer}>
         <div className={styles.typeContainer}>
            {
               {
                  [ALERT_NOTIFICATION_TYPE]: <AlertFilled className={styles.alertIcon} />,
                  [GOAL_NOTIFICATION_TYPE]: <FlagFilled className={styles.goalIcon} />,
               }[type]
            }
         </div>
         <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
               <span>{title}</span>
            </div>
            <div className={styles.descriptionContainer}>
               <span>{description}</span>
            </div>
            <div className={styles.linkContainer}>
               <a href={link}>View details</a>
            </div>
         </div>
      </div>
   );
};

export default NotificationItem;

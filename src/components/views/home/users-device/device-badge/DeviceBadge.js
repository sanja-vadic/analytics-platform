import React from "react";
import AppStatistic from "../../../../app-statistic/AppStatistic";
import styles from "./DeviceBadge.module.css";

const DeviceBadge = (props) => {
   const { icon, title, percentage, newValue, oldValue } = props;
   return (
      <div className={styles.badgeContainer}>
         <div className={styles.iconContainer}>
            <div className={styles.icon}>{icon}</div>
            <span className={styles.title}>{title}</span>
         </div>
         <div className={styles.metrics}>
            <span className={styles.percentage}>{percentage}</span>
            <span className={styles.percentageRatio}>
               <AppStatistic newValue={newValue} oldValue={oldValue} fontSize="12pt" />
            </span>
         </div>
      </div>
   );
};

export default DeviceBadge;

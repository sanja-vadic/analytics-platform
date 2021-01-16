import React from "react";
import styles from "./StepClientId.module.css";

const StepClientId = ({ cid }) => {
   return (
      <div className={styles.stepClientIdContainer}>
         <span className={styles.clientIdLabel}>Your ID is:</span>
         <span className={styles.clientId}>{cid}</span>
         <br />
         <span className={styles.description}>CID is automatically set into tracking code snippet.</span>
         <br />
         <br />
         <div className={styles.detailedDescriptionContainer}>
            <span className={styles.detailedDescription}>
               This stepper helps with creation of tracking code snippet which you need to insert into your site pages.
            </span>
            <br />
            <br />
            <span className={styles.detailedDescription}>
               There is an 3 types of possible tracking options: standard, timers and events.
            </span>
            <br />
            <span className={styles.detailedDescription}>
               <span className={styles.bold}>Standard options</span> represents tracking of page view, screen view,
               acquisition, localtime etc.
            </span>
            <br />
            <span className={styles.detailedDescription}>
               <span className={styles.bold}>Timer options</span> represents tracking of loading time and user's time on
               page.
            </span>
            <br />
            <span className={styles.detailedDescription}>
               <span className={styles.bold}>Event options</span> represents tracking of click and hover events for
               specific elements.
            </span>
            <br />
         </div>
      </div>
   );
};

export default StepClientId;

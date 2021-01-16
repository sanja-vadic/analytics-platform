import React from "react";
import CompleteRangePickerGlobal from "../../interval/complete-range-picker/CompleteRangePickerGlobal";
import styles from "./Page.module.css";

const Page = ({ label, printableClassName = "printable", children }) => {
   return (
      <div className={styles.pageContainer}>
         <div className={styles.label}>{label}</div>
         <div className={`${styles.printable} ${printableClassName}`} id="toPrint">
            <div className={styles.header}>
               <img src="/analytics-logo-dark-grey.png" alt="No image" className={styles.reportLogo} />
               <CompleteRangePickerGlobal />
            </div>
            <div className={styles.content}>{children}</div>
         </div>
      </div>
   );
};

export default Page;

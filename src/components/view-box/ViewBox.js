import { Spin } from "antd";
import React from "react";
import {
   COMPLETE_RANGE,
   HORIZONTAL_LARGE_4_DYNAMIC_HEIGHT_VIEW_BOX,
   HORIZONTAL_LARGE_4_VIEW_BOX,
   HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX,
   HORIZONTAL_LARGE_VIEW_BOX,
   HORIZONTAL_MEDIUM_VIEW_BOX,
   HORIZONTAL_VIEW_BOX,
   RELATIVE_RANGE,
   VERTICAL_VIEW_BOX,
} from "../../constants/constants";
import RelativeRangePicker from "../interval/relative-range-picker/RelativeRangePicker";
import CompleteRangePicker from "../interval/complete-range-picker/CompleteRangePicker";
import styles from "./ViewBox.module.css";

const ViewBox = ({
   type = HORIZONTAL_VIEW_BOX,
   headerTitle = "View Box",
   footerVisible = true,
   loading = false,
   intervalType = RELATIVE_RANGE,
   changeInterval,
   children = "Children",
   dragableClass,
}) => {
   return (
      <div
         className={
            {
               [HORIZONTAL_VIEW_BOX]: styles.viewBoxContainerHorizontal,
               [VERTICAL_VIEW_BOX]: styles.viewBoxContainerVertical,
               [HORIZONTAL_LARGE_VIEW_BOX]: styles.viewBoxContainerHorizontalLarge,
               [HORIZONTAL_LARGE_4_VIEW_BOX]: styles.viewBoxContainerHorizontalLarge4,
               [HORIZONTAL_LARGE_4_DYNAMIC_HEIGHT_VIEW_BOX]: styles.viewBoxContainerHorizontalLarge4DynamicHeight,
               [HORIZONTAL_MEDIUM_VIEW_BOX]: styles.viewBoxContainerHorizontalMedium,
               [HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX]: styles.viewBoxContainerHorizontalDynamicHeight,
            }[type]
         }
      >
         <div className={`${styles.header} ${styles.dragableClass}`}>
            <span className={styles.headerTitle}>{headerTitle}</span>
         </div>
         {loading ? (
            <Spin tip="Loading..." className={styles.spinner} />
         ) : (
            <div
               className={
                  {
                     [HORIZONTAL_VIEW_BOX]: styles.childrenContainerHorizontal,
                     [VERTICAL_VIEW_BOX]: styles.childrenContainerVertical,
                     [HORIZONTAL_LARGE_VIEW_BOX]: styles.childrenContainerHorizontalLarge,
                     [HORIZONTAL_LARGE_4_VIEW_BOX]: styles.childrenContainerHorizontalLarge4,
                     [HORIZONTAL_LARGE_4_DYNAMIC_HEIGHT_VIEW_BOX]: styles.childrenContainerHorizontalLarge4DynamicHeight,
                     [HORIZONTAL_MEDIUM_VIEW_BOX]: styles.childrenContainerHorizontalMedium,
                     [HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX]: styles.childrenContainerHorizontalDynamicHeight,
                  }[type]
               }
            >
               {children}
            </div>
         )}
         {footerVisible && (
            <div className={styles.interval}>
               {
                  {
                     [RELATIVE_RANGE]: <RelativeRangePicker changeRelativeRange={changeInterval}></RelativeRangePicker>,
                     [COMPLETE_RANGE]: <CompleteRangePicker changeRelativeRange={changeInterval}></CompleteRangePicker>,
                  }[intervalType]
               }
            </div>
         )}
      </div>
   );
};

export default ViewBox;

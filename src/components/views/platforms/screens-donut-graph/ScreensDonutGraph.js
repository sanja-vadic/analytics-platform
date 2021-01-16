import React from "react";
import { HORIZONTAL_MEDIUM_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import DonutChart from "../../common/donut-chart/DonutChart";
import styles from "./ScreensDonutGraph.module.css";

const ScreensDonutGraph = (props) => {
   const data = [
      { item: "SD", count: 40, percent: 0.4 },
      { item: "HD", count: 21, percent: 0.21 },
      { item: "FHD", count: 17, percent: 0.17 },
      { item: "QHD", count: 13, percent: 0.13 },
      { item: "UHD", count: 9, percent: 0.09 },
   ];
   return (
      <ViewBox footerVisible={false} type={HORIZONTAL_MEDIUM_VIEW_BOX} headerTitle="Platforms screens">
         <div className={styles.content}>
            {/* <div className={styles.chartContainer}> */}
            <DonutChart data={data} containerId="screenDonut1"></DonutChart>
            {/* </div>
            <div className={styles.chartContainer}> */}
            <DonutChart data={data} containerId="screenDonut2"></DonutChart>
            {/* </div>
            <div className={styles.chartContainer}> */}
            <DonutChart data={data} containerId="screenDonut3"></DonutChart>
            {/* </div> */}
         </div>
      </ViewBox>
   );
};

export default ScreensDonutGraph;

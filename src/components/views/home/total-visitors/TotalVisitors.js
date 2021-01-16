import React from "react";
import { Line } from "recharts";
import { getResultByPartId, getSingleValue } from "../../../../common/graph-util/viewUtil";
import styles from "./TotalVisitors.module.css";
import AppStatistic from "../../../app-statistic/AppStatistic";
import { HOME_TOTAL_VISITORS_LINE_PART, HOME_TOTAL_VISITORS_METRIC_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import StandardLineChart from "../../common/standard-line-chart/StandardLineChart";

const TotalVisitors = (props) => {
   const { data, loading, error, dispatchInterval, dragableClass, footerVisible = true } = props;
   let metricPart = getResultByPartId(HOME_TOTAL_VISITORS_METRIC_PART, data);
   let linePart = getResultByPartId(HOME_TOTAL_VISITORS_LINE_PART, data);
   const graphData = linePart
      ? linePart.data.map((row) => {
           return {
              date: row.dimensionValues[0].split("-")[2],
              totalVisitors: row.metricValues[0],
              totalVisitorsBefore: row.metricValues[1],
           };
        })
      : [];

   return (
      <ViewBox
         headerTitle="Total Visitors"
         changeInterval={dispatchInterval}
         loading={loading}
         dragableClass={dragableClass}
         footerVisible={footerVisible}
      >
         <div className={styles.metricHolder}>
            <span className={styles.metricValue}>{getSingleValue(metricPart)}</span>
            <span className={styles.metricPercentage}>
               <AppStatistic newValue={10232} oldValue={9999} />
            </span>
         </div>
         <div className={styles.graphContainer}>
            <StandardLineChart graphData={graphData}>
               <Line type="monotone" dataKey="totalVisitors" stroke="#1890FF" strokeWidth="2" activeDot={{ r: 8 }} />
               <Line
                  type="monotone"
                  dataKey="totalVisitorsBefore"
                  stroke="#1890FF"
                  strokeDasharray="3 3"
                  activeDot={{ r: 8 }}
               />
            </StandardLineChart>
         </div>
      </ViewBox>
   );
};

export default TotalVisitors;

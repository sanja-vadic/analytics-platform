import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { HOME_ACQUISITION_OVERVIEW_STACKED_BAR_PART, HORIZONTAL_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import styles from "./AcquisitionOverview.module.css";

const AcquisitionOverview = ({ data, loading, error, dispatchInterval, footerVisible = true }) => {
   const barPart = getResultByPartId(HOME_ACQUISITION_OVERVIEW_STACKED_BAR_PART, data);
   let barData = [];
   if (barPart) {
      for (let item of barPart.data) {
         let element = {
            date: item.dimensionValues[0],
            direct: item.metricValues[0],
            searchEngine: item.metricValues[1],
            social: item.metricValues[2],
            referal: item.metricValues[3],
            other: item.metricValues[4],
         };
         barData.push(element);
      }
   }

   return (
      <ViewBox type={HORIZONTAL_VIEW_BOX} footerVisible={footerVisible} headerTitle="Acquisition Overview">
         {" "}
         <div className={styles.graphContainer}>
            <BarChart width={650} height={360} data={barData}>
               <CartesianGrid strokeDasharray="1 1" vertical={false} />
               <XAxis dataKey="date" tick={{ fill: "#aaa" }} stroke="#aaa" />
               <YAxis orientation="right" axisLine={false} tick={{ fill: "#aaa" }} />
               <Tooltip cursor={false} />
               <Legend />
               <Bar stackId="acquisitionOverview" dataKey="direct" fill="#3367D6" />
               <Bar stackId="acquisitionOverview" dataKey="searchEngine" fill="#4285F4" />
               <Bar stackId="acquisitionOverview" dataKey="social" fill="#72A4F7" />
               <Bar stackId="acquisitionOverview" dataKey="referal" fill="#9DBFF5" />
               <Bar stackId="acquisitionOverview" dataKey="other" fill="#D0E0FC" />
            </BarChart>
         </div>
      </ViewBox>
   );
};

export default AcquisitionOverview;

import React, { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX, TIMERS_LOAD_SPEED_AREA_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import styles from "./EventsArea.module.css";

const EventsArea = ({ data, loading, error }) => {
   const [graphData, setGraphData] = useState([]);

   useEffect(() => {
      const areaPart = getResultByPartId(TIMERS_LOAD_SPEED_AREA_PART, data);
      const mappedData = areaPart
         ? areaPart.data.map((item) => ({
              date: item.dimensionValues[0],
              maxValue: item.metricValues[0],
              ...item.dimensionValues.slice(1).reduce((a, domain) => {
                 const value = item.metricValues[item.dimensionValues.indexOf(domain)];
                 const newResult = { ...a, [domain]: value };
                 return newResult;
              }, {}),
           }))
         : [];
      console.log("mapped data:", mappedData);
      setGraphData(mappedData);
   }, [data]);

   return (
      <ViewBox type={HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX} headerTitle="Events per domain" loading={loading}>
         <div className={styles.graphContainer}>
            <AreaChart width={1650} height={350} data={graphData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
               <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#b3daff" stopOpacity={0.9} />
                     <stop offset="95%" stopColor="#b3daff" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="date" tick={{ fill: "#aaa" }} stroke="#aaa" />
               <YAxis dataKey="maxValue" orientation="right" axisLine={false} tick={{ fill: "#aaa" }} />
               <Tooltip />
               {graphData[0] ? Object.keys(graphData[0])
                  .filter((item) => item !== "date" && item !== "maxValue")
                  .map((key) => (
                     <Area type="monotone" dataKey={key} stroke={"#99ceff"} fillOpacity={1} fill="url(#colorUsers)" />
                  )) : ''}
            </AreaChart>
         </div>
      </ViewBox>
   );
};

export default EventsArea;

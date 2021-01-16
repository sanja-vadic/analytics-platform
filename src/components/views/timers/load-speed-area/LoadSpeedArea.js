import React, { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { HORIZONTAL_LARGE_4_VIEW_BOX, HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX, HORIZONTAL_LARGE_VIEW_BOX, TIMERS_LOAD_SPEED_AREA_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import styles from "./LoadSpeedArea.module.css";

const LoadSpeedArea = ({data, loading, error}) => {
   const [graphData, setGraphData] = useState([]);
   
   useEffect(() => {
      const areaPart = getResultByPartId(TIMERS_LOAD_SPEED_AREA_PART, data);
      const mappedData = areaPart ? areaPart.data.map(item => ({
         date: item.dimensionValues[0],
         maxValue: item.metricValues[0],
         ...item.dimensionValues.slice(1).reduce((a, element) => {
            const value = item.metricValues[item.dimensionValues.indexOf(element)];
            const newResult = {...a, [element]: value};
            console.log('acumulator: ', newResult);
            return newResult;
         }, {})
      })) : [];
      console.log('mapped data: ', mappedData);
      setGraphData(mappedData);
   }, [data]);


   // const graphData = [
   //    {
   //       date:"2020-10-10",
   //       ["/index.html#123"]: 4000,
   //       ["/about.html"]: 2400,
   //       maxValue: 2400,
   //    },
   //    {
   //       date:"2020-10-11",
   //       ["/index.html#123"]: 3000,
   //       ["/about.html"]: 1398,
   //       maxValue: 3000,
   //    },
   //    {
   //       date:"2020-10-12",
   //       ["/index.html#123"]: 2000,
   //       ["/about.html"]: 9800,
   //       maxValue: 9800,
   //    },
   //    {
   //       date:"2020-10-13",
   //       ["/index.html#123"]: 2780,
   //       ["/about.html"]: 3908,
   //       maxValue: 3908,
   //    },
   //    {
   //       date:"2020-10-14",
   //       ["/index.html#123"]: 1890,
   //       ["/about.html"]: 4800,
   //       maxValue: 2400,
   //    },
   //    {
   //       date:"2020-10-15",
   //       ["/index.html#123"]: 2390,
   //       ["/about.html"]: 3800,
   //       maxValue: 3800,
   //    },
   //    {
   //       date:"2020-10-16",
   //       ["/index.html#123"]: 3490,
   //       ["/about.html"]: 4300,
   //       maxValue: 4300,
   //    },
   // ];
   return (
      <ViewBox type={HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX} headerTitle="Speed area" loading={loading}>
         <div className={styles.graphContainer}>
            <AreaChart width={1650} height={450} data={graphData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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

export default LoadSpeedArea;

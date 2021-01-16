import React, { useEffect, useState } from "react";
import styles from "./PlatformsLine.module.css";
import ViewBox from "../../../view-box/ViewBox";
import StandardLineChart from "../../common/standard-line-chart/StandardLineChart";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { PLATFORM_LINE_GRAPH_PART } from "../../../../constants/constants";
import { Legend, Line } from "recharts";

const PlatformsLine = ({data, loading, error}) => {
   const [graphData, setGraphData] = useState([]);

   useEffect(() => {
      const linePart = getResultByPartId(PLATFORM_LINE_GRAPH_PART, data);
      const mappedData = linePart ? linePart.data.map(part => ({
         date: part.metricValues[0],
         [part.dimensionValues[1]]: part.metricValues[1],
         [part.dimensionValues[2]]: part.metricValues[2],
         [part.dimensionValues[3]]: part.metricValues[3],
         [part.dimensionValues[4]]: part.metricValues[4]
      })) : [];
      setGraphData(mappedData);
   }, [data]);

   return (
      <ViewBox
         headerTitle="Platforms Line"
         //   footerVisible={false} //jer cemo birati da li je browser ili device
         //   changeInterval={dispatchInterval}
           loading={loading}
      >
         <div className={styles.graphContainer}>
            <StandardLineChart graphData={graphData} height={370}>
            <Line type="monotone" dataKey="Mobile" stroke="#1890FF" strokeWidth="2" activeDot={{ r: 8 }} />
               <Line type="monotone" dataKey="Tablet" stroke="#23CFB5" strokeDasharray="2" activeDot={{ r: 8 }} />
               <Line type="monotone" dataKey="PC" stroke="#81B0B2" strokeDasharray="2" activeDot={{ r: 8 }} />
               <Line type="monotone" dataKey="TV" stroke="#1A4764" strokeDasharray="2" activeDot={{ r: 8 }} />
               <Legend />
            </StandardLineChart>
         </div>
      </ViewBox>
   );
};

export default PlatformsLine;

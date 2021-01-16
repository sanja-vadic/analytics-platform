import { Table } from "antd";
import React, { useEffect, useState } from "react";
import ViewBox from "../../../view-box/ViewBox";
import styles from "./TopEventCount.module.css";
import { getResultByPartId } from '../../../../common/graph-util/viewUtil';
import { HOME_TOP_EVENT_COUNT_TABLE_PART } from "../../../../constants/constants";

const TopEventCount = ({data, loading, error}) => {
   const [graphData, setGraphData] = useState([]);
   const columns = [
      {
         title: "Site",
         dataIndex: "site",
         key: "site",
      },
      {
         title: "Element ID",
         dataIndex: "elementId",
         key: "elementId",
      },
      {
         title: "Number",
         dataIndex: "number",
         key: "number",
      },
   ];

   useEffect(() => {
      const tablePart = getResultByPartId(HOME_TOP_EVENT_COUNT_TABLE_PART, data);
      const graphData = tablePart ? tablePart.data.map((item, i) => ({
         key: i,
         site: item.dimensionValues[0],
         elementId: item.dimensionValues[1],
         number: item.metricValues[0]
      })) : [];
      setGraphData(graphData);
   }, [data]);

   return (
      <ViewBox headerTitle="Top event count" loading={loading}>
         <div className={styles.graphContainer}>
            <Table columns={columns} dataSource={graphData} pagination={false} />
         </div>
      </ViewBox>
   );
};

export default TopEventCount;

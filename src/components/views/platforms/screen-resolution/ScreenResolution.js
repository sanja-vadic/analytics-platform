import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { VERTICAL_VIEW_BOX, PLATFORM_SCREEN_RESOLUTIONSTABLE_PART } from "../../../../constants/constants";
import AppStatistic from "../../../app-statistic/AppStatistic";
import ViewBox from "../../../view-box/ViewBox";
import styles from './ScreenResolution.module.css';

// const tableData = [
//    {
//       key: "1",
//       resolution: "1920x1080",
//       value: 100,
//    },
//    {
//       key: "2",
//       resolution: "1366x768",
//       value: 100,
//    },
//    {
//       key: "3",
//       resolution: "1440x900",
//       value: 100,
//    }
// ];

const columns = [
   {
      title: "Screen resolution",
      dataIndex: "resolution",
      key: "resolution",
   },
   {
      title: "# Users",
      key: "value",
      dataIndex: "value",
      align: "right",
   },
];

const ScreenResolution = ({data, loading, error}) => {
   const [tableData, setTableData] = useState([]);

   useEffect(() => {
      const tablePart = getResultByPartId(PLATFORM_SCREEN_RESOLUTIONSTABLE_PART, data);
      const mappedData = tablePart ? tablePart.data.map((item, i) => ({
         key: i + 1, 
         resolution: item.dimensionValues[0],
         value: item.metricValues[0]
      })) : [];
      setTableData(mappedData);
   }, [data]);

   return (
      <ViewBox headerTitle="Screen resolutions" type={VERTICAL_VIEW_BOX} loading={loading} footerVisible={false}>
         <div className={styles.graphContainer}>
            <Table className={styles.table} columns={columns} dataSource={tableData} pagination={false} size="small" />
         </div>
      </ViewBox>
   );
};

export default ScreenResolution;

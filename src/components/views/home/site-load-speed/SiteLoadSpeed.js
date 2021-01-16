import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import AppStatistic from "../../../app-statistic/AppStatistic";
import RelativeRangePicker from "../../../interval/relative-range-picker/RelativeRangePicker";
import styles from "./SiteLoadSpeed.module.css";
import {getResultByPartId} from "../../../../common/graph-util/viewUtil";
import {
   HOME_SITE_LOAD_SPEED_BAR_PART,
   HOME_SITE_LOAD_SPEED_TABLE_PART,
   VERTICAL_VIEW_BOX,
} from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";

const SiteLoadSpeed = ({ data, loading, error }) => {
   const [barChartData, setBarChartData] = useState([]);
   const [tableData, setTableData] = useState([]);

   // const chartData = [
   //    {
   //       domain: "asite.com",
   //       countNew: 55,
   //    },
   //    {
   //       domain: "bsite.com",
   //       countNew: 45,
   //    },
   //    {
   //       domain: "csite.com",
   //       countNew: 35,
   //    },
   //    {
   //       domain: "dsite.com",
   //       countNew: 25,
   //    },
   //    {
   //       domain: "esite.com",
   //       countNew: 15,
   //    },
   // ];

   const columns = [
      {
         title: "Domain",
         dataIndex: "domain",
         key: "domain",
      },
      {
         title: "Speed progress",
         key: "speedProgress",
         render: (text, record) => {
            return (
               <AppStatistic
                  oldValue={-record.oldValue}
                  newValue={-record.newValue}
                  fontSize="12pt"
                  containerStyle={{ float: "right", paddingRight: "10px" }}
               ></AppStatistic>
            );
         },
         align: "right",
      },
   ];

   // const tableData = [
   //    {
   //       key: "1",
   //       domain: "asite.com",
   //       oldValue: 10,
   //       newValue: 5,
   //    },
   //    {
   //       key: "2",
   //       domain: "bsite.com",
   //       oldValue: 3,
   //       newValue: 6,
   //    },
   //    {
   //       key: "3",
   //       domain: "csite.com",
   //       oldValue: 16,
   //       newValue: 7,
   //    },
   //    {
   //       key: "4",
   //       domain: "dsite.com",
   //       oldValue: 3,
   //       newValue: 8,
   //    },
   //    {
   //       key: "5",
   //       domain: "esite.com",
   //       oldValue: 4,
   //       newValue: 9,
   //    },
   // ];

   useEffect(() => {
      const barChartPart = getResultByPartId(HOME_SITE_LOAD_SPEED_BAR_PART, data);
      const tablePart = getResultByPartId(HOME_SITE_LOAD_SPEED_TABLE_PART, data);

      const barChartData = barChartPart
         ? barChartPart.data.map((item) => ({
              domain: item.dimensionValues[0],
              countNew: item.metricValues[0],
           }))
         : [];
      const tableData = tablePart
         ? tablePart.data.map((item, i) => ({
              key: i,
              domain: item.dimensionValues[0],
              oldValue: item.metricValues[0],
              newValue: item.metricValues[1],
           }))
         : [];

      setBarChartData(barChartData);
      setTableData(tableData);
   }, [data]);

   return (
      <ViewBox headerTitle="Site load speed" type={VERTICAL_VIEW_BOX} loading={loading}>
         <div className={styles.graphContainer}>
            <div>
               <BarChart
                  barSize={14}
                  layout="vertical"
                  width={250}
                  height={60 * barChartData.length - barChartData.length * (barChartData.length <= 2 ? 4 : 25)}
                  data={barChartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
               >
                  <XAxis type="number" tick={{ fill: "#aaa", fontSize: "8pt" }} stroke="#aaa" />
                  <YAxis
                     type="category"
                     dataKey="domain"
                     orientation="left"
                     tick={{ fill: "#aaa", fontSize: "8pt" }}
                     axisLine={false}
                  />
                  <Tooltip cursor={false} />
                  <Bar dataKey="countNew" fill="#4285F4" />
               </BarChart>
            </div>
            <div>
               <Table
                  className={styles.table}
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  size="small"
               />
            </div>
         </div>
      </ViewBox>
   );
};

export default SiteLoadSpeed;

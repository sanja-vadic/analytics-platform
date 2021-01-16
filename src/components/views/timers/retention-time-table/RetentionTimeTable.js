import { Space, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { HORIZONTAL_LARGE_4_DYNAMIC_HEIGHT_VIEW_BOX, HORIZONTAL_LARGE_4_VIEW_BOX, HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX, TIMERS_TABLE_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import RetentionTimeInnerTable from "./retention-time-inner-table/RetentionTimeInnerTable";


// const data = [
//    {
//       key: "1",
//       domain: "https://google.com",
//       retentionTime: 3675,
//       retentionTimeBefore: 50,
//    },
//    {
//       key: "2",
//       domain: "https://facebook.com",
//       retentionTime: 3676,
//       retentionTimeBefore: 38,
//    },
//    {
//       key: "3",
//       domain: "https://instagram.com",
//       retentionTime: 3674,
//       retentionTimeBefore: 48,
//    },
//    {
//       key: "4",
//       domain: "https://twitter.com",
//       retentionTime: 3659,
//       retentionTimeBefore: 48,
//    },
//    {
//       key: "5",
//       domain: "https://olx.ba",
//       retentionTime: 380,
//       retentionTimeBefore: 48,
//    },
// ];


const RetentionTimeTable = ({data, loading, error}) => {
   const [tableData, setTableData] = useState([]);

   useEffect(() => {
      const tablePart = getResultByPartId(TIMERS_TABLE_PART, data);
      const mappedData = tablePart ? tablePart.data.map((item, i) => ({
         key: i + 1,
         domain: item.dimensionValues[0],
         retentionTime: item.metricValues[0],
         retentionTimeBefore: item.metricValues[1]
      })) : [];
      setTableData(mappedData);
   }, [data]);

   const columns = [
      {
         title: "Domain",
         dataIndex: "domain",
         key: "domain",
         filters: tableData.map((record) => ({ text: record.domain, value: record.domain })),
         onFilter: (value, record) => record.domain.indexOf(value) === 0,
         sorter: (a, b) => ("" + a.domain).localeCompare(b.domain),
      },
      {
         title: "Retention time",
         key: "retentionTime",
         align: "center",
         width: "250px",
         render: (text, record) => {
            const hours = Math.floor(record.retentionTime / 3600);
            const minutes = Math.floor((record.retentionTime % 3600) / 60);
            const seconds = Math.floor(((record.retentionTime % 3600) % 60));
            
            let format = `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''} ${seconds > 0 ? seconds + 's' : ''}`;

            return format;
         },
         sorter: (a, b) => ("" + a.retentionTime).localeCompare(b.retentionTime),
      },
      {
         title: "Percentage",
         key: "percentage",
         align: "center",
         width: "100px",
         render: (text, record) => (
            <div style={{ display: "flex", width: "100px", border: "1px solid #E9F7FE" }}>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-end",
                     height: "15px",
                     width: "50px",
                     borderRight: "1px solid #bbb",
                  }}
               >
                  {record.retentionTime - record.retentionTimeBefore < 0 ? (
                     <Tooltip title={record.retentionTime}>
                        <div style={{ height: "15px", width: `${30}px`, backgroundColor: "#FFB1AD" }}></div>
                     </Tooltip>
                  ) : (
                     ""
                  )}
               </div>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     height: "15px",
                     width: "50px",
                     borderLeft: "1px solid #bbb",
                  }}
               >
                  {record.retentionTime - record.retentionTimeBefore > 0 ? (
                     <Tooltip title={record.retentionTime}>
                        <div style={{ height: "15px", width: `${30}px`, backgroundColor: "#91D5FF" }}></div>
                     </Tooltip>
                  ) : (
                     ""
                  )}
               </div>
            </div>
         ),
      },
      {
         title: "Actions",
         key: "action",
         align: "center",
         render: (text, record) => (
            <Space size="middle">
               <a href={record.domain}>Go to this page</a>
            </Space>
         ),
      },
   ];

   return (
      <ViewBox type={HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX} footerVisible={false} headerTitle="Timers Table" loading={loading}>
         <Table
            dataSource={tableData}
            columns={columns}
            onChange={(pagination, filters, sorter, extra) => {
               console.log("nesto se promijenilo");
               console.log("pagination: ", pagination);
               console.log("filters: ", filters);
               console.log("sorter: ", sorter);
               console.log("extra: ", extra);
            }}
            expandable={{
               expandedRowRender: (record) => (
                  <div style={{ display: "flex" }}>
                     <RetentionTimeInnerTable domain={record.domain}/>
                  </div>
               ),
            }}
         ></Table>
      </ViewBox>
   );
};

export default RetentionTimeTable;

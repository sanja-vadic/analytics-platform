import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { HOME_TOP_VISITED_PAGES_TABLE_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import styles from "./PagesTopVisitors.module.css";

const PagesToVisitors = ({ data, loading, error }) => {
   const [graphData, setGraphData] = useState([]);

   const columns = [
      {
         title: "Site",
         dataIndex: "site",
         key: "site",
      },
      {
         title: "Page",
         dataIndex: "page",
         key: "page",
      },
      {
         title: "Number",
         dataIndex: "number",
         key: "number",
      },
   ];

   // const graphData = [
   //    {
   //       key: "1",
   //       site: "asite.com",
   //       page: "/clothes/dresses",
   //       number: 12345678,
   //    },
   //    {
   //       key: "2",
   //       site: "bsite.com",
   //       page: "/haircaire/shampoon",
   //       number: 102030,
   //    },
   //    {
   //       key: "3",
   //       site: "csite.com",
   //       page: "/teavel/spain/madrid",
   //       number: 11223,
   //    },
   //    {
   //       key: "4",
   //       site: "dsite.com",
   //       page: "/sport/footbal/live",
   //       number: 4432,
   //    },
   //    {
   //       key: "5",
   //       site: "esite.com",
   //       page: "/news/world/corona",
   //       number: 321,
   //    },
   // ];

   useEffect(() => {
      const tablePart = getResultByPartId(HOME_TOP_VISITED_PAGES_TABLE_PART, data);
      const graphData = tablePart ? tablePart.data.map((item, i) => ({
         key: i,
         site: item.dimensionValues[0],
         page: item.dimensionValues[1],
         number: item.metricValues[0],
      })) : [];
      setGraphData(graphData)
   }, [data]);

   return (
      <ViewBox headerTitle="Top 5 visited pages" loading={loading}>
         <div className={styles.graphContainer}>
            <Table columns={columns} dataSource={graphData} pagination={false} />
         </div>
      </ViewBox>
   );
};

export default PagesToVisitors;

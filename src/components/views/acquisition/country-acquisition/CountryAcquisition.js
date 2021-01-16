import React, { useEffect, useState } from "react";
import { ACQUISITION_COUNTRY_TABLE_PART, HORIZONTAL_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import { Table } from "antd";
import styles from "./CountryAcquisition.module.css";
import {getResultByPartId} from '../../../../common/graph-util/viewUtil';

const CountryAcquisition = ({data, loading, error}) => {
   const [tableData, setTableData] = useState([]);
   const columns = [
      {
         title: "Country",
         dataIndex: "country",
         sorter: {
            compare: (a, b) => a.country.localeCompare(b.country),
            multiple: 3,
         },
      },
      {
         title: "Users",
         dataIndex: "users",
         sorter: {
            compare: (a, b) => a.users - b.users,
            multiple: 3,
         },
      },
      {
         title: "New users",
         dataIndex: "newUsers",
         sorter: {
            compare: (a, b) => a.newUsers - b.newUsers,
            multiple: 2,
         },
      },
   ];

   // const data = [
   //    {
   //       key: "1",
   //       country: "AJohn Brown",
   //       users: 98,
   //       newUsers: 60,
   //    },
   //    {
   //       key: "2",
   //       country: "BJim Green",
   //       users: 100,
   //       newUsers: 66,
   //    },
   //    {
   //       key: "3",
   //       country: "DJoe Black",
   //       users: 98,
   //       newUsers: 90,
   //    },
   //    {
   //       key: "4",
   //       country: "CJim Red",
   //       users: 88,
   //       newUsers: 99,
   //    },
   //    {
   //       key: "5",
   //       country: "DJoe Black",
   //       users: 98,
   //       newUsers: 90,
   //    },
   // ];

   useEffect(() => {
      const tablePart = getResultByPartId(ACQUISITION_COUNTRY_TABLE_PART, data);
      const tableData = tablePart ? tablePart.data.map((item, i) => ({
         key: i,
         country: item.dimensionValues[0],
         users: item.metricValues[0],
         newUsers: item.metricValues[1]
      })) : [];
      setTableData(tableData);
   }, [data]);

   function onChange(pagination, filters, sorter, extra) {}
   return (
      <ViewBox type={HORIZONTAL_VIEW_BOX} footerVisible={false} headerTitle="Country Acquisition" loading={loading}>
         <Table className={styles.table} columns={columns} dataSource={tableData} onChange={onChange} />
      </ViewBox>
   );
};

export default CountryAcquisition;

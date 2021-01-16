import React, { useEffect, useRef, useState } from "react";
import { EVENTS_TABLE_PART, HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import { Table, Tag, Space, Menu, Tooltip, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { fetchData as fetchDataUserSite } from "../../home/user-site/userSiteService";
import UserSiteGlobal from "../../home/user-site/UserSiteGlobal";
import Highlighter from "react-highlight-words";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";

// const data = [
//    {
//       key: "1",
//       domain: "https://google.com",
//       path: "/index.html",
//       totalCount: 32,
//       totalCountBefore: 50,
//       eid: "element-123",
//       eventAction: "click",
//       description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
//    },
//    {
//       key: "2",
//       domain: "bsite.com",
//       path: "/about.html",
//       totalCount: 42,
//       totalCountBefore: 38,
//       eid: "element-345",
//       eventAction: "hover",
//       description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
//    },
//    {
//       key: "3",
//       domain: "asite.com",
//       path: "/index.html",
//       totalCount: 32,
//       totalCountBefore: 48,
//       eid: "element-567",
//       eventAction: "click",
//       description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
//    },
//    {
//       key: "4",
//       domain: "asite.com",
//       path: "/kndex.html",
//       totalCount: 32,
//       totalCountBefore: 48,
//       eid: "element-567",
//       eventAction: "click",
//       description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
//    },
//    {
//       key: "5",
//       domain: "asite.com",
//       path: "/andex.html",
//       totalCount: 32,
//       totalCountBefore: 48,
//       eid: "element-567",
//       eventAction: "click",
//       description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
//    },
// ];

const uniqueArray = (array) => [...new Set(array.map((record) => JSON.stringify(record)))].map((s) => JSON.parse(s));

const EventsTable = ({data, loading, error}) => {
   const [tableData, setTableData] = useState([]);
   const pathInputRef = useRef(null);
   const elementIdInputRef = useRef(null);
   const [searchText, setSearchText] = useState("");
   const [searchedColumn, setSearchedColumn] = useState("");

   useEffect(() => {
      const tablePart = getResultByPartId(EVENTS_TABLE_PART, data);
      const mappedData = tablePart ? tablePart.data.map((item, i) => ({
         key: i + 1,
         domain: item.dimensionValues[0],
         path: item.dimensionValues[1],
         eid: item.dimensionValues[2],
         eventAction: item.dimensionValues[3],
         description: item.dimensionValues[4],
         totalCount: item.metricValues[0],
         totalCountBefore: item.metricValues[1]
      })) : [];
      setTableData(mappedData);
   }, [data]);

   const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };

   const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
   };

   const getColumnSearchProps = (dataIndex, inputRef) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
         <div style={{ padding: 8 }}>
            <Input
               ref={inputRef}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
               style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
               >
                  Search
               </Button>
               <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                  Reset
               </Button>
            </Space>
         </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
      onFilterDropdownVisibleChange: (visible) => {
         if (visible) {
            if (inputRef) {
               setTimeout(() => inputRef.current.select(), 100);
            }
         }
      },
      onFilter: (value, record) =>
         record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
      render: (text) =>
         searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ""}
            />
         ) : (
            text
         ),
   });

   const columns = [
      {
         title: "Event action",
         dataIndex: "eventAction",
         key: "eventAction",
         filters: [
            {
               text: "Click",
               value: "click",
            },
            {
               text: "Hover",
               value: "hover",
            },
         ],
         width: "130px",
         sorter: (a, b) => ("" + a.eventAction).localeCompare(b.eventAction),
         onFilter: (value, record) => record.eventAction.indexOf(value) === 0,
         render: (text) => <Tag color={text == "hover" ? "blue" : "green"}>{text}</Tag>,
      },
      {
         key: "url",
         title: "URL",
         sorter: (a, b) => ("" + a.domain + a.path).localeCompare(b.domain + b.path),
         children: [
            {
               title: "Domain",
               dataIndex: "domain",
               key: "domain",
               filters: uniqueArray(data.map((record) => ({ text: record.domain, value: record.domain }))),
               onFilter: (value, record) => record.domain.indexOf(value) === 0,
               sorter: (a, b) => ("" + a.domain).localeCompare(b.domain),
            },
            {
               title: "Path",
               dataIndex: "path",
               key: "path",
               sorter: (a, b) => ("" + a.path).localeCompare(b.path),
               ...getColumnSearchProps("path", pathInputRef),
            },
         ],
      },
      {
         title: "Element ID",
         dataIndex: "eid",
         key: "eid",
         sorter: (a, b) => ("" + a.eid).localeCompare(b.eid),
         ...getColumnSearchProps("eid", elementIdInputRef),
      },
      {
         title: "Total count",
         dataIndex: "totalCount",
         key: "totalCount",
         width: "150px",
         sorter: (a, b) => ("" + a.totalCount).localeCompare(b.totalCount),
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
                  {record.totalCount - record.totalCountBefore < 0 ? (
                     <Tooltip title={record.totalCount}>
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
                  {record.totalCount - record.totalCountBefore > 0 ? (
                     <Tooltip title={record.totalCount}>
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
         render: (text, record) => (
            <Space size="middle">
               <a href={record.domain + record.path}>Go to this page</a>
            </Space>
         ),
      },
   ];

   return (
      <ViewBox type={HORIZONTAL_LARGE_DYNAMIC_HEIGHT_VIEW_BOX} footerVisible={false} headerTitle="Events Table" loading={loading}>
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
                  <div style={{ display: "flex", width: "500px" }}>
                     <UserSiteGlobal fetchData={fetchDataUserSite} extra={{ domain: record.domain }} />
                  </div>
               ),
            }}
         ></Table>
      </ViewBox>
   );
};

export default EventsTable;

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import styles from './RetentionTimeInnerTable.module.css';

const data = [
   {
      key: "1",
      path: "/index.html",
      retentionTime: 3675,
      retentionTimeBefore: 50,
   },
   {
      key: "2",
      path: "/aindex.html",
      retentionTime: 3676,
      retentionTimeBefore: 38,
   },
   {
      key: "3",
      path: "/bindex.htmlm",
      retentionTime: 3674,
      retentionTimeBefore: 48,
   },
   {
      key: "4",
      path: "/cindex.html",
      retentionTime: 3659,
      retentionTimeBefore: 48,
   },
   {
      key: "5",
      path: "/dindex.html",
      retentionTime: 380,
      retentionTimeBefore: 48,
   },
];

const RetentionTimeInnerTable = ({domain}) => {
   const pathInputRef = useRef(null);
   const [searchText, setSearchText] = useState("");
   const [searchedColumn, setSearchedColumn] = useState("");

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
         title: "Path",
         dataIndex: "path",
         key: "path",
         filters: data.map((record) => ({ text: record.path, value: record.path })),
         sorter: (a, b) => ("" + a.path).localeCompare(b.path),
         ...getColumnSearchProps("path", pathInputRef),
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
               <a href={domain + record.path}>Go to this page</a>
            </Space>
         ),
      },
   ];
   return (
      <div className={styles.tableContainer}>
         <Table
            dataSource={data}
            columns={columns}
            onChange={(pagination, filters, sorter, extra) => {
               console.log("nesto se promijenilo");
               console.log("pagination: ", pagination);
               console.log("filters: ", filters);
               console.log("sorter: ", sorter);
               console.log("extra: ", extra);
            }}
         ></Table>
      </div>
   );
};

export default RetentionTimeInnerTable;

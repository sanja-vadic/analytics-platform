import React from "react";
import styles from "./UsersDevice.module.css";
import Chart from "react-google-charts";
import DeviceBadge from "./device-badge/DeviceBadge";
import { DesktopOutlined, MobileOutlined, TabletOutlined } from "@ant-design/icons";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import {
   HOME_USERS_DEVICE_BADGES_PART,
   HOME_USERS_DEVICE_PIE_PART,
   HORIZONTAL_VIEW_BOX,
} from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";

const UsersDevice = (props) => {
   const { data, loading, error, dispatchInterval, footerVisible } = props;
   const piePart = getResultByPartId(HOME_USERS_DEVICE_PIE_PART, data);
   const badgesPart = getResultByPartId(HOME_USERS_DEVICE_BADGES_PART, data);
   let pieData = [["Device", "Count"]];
   if (piePart) {
      for (let item of piePart.data) {
         let element = [item.dimensionValues[0], item.metricValues[0]];
         pieData.push(element);
      }
   }

   let badgesData = [];
   if (badgesPart) {
      for (let item of badgesPart.data) {
         let element = {
            title: item.dimensionValues[0],
            newValue: item.metricValues[0],
            oldValue: item.metricValues[1],
            percentage: "75%",
         };
         badgesData.push(element);
      }
   }

   const pieOptions = {
      title: "",
      pieHole: 0.6,
      slices: [
         {
            color: "#2F5EC4",
         },
         {
            color: "#4285F4",
         },
         {
            color: "#93D5ED",
         },
         {
            color: "#DCF7FA",
         },
      ],
      legend: {
         position: "bottom",
         alignment: "center",
         textStyle: {
            color: "233238",
            fontSize: 12,
            font: "Montserrat sans-serif",
         },
      },
      tooltip: {
         showColorCode: true,
      },
      chartArea: {
         left: 50,
         top: 10,
         right: 50,
         bottom: 60,
         width: "70%",
         height: "70%",
      },
   };

   function checkIcon(title) {
      switch (title) {
         case "Desktop":
            return <DesktopOutlined style={{ color: "#4285F4" }} />;
         case "Mobile":
            return <MobileOutlined style={{ color: "#4285F4" }} />;
         case "Tablet":
            return <TabletOutlined style={{ color: "#4285F4" }} />;
         default:
            return <TabletOutlined style={{ color: "#4285F4" }} />; //Treba neki drugi defaultni
      }
   }

   return (
      <ViewBox
         footerVisible={footerVisible}
         headerTitle="Users Device"
         changeInterval={dispatchInterval}
         loading={loading}
         type={HORIZONTAL_VIEW_BOX}
      >
         <div className={styles.content}>
            <div className={styles.pieChartHolder}>
               <Chart
                  chartType="PieChart"
                  data={pieData}
                  options={pieOptions}
                  graph_id="PieChart"
                  width={"100%"}
                  height={"100%"}
                  legend_toggle
               />
            </div>
            <div className={styles.devicesHolder}>
               {badgesData.map((value, index) => {
                  return (
                     <DeviceBadge
                        icon={checkIcon(value.title)}
                        title={value.title}
                        percentage="75%"
                        newValue={value.newValue}
                        oldValue={value.oldValue}
                     />
                  );
               })}
            </div>
         </div>
      </ViewBox>
   );
};

export default UsersDevice;

import React from "react";
import { Line } from "recharts";
import { HORIZONTAL_LARGE_VIEW_BOX, HORIZONTAL_MEDIUM_VIEW_BOX, HORIZONTAL_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import GaugeGraph from "../../common/gauge-graph/GaugeGraph";
import styles from "./VisitsGauge.module.css";

const VisitsGauge = () => {
   const dataGaugeZadrzavanje = {
      data: [{ value: 2000 }],
      content: "zadrzavanje",
      min: 0,
      max: 2900,
   };

   const dataGaugeUcitavanje = {
      data: [{ value: 3000 }],
      content: "ucitavanje",
      min: 0,
      max: 3000,
   };

   const loadingSpeedData = [
      {
         site: "asite.com",
         data: [
            {
               date: "2020-10-11",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-12",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-13",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-14",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-15",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-16",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
         ],
      },
      {
         site: "bsite.com",
         data: [
            {
               date: "2020-10-11",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-12",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-13",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-14",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-15",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-16",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
         ],
      },
   ];

   const stayOnPageTimeData = [
      {
         site: "asite.com",
         data: [
            {
               date: "2020-10-11",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-12",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-13",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-14",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-15",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-16",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
         ],
      },
      {
         site: "bsite.com",
         data: [
            {
               date: "2020-10-11",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-12",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-13",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-14",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-15",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
            {
               date: "2020-10-16",
               totalVisitors: 1200,
               totalVisitorsBefore: 1000,
            },
         ],
      },
   ];

   const containerUcitavanjeId1 = "gaugeContainerUcitavanjeId1";
   const containerZadrzavanjeId1 = "gaugeContainerZadrzavanjeId1";
   const containerUcitavanjeId2 = "gaugeContainerUcitavanjeId2";
   const containerZadrzavanjeId2 = "gaugeContainerZadrzavanjeId2";
   return (
      <div className={styles.visitsGaugeContainer}>
         <ViewBox type={HORIZONTAL_VIEW_BOX} headerTitle="Site loading speed" footerVisible={false}>
            <div className={styles.content}>
               <GaugeGraph dataGauge={dataGaugeUcitavanje} containerId={containerUcitavanjeId1}></GaugeGraph>
               <GaugeGraph dataGauge={dataGaugeUcitavanje} containerId={containerUcitavanjeId2}></GaugeGraph>
            </div>
         </ViewBox>
         <ViewBox type={HORIZONTAL_VIEW_BOX} headerTitle="Retention on site" footerVisible={false}>
            <div className={styles.content}>
               <GaugeGraph dataGauge={dataGaugeZadrzavanje} containerId={containerZadrzavanjeId1}></GaugeGraph>
               <GaugeGraph dataGauge={dataGaugeZadrzavanje} containerId={containerZadrzavanjeId2}></GaugeGraph>
            </div>
         </ViewBox>
      </div>
   );
};

export default VisitsGauge;

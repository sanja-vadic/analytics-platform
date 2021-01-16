import React from "react";
import styles from "./TimersDashboard.module.css";
import VisitsGauge from "../../../components/views/timers/visits-gauge/VisitsGauge";
import CompleteRangePickerGlobal from "../../../components/interval/complete-range-picker/CompleteRangePickerGlobal";
import LoadSpeedArea from "../../../components/views/timers/load-speed-area/LoadSpeedArea";
import RetentionTimeTableGlobal from "../../../components/views/timers/retention-time-table/RetentionTimeTableGlobal";
import { fetchData as fetchDataRetentionTimeTable } from "../../../components/views/timers/retention-time-table/retentionTimeService";
import { fetchData as fetchDataLoadSpeedArea } from "../../../components/views/timers/load-speed-area/loadSpeedAreaService";
import LoadSpeedAreaGlobal from "../../../components/views/timers/load-speed-area/LoadSpeedAreaGlobal";

const TimersDashboard = (props) => {
   return (
      <div className={styles.timerDashboardContainer}>
         <CompleteRangePickerGlobal />
         {/* <div className={styles.row}>
            <VisitsGauge></VisitsGauge>
         </div> */}
         <div className={styles.row}>
            <LoadSpeedAreaGlobal fetchData={fetchDataLoadSpeedArea}/>
         </div>
         <div className={styles.row}>
            <RetentionTimeTableGlobal fetchData={fetchDataRetentionTimeTable}/>
         </div>
      </div>
   );
};

export default TimersDashboard;

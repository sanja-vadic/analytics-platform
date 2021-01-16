import React from "react";
import CompleteRangePickerGlobal from "../../../components/interval/complete-range-picker/CompleteRangePickerGlobal";
import EventsTable from "../../../components/views/events/events-table/EventsTable";
import EventsTableGlobal from "../../../components/views/events/events-table/EventsTableGlobal";
import styles from "./EventsDashboard.module.css";
import { fetchData as fetchDataEventsTable } from "../../../components/views/events/events-table/eventsTableService";
import { fetchData as fetchDataEventsArea } from "../../../components/views/events/events-area/EventsAreaService";
import EventsAreaGlobal from "../../../components/views/events/events-area/EventsAreaGlobal";

const EventsDashboard = (props) => {
   return (
      <div className={styles.eventsDashboardContainer}>
         <CompleteRangePickerGlobal />
         <div className={styles.row}>
            <EventsAreaGlobal fetchData={fetchDataEventsArea}/>
         </div>
         <div className={styles.row}>
            <EventsTableGlobal fetchData={fetchDataEventsTable}/>
         </div>
      </div>
   );
};

export default EventsDashboard;

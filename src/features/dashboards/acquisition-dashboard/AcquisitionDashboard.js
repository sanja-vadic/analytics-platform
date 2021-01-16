import React from "react";
import styles from "./AcquisitionDashboard.module.css";
import AcquisitionOverviewGlobal from "../../../components/views/home/acquisition-overview/AcquisitionOverviewGlobal";
import { fetchData as fetchDataAcquisitionOverview } from "../../../components/views/home/acquisition-overview/acquisitionOverviewService";
import { fetchData as fetchDataGeoAcquisition } from "../../../components/views/acquisition/geo-acquisition/geoAcquisitionService";
import { fetchData as fetchDataCountryAcquisition } from "../../../components/views/acquisition/country-acquisition/countryAcquisitionService";
import { fetchData as fetchDataSiteAcquisition } from "../../../components/views/acquisition/funnel-acquisition/funnelAcquisitionService";
import FunnelAcquisitionGlobal from "../../../components/views/acquisition/funnel-acquisition/FunnelAcquisitionGlobal";
import CompleteRangePickerGlobal from "../../../components/interval/complete-range-picker/CompleteRangePickerGlobal";
import GeoAcquisitionGlobal from "../../../components/views/acquisition/geo-acquisition/GeoAcquisitionGlobal";
import CountryAcquisitionGlobal from "../../../components/views/acquisition/country-acquisition/CountryAcquisitionoGlobal";

const AcquisitionDashboard = () => {
   return (
      <div className={styles.acquisitionDashboardContainer}>
         <CompleteRangePickerGlobal />
         <div className={styles.row}>
            <GeoAcquisitionGlobal fetchData={fetchDataGeoAcquisition} />
         </div>
         <div className={styles.row}>
            <AcquisitionOverviewGlobal footerVisible={false} fetchData={fetchDataAcquisitionOverview} />
            <CountryAcquisitionGlobal fetchData={fetchDataCountryAcquisition} />
            <FunnelAcquisitionGlobal fetchData={fetchDataSiteAcquisition} />
         </div>
      </div>
   );
};

export default AcquisitionDashboard;

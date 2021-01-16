import React, { useEffect, useState } from "react";
import RelativeRangePicker from "../../../components/interval/relative-range-picker/RelativeRangePicker";
import UserSiteGlobal from "../../../components/views/home/user-site/UserSiteGlobal";
import withGroupInterval from "../../../common/graph-util/hoc/interval/withGroupInterval";
import { HOME_DASHBOARD_USER_SITES_GROUP } from "../../../constants/constants";
import styles from "./HomeDashboard.module.css";
import { fetchData as fetchDataUserSite } from "../../../components/views/home/user-site/userSiteService";
import { fetchData as fetchDataTotalVisitors } from "../../../components/views/home/total-visitors/totalVisitorsService";
import { fetchData as fetchDataUsersCountry } from "../../../components/views/home/users-country/usersCountryService";
import { fetchData as fetchDataAcquisitionOverview } from "../../../components/views/home/acquisition-overview/acquisitionOverviewService";
import { fetchData as fetchDataUsersDevice } from "../../../components/views/home/users-device/usersDeviceService";
import { fetchData as fetchDataUsersActivity } from "../../../components/views/home/users-activity-heatmap/userActivityHeatmapService";
import { fetchData as fetchDataBrowserUsage } from "../../../components/views/home/browser-usage/browserUsageService";
import { fetchData as fetchDataTopVisitedPages } from "../../../components/views/home/pages-top-visitiors/pagesTopVisitorsService";
import { fetchData as fetchDataTopEventCounts } from "../../../components/views/home/top-event-count/topEventCountService";
import { fetchData as fetchDataSiteLoadSpeed } from "../../../components/views/home/site-load-speed/siteLoadSpeedService";
import { fetchClientSites } from "./homeDashboardService";
import TotalVisitorsLocal from "../../../components/views/home/total-visitors/TotalVisitorsLocal";
import UsersCountryLocal from "../../../components/views/home/users-country/UsersCountryLocal";
import AcquisitionOverviewLocal from "../../../components/views/home/acquisition-overview/AcquisitionOverviewLocal";
import UsersDeviceLocal from "../../../components/views/home/users-device/UsersDeviceLocal";
import UsersActivityHeatmapLocal from "../../../components/views/home/users-activity-heatmap/UsersActivityHeatmapLocal";
import BrowserUsageLocal from "../../../components/views/home/browser-usage/BrowserUsageLocal";
import SiteLoadSpeed from "../../../components/views/home/site-load-speed/SiteLoadSpeed";
import TopEventCount from "../../../components/views/home/top-event-count/TopEventCount";
import ThemeSelect from "../../../components/theme-select/ThemeSelect";
import PagesTopVisitorsLocal from "../../../components/views/home/pages-top-visitiors/PagesTopVisitorsLocal";
import TopEventCountLocal from "../../../components/views/home/top-event-count/TopEventCountLocal";
import SiteLoadSpeedLocal from "../../../components/views/home/site-load-speed/SiteLoadSpeedLocal";

const HomeDashboard = () => {
   const [sites, setSites] = useState([]);
   const RelativeRangePickerGroup = withGroupInterval(RelativeRangePicker, HOME_DASHBOARD_USER_SITES_GROUP);

   useEffect(() => {
      const fetch = async () => {
         let response = await fetchClientSites();
         setSites(response.data);
      };
      fetch();
   }, [setSites]);

   return (
      <div className={styles.homeDashboardContainer}>
         <RelativeRangePickerGroup className={styles.rangePicker} bordered={true} />
         <ThemeSelect bordered={true} className={styles.rangePicker} />
         <div className={styles.horizontalList}>
            {sites.map((site, i) => (
               <UserSiteGlobal key={i} fetchData={fetchDataUserSite} extra={{ domain: site.domain }} />
            ))}
         </div>
         <div className={styles.row}>
            <TotalVisitorsLocal fetchData={fetchDataTotalVisitors} />
            <UsersCountryLocal fetchData={fetchDataUsersCountry} />
            <UsersActivityHeatmapLocal fetchData={fetchDataUsersActivity}/>
         </div>
         <div className={styles.row}>
            <AcquisitionOverviewLocal fetchData={fetchDataAcquisitionOverview} />
            <UsersDeviceLocal fetchData={fetchDataUsersDevice} />
            <BrowserUsageLocal fetchData={fetchDataBrowserUsage}/>
         </div>
         <div className={styles.row}>
            <PagesTopVisitorsLocal fetchData={fetchDataTopVisitedPages} />
            <SiteLoadSpeedLocal fetchData={fetchDataSiteLoadSpeed}/>
            <TopEventCountLocal fetchData={fetchDataTopEventCounts} />
         </div>
      </div>
   );
};

export default HomeDashboard;

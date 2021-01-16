import React from "react";
import BubblePlatforms from "../../../components/views/platforms/bubble-platforms/BubblePlatforms";
import FunnelPlatforms from "../../../components/views/platforms/funnel-platforms/FunnelPlatforms";
import PlatformsLine from "../../../components/views/platforms/platforms-line/PlatformsLine";
import PlatformsPie from "../../../components/views/platforms/platforms-pie/PlatformsPie";
import PlatformsTreemap from "../../../components/views/platforms/platforms-treemap/PlatformsTreemap";
import UsersDevicesGlobal from "../../../components/views/home/users-device/UsersDevicesGlobal";
import { fetchData as fetchDataUsersDevice } from "../../../components/views/home/users-device/usersDeviceService";
import { fetchData as fetchDataPlatformFunnel } from "../../../components/views/platforms/funnel-platforms/funnelPlatformsService";
import { fetchData as fetchDataPlatformBubble } from "../../../components/views/platforms/bubble-platforms/bubblePlatformsSevice";
import { fetchData as fetchDataPlatformsLine } from "../../../components/views/platforms/platforms-line/platformsLineService";
import { fetchData as fetchDataScreenResolution } from "../../../components/views/platforms/screen-resolution/screenResolutionService";
import styles from "./PlatformsDashboard.module.css";
import ScreensDonutGraph from "../../../components/views/platforms/screens-donut-graph/ScreensDonutGraph";
import CompleteRangePickerGlobal from "../../../components/interval/complete-range-picker/CompleteRangePickerGlobal";
import FunnelPlatformsGlobal from "../../../components/views/platforms/funnel-platforms/FunnelPlatformsGlobal";
import BubblePlatformsGlobal from "../../../components/views/platforms/bubble-platforms/BubblePlatformsGlobal";
import PlatformsLineGlobal from "../../../components/views/platforms/platforms-line/PlatformsLineGlobal";
import ScreenResolution from "../../../components/views/platforms/screen-resolution/ScreenResolution";
import ScreenResolutionGlobal from "../../../components/views/platforms/screen-resolution/ScreenResolutionGlobal";

const PlatformsDashboards = (props) => {
   return (
      <div className={styles.platformsDashboardContainer}>
         <CompleteRangePickerGlobal />
         <div className={styles.row}>
            <UsersDevicesGlobal footerVisible={false} fetchData={fetchDataUsersDevice} />
            <PlatformsTreemap></PlatformsTreemap>
            <FunnelPlatformsGlobal fetchData={fetchDataPlatformFunnel} />
         </div>
         <div className={styles.row}>
            <PlatformsLineGlobal fetchData={fetchDataPlatformsLine}/>
            <BubblePlatformsGlobal fetchData={fetchDataPlatformBubble}/>
            <ScreenResolutionGlobal fetchData={fetchDataScreenResolution}/>
         </div>
         <div className={styles.row}>
            {/* <PlatformsPie></PlatformsPie> */}
            {/* <ScreensDonutGraph></ScreensDonutGraph> */}
         </div>
      </div>
   );
};

export default PlatformsDashboards;

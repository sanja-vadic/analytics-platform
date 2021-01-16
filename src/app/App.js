import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "../features/login/LoginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlatformLayoutRoute from "../features/platform-layout/PlatformLayoutRoute";
import AcquisitionDashboard from "../features/dashboards/acquisition-dashboard/AcquisitionDashboard";
import HomeDashboard from "../features/dashboards/home-dashboard/HomeDashboard";
import {
   ROOT_ROUTE,
   HOME_ROUTE,
   DASHBOARD_ACQUISITION_ROUTE,
   SETTINGS_TRACKING_CODE_ROUTE,
   THRESHOLDS_ROUTE,
   DASHBOARD_TIMERS_ROUTE,
   REPORTS_EXPORT_ROUTE,
   REPORTS_CUSTOM_ROUTE,
   DASHBOARD_PLATFORMS_ROUTE,
   DASHBOARD_EVENTS_ROUTE,
} from "../constants/routes";
import { useSelector } from "react-redux";
import { DARK_THEME, LIGHT_THEME } from "../constants/constants";
import TrackingCode from "../features/settings/tracking-code/TrackingCode";
import ReportsExport from "../features/reports/export/ReportsExport";
import Thresholds from "../features/thresholds/Thresholds";
import TimerDashboard from "../features/dashboards/timers-dashboard/TimersDashboard";
import EventsDashboard from "../features/dashboards/events-dashboard/EventsDashboard";
import PlatformsDashboards from "../features/dashboards/platforms-dashboard/PlatformsDashboard";
import ReportsCustom from "../features/reports/custom/ReportsCustom";

function App() {
   let theme = useSelector((state) => state.common.theme);

   useEffect(() => {
      let rootElement = document.getElementById("root");
      rootElement.classList.remove(LIGHT_THEME);
      rootElement.classList.remove(DARK_THEME);
      rootElement.classList.add(theme);
   }, [theme]);

   return (
      <div className="App">
         <Router>
            <Switch>
               <Route exact path={ROOT_ROUTE} component={LoginPage} />
               <PlatformLayoutRoute exact path={HOME_ROUTE} component={HomeDashboard} />
               <PlatformLayoutRoute exact path={DASHBOARD_ACQUISITION_ROUTE} component={AcquisitionDashboard} />
               <PlatformLayoutRoute exact path={DASHBOARD_EVENTS_ROUTE} component={EventsDashboard} />
               <PlatformLayoutRoute exact path={DASHBOARD_PLATFORMS_ROUTE} component={PlatformsDashboards} />
               <PlatformLayoutRoute exact path={REPORTS_EXPORT_ROUTE} component={ReportsExport} />
               <PlatformLayoutRoute exact path={REPORTS_CUSTOM_ROUTE} component={ReportsCustom} />
               <PlatformLayoutRoute exact path={DASHBOARD_TIMERS_ROUTE} component={TimerDashboard} />
               <PlatformLayoutRoute exact path={THRESHOLDS_ROUTE} component={Thresholds} />
               <PlatformLayoutRoute exact path={SETTINGS_TRACKING_CODE_ROUTE} component={TrackingCode} />
            </Switch>
         </Router>
      </div>
   );
}

export default App;

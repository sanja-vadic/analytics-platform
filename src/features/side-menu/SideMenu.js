import React from "react";
import { Menu } from "antd";
import {
   SettingOutlined,
   HomeOutlined,
   AreaChartOutlined,
   FileOutlined,
   QuestionCircleOutlined,
   FlagOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import "./SideMenu.css";
import {
   DASHBOARD_ACQUISITION_ROUTE,
   THRESHOLDS_ROUTE,
   DASHBOARD_TIMERS_ROUTE,
   DASHBOARD_PLATFORMS_ROUTE,
   DASHBOARD_EVENTS_ROUTE,
   DASHBOARD_REALTIME_ROUTE,
   DOCS_ROUTE,
   REPORTS_CUSTOM_ROUTE,
   REPORTS_EXPORT_ROUTE,
} from "../../constants/routes";

const { SubMenu } = Menu;

const SideMenu = (props) => {
   const history = useHistory();
   const location = useLocation();
   const { pathname } = location;

   const handleClick = (e) => {
      history.push(e.key);
   };

   return (
      <Menu
         onClick={handleClick}
         style={{ width: "256px", height: "100vh", position: "fixed" }}
         className={"side-menu"}
         defaultSelectedKeys={["1"]}
         defaultOpenKeys={["sub1"]}
         mode="inline"
         selectedKeys={[pathname]}
      >
         <Menu.Item key="/home">
            <span>
               <HomeOutlined />
               <span>Home</span>
            </span>
         </Menu.Item>
         <SubMenu
            key="sub2"
            title={
               <span>
                  <AreaChartOutlined />
                  <span>Dashboards</span>
               </span>
            }
         >
            <Menu.Item key={DASHBOARD_ACQUISITION_ROUTE}>Acquisition</Menu.Item>
            <Menu.Item key={DASHBOARD_EVENTS_ROUTE}>Events</Menu.Item>
            <Menu.Item key={DASHBOARD_TIMERS_ROUTE}>Timers</Menu.Item>
            <Menu.Item key={DASHBOARD_PLATFORMS_ROUTE}>Platforms</Menu.Item>
            <Menu.Item key={DASHBOARD_REALTIME_ROUTE}>Real-time</Menu.Item>
         </SubMenu>
         <SubMenu
            key="reports"
            title={
               <span>
                  <FileOutlined />
                  <span>Reports</span>
               </span>
            }
         >
            <Menu.Item key={REPORTS_CUSTOM_ROUTE}>Custom</Menu.Item>
            <Menu.Item key={REPORTS_EXPORT_ROUTE}>Export</Menu.Item>
         </SubMenu>
         <Menu.Item key={THRESHOLDS_ROUTE}>
            <span>
               <FlagOutlined />
               <span>Threshold</span>
            </span>
         </Menu.Item>
         <Menu.Item key={DOCS_ROUTE}>
            <span>
               <QuestionCircleOutlined />
               <span>Docs</span>
            </span>
         </Menu.Item>
         <SubMenu
            key="settings"
            title={
               <span>
                  <SettingOutlined />
                  <span>Settings</span>
               </span>
            }
         >
            <Menu.Item key="/settings/trackingcode">Tracking Code</Menu.Item>
         </SubMenu>
      </Menu>
   );
};

export default SideMenu;

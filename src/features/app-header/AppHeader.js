import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Input, AutoComplete } from "antd";
import { AreaChartOutlined, FileOutlined, FlagOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "./AppHeader.module.css";
import "./AppHeader.css";
import NorificationsMenu from "../../components/notification/NotificationsMenu";
import UserAvatar from "../../components/user-avatar/UserAvatar";
import { DARK_THEME, LIGHT_THEME } from "../../constants/constants";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
   DASHBOARD_ACQUISITION_ROUTE,
   SETTINGS_TRACKING_CODE_ROUTE,
   HOME_ROUTE,
   DASHBOARD_TIMERS_ROUTE,
   REPORTS_EXPORT_ROUTE,
} from "../../constants/routes";

const { Header } = Layout;

const AppHeader = (props) => {
   const history = useHistory();
   const theme = useSelector((state) => state.common.theme);
   const imgUrl = {
      [LIGHT_THEME]: "/analytics-logo-dark-grey.png",
      [DARK_THEME]: "/analytics-logo-light-grey.png",
   }[theme];

   const defaultOptions = [
      {
         groupTitle: "Reports",
         groupIcon: FileOutlined,
         subOptions: [{ title: "Reports", link: REPORTS_EXPORT_ROUTE }],
      },
      {
         groupTitle: "Thresholds",
         groupIcon: FlagOutlined,
         subOptions: [{ title: "Thresholds", link: DASHBOARD_ACQUISITION_ROUTE }],
      },
      {
         groupTitle: "Dashboards",
         groupIcon: AreaChartOutlined,
         subOptions: [
            { title: "Home", link: HOME_ROUTE },
            { title: "Acquisition", link: DASHBOARD_ACQUISITION_ROUTE },
            { title: "Platforms", link: DASHBOARD_ACQUISITION_ROUTE },
            { title: "Timers", link: DASHBOARD_TIMERS_ROUTE },
            { title: "Events", link: DASHBOARD_ACQUISITION_ROUTE },
            { title: "Devices", link: DASHBOARD_ACQUISITION_ROUTE },
            { title: "Overall", link: DASHBOARD_ACQUISITION_ROUTE },
         ],
      },
      {
         groupTitle: "Settings",
         groupIcon: SettingOutlined,
         subOptions: [{ title: "Trackng Code", link: SETTINGS_TRACKING_CODE_ROUTE }],
      },
   ];

   const [value, setValue] = useState("");
   const [options, setOptions] = useState(defaultOptions);
   const [optionsRender, setOptionsRender] = useState([]);

   const renderTitle = (title, Icon) => {
      return (
         <span>
            <Icon /> {title}
         </span>
      );
   };

   const renderItem = (title, link) => {
      return {
         value: title,
         label: (
            <div className={styles.autocompleteItem}>
               <span className={styles.autocompleteItemLink}>{title}</span>
            </div>
         ),
      };
   };

   const getRouteByTitle = (title) => {
      for (const option of options) {
         for (const subOption of option.subOptions) {
            if (subOption.title === title) {
               return subOption.link;
            }
         }
      }
   };

   useEffect(() => {
      setOptionsRender(
         options.map((option, i) => {
            return {
               label: renderTitle(option.groupTitle, option.groupIcon),
               options: option.subOptions.map((subOption, i) => renderItem(subOption.title, subOption.link)),
            };
         })
      );
   }, [options]);

   return (
      <Header className={styles.headerStyle}>
         <Row>
            <Col className={styles.antCol}>
               <img src={imgUrl} style={{ height: "35px", paddingBottom: "5px" }} alt="Analytics logo" />
            </Col>
            <Col className={styles.antCol} flex="auto" style={{ textAlign: "center" }}>
               <AutoComplete
                  className={"search"}
                  dropdownClassName="certain-category-search-dropdown"
                  dropdownMatchSelectWidth={500}
                  style={{
                     width: "500px",
                     maxWidth: "500px",
                     minWidth: "250px",
                     backgroundColor: "var(--primary-color)",
                     border: "1px solid var(--primary-near-color)",
                  }}
                  options={optionsRender}
                  value={value}
                  onSelect={(e) => {
                     let route = getRouteByTitle(e);
                     setValue("");
                     setOptions(defaultOptions);
                     if (route) {
                        history.push(route);
                     }
                  }}
               >
                  <Input.Search
                     size="large"
                     placeholder="Search anything..."
                     style={{
                        backgroundColor: "var(--primary-color)",
                        border: "1px solid var(--primary-near-color)",
                     }}
                     onChange={(event) => {
                        setValue(event.target.value);
                        const filteredOptions = [];
                        for (const option of defaultOptions) {
                           const newSubOptions = option.subOptions.filter((subOption) =>
                              subOption.title.toLowerCase().includes(event.target.value.toLowerCase())
                           );
                           let newOption = { ...option };
                           if (newSubOptions.length > 0) {
                              newOption.subOptions = newSubOptions;
                              filteredOptions.push(newOption);
                           }
                        }
                        setOptions(filteredOptions);
                     }}
                  />
               </AutoComplete>
            </Col>
            <Col className={styles.antCol} style={{ lineHeight: "var(--main-header-height)" }}>
               <div style={{ float: "right" }}>
                  <NorificationsMenu />
                  <UserAvatar className={styles.userDropdown} />
               </div>
            </Col>
         </Row>
      </Header>
   );
};

export default AppHeader;

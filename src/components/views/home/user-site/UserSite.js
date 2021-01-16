import React from "react";
import styles from "./UserSite.module.css";
import "./UserSite.css";
import { AreaChart, Tooltip, Area, XAxis } from "recharts";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Spin, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { getMetricSingleValues, getResultByPartId, getSingleValue } from "../../../../common/graph-util/viewUtil";
import { HOME_USERS_SITE_AREA_PART, HOME_USERS_SITE_METRIC_PART } from "../../../../constants/constants";

const UserSite = (props) => {
   const { data, loading, extra } = props;

   let metricPart = getResultByPartId(HOME_USERS_SITE_METRIC_PART, data);
   let areaPart = getResultByPartId(HOME_USERS_SITE_AREA_PART, data);
   const graphData = areaPart
      ? areaPart.data.map((row) => {
           return {
              users: row.metricValues[0],
              date: row.dimensionValues[0],
           };
        })
      : [];

   let values = getMetricSingleValues(metricPart, 0, 1);
   let newValue = values[0];
   let oldValue = values[1];

   let color;
   let arrow;
   if (newValue > oldValue) {
      color = { color: "#3f8600" };
      arrow = <ArrowUpOutlined />;
   } else if (newValue < oldValue) {
      color = { color: "#cf1322" };
      arrow = <ArrowDownOutlined />;
   } else {
      color = { color: "#1890FF" };
      arrow = <ArrowRightOutlined />;
   }

   return (
      <div className={styles.userSiteContainer}>
         {loading ? (
            <Spin tip="Loading..." className={styles.spinner} />
         ) : (
            <>
               <div className={styles.header}>
                  <span className={styles.headerDomain}>{extra.domain}</span>
               </div>
               <div className={styles.metricHolder}>
                  <span className={styles.metricValue}>{getSingleValue(metricPart)}</span>
                  <span className={styles.metricPercentage}>
                     <Statistic
                        className={[styles.myStatistic, "user-site-statistics"]}
                        precision={2}
                        value={Math.abs((newValue / oldValue) * 100 - 100)}
                        valueStyle={color}
                        prefix={arrow}
                        suffix="%"
                     />
                  </span>
               </div>
               <div className={styles.graphContainer}>
                  <AreaChart
                     width={300}
                     height={100}
                     data={graphData}
                     margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                     <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#b3daff" stopOpacity={0.9} />
                           <stop offset="95%" stopColor="#b3daff" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="date" hide={true} />
                     <Tooltip />
                     <Area type="monotone" dataKey="users" stroke={"#99ceff"} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
               </div>
            </>
         )}
      </div>
   );
};

export default UserSite;

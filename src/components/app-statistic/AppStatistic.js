import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import React from "react";
import styles from "./AppStatistic.module.css";
import "./AppStatistic.css";

const AppStatistic = ({ oldValue, newValue, title, fontSize, containerStyle }) => {
   let style = {};
   let arrow;
   if (newValue > oldValue) {
      style.color = "#3f8600";
      arrow = <ArrowUpOutlined />;
   } else if (newValue < oldValue) {
      style.color = "#cf1322";
      arrow = <ArrowDownOutlined />;
   } else {
      style.color = "#1890FF";
      arrow = <ArrowRightOutlined />;
   }

   style.fontSize = fontSize;

   return (
      <div className={styles.statisticContainer} style={containerStyle}>
         <Statistic
            className={[styles.appStatistic, "app-statistic"]}
            title={title}
            precision={2}
            value={Math.abs((newValue / oldValue) * 100 - 100)}
            valueStyle={style}
            prefix={arrow}
            suffix="%"
         />
      </div>
   );
};

export default AppStatistic;

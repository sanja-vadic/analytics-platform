import React, { useEffect } from "react";
import { Select } from "antd";
import {
   CUSTOM,
   LAST_30_DAYS,
   LAST_30_MINUTES,
   LAST_3_HOURS,
   LAST_7_DAYS,
   LAST_90_DAYS,
   TODAY,
} from "../../../constants/constants";
import styles from "./RelativeRangePicker.module.css";

const { Option } = Select;

const RelativeRangePicker = (props) => {
   const { changeRelativeRange, defaultValue, style, className, bordered = false } = props;

   useEffect(() => {
      if (defaultValue) {
         changeRelativeRange(defaultValue);
      }
   }, [defaultValue]);

   return (
      <Select
         defaultValue={defaultValue ? defaultValue : LAST_7_DAYS}
         bordered={bordered}
         onChange={(value, event) => changeRelativeRange(value, event)}
         className={[className, styles.intervalSelect]}
         style={style}
      >
         <Option value={TODAY}>Today</Option>
         <Option value={LAST_30_MINUTES}>Last 30 minutes</Option>
         <Option value={LAST_3_HOURS}>Last 3 hours</Option>
         <Option value={LAST_7_DAYS}>Last 7 days</Option>
         <Option value={LAST_30_DAYS}>Last 30 days</Option>
         <Option value={LAST_90_DAYS}>Last 90 days</Option>
         <Option value={CUSTOM}>Custom</Option>
      </Select>
   );
};

export default RelativeRangePicker;

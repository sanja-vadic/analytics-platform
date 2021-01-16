import React, { useEffect, useState } from "react";
import { Col, DatePicker, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import styles from "./CompleteRangePicker.module.css";
import {
   LAST_30_DAYS,
   LAST_7_DAYS,
   LAST_90_DAYS,
   TODAY,
   CUSTOM,
   LAST_30_MINUTES,
   LAST_3_HOURS,
} from "../../../constants/constants";
import moment from "moment";
import { jsdateToDatetime } from "../../../common/util";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const CompleteRangePicker = (props) => {
   const {
      interval = { custom: false },
      changeStartDate,
      changeEndDate,
      changeStartTime,
      changeEndTime,
      changeRelativeRange,
      defaultValue,
   } = props;

   const [value, setValue] = useState(defaultValue);
   const last = useSelector((state) => state.intervals.interval.last);
   const unit = useSelector((state) => state.intervals.interval.unit);

   useEffect(() => {
      if (interval.custom) {
         setValue(CUSTOM);
      } else if (interval.unit === TODAY) {
         setValue(TODAY); //Need to fix
      } else {
         let v = `last_${interval.last}_${interval.unit.endsWith("s") ? interval.unit : interval.unit + "s"}`;
         setValue(v);
      }
   }, [interval]);

   useEffect(() => {
      if (defaultValue) {
         changeRelativeRange(defaultValue);
      }
   }, [defaultValue]);

   return (
      <Row justify="end" align="middle" className={styles.contentHeaderRow}>
         <Col>
            <Row>
               <RangePicker
                  bordered={false}
                  className={styles.rangePicker}
                  disabled={!interval.custom}
                  defaultValue={[moment(interval.dateFrom), moment(interval.dateTo)]}
                  value={[moment(interval.dateFrom), moment(interval.dateTo)]}
                  onCalendarChange={(moments, dateStrings, info) => {
                     info.range === "start" ? changeStartDate(dateStrings[0]) : changeEndDate(dateStrings[1]);
                  }}
                  dateRender={(current) => {
                     const style = {};
                     return (
                        <div className="ant-picker-cell-inner" style={style}>
                           {current.date()}
                        </div>
                     );
                  }}
               />
               <DatePicker
                  picker="time"
                  placeholder="Start time"
                  bordered={false}
                  showTime={{ format: "HH:mm" }}
                  format="HH:mm"
                  defaultValue={moment(interval.dateFrom)}
                  value={moment(interval.dateFrom)}
                  disabled={!interval.custom}
                  className={styles.timePicker}
                  onOk={(date) => changeStartTime(jsdateToDatetime(date))}
               />
               <DatePicker
                  picker="time"
                  placeholder="End time"
                  bordered={false}
                  showTime={{ format: "HH:mm" }}
                  format="HH:mm"
                  defaultValue={moment(interval.dateTo)}
                  value={moment(interval.dateTo)}
                  disabled={!interval.custom}
                  className={styles.timePicker}
                  onOk={(date) => changeEndTime(jsdateToDatetime(date))}
               />
            </Row>
            <Row justify="end">
               <Col>
                  <Select
                     defaultValue={defaultValue ? defaultValue : LAST_7_DAYS}
                     bordered={false}
                     value={value}
                     onChange={(value, event) => {
                        changeRelativeRange(value);
                     }}
                     className={styles.intervalSelect}
                  >
                     <Option value={TODAY}>Today</Option>
                     <Option value={LAST_30_MINUTES}>Last 30 minutes</Option>
                     <Option value={LAST_3_HOURS}>Last 3 hours</Option>
                     <Option value={LAST_7_DAYS}>Last 7 days</Option>
                     <Option value={LAST_30_DAYS}>Last 30 days</Option>
                     <Option value={LAST_90_DAYS}>Last 90 days</Option>
                     <Option value={CUSTOM}>Custom</Option>
                  </Select>
               </Col>
            </Row>
         </Col>
      </Row>
   );
};

export default CompleteRangePicker;

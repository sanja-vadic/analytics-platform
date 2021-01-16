import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Tooltip } from "antd";
import styles from "./StepTimerOptions.module.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { TIMER_OPTION } from "../../../../constants/constants";
import { changeTimerOptions } from "../trackingCodeSlice";
const CheckboxGroup = Checkbox.Group;

const StepTimerOptions = ({ onOptionChange }) => {
   const options = [
      {
         value: "loadtime",
         label: "Load time",
         description: "Represents time which is needed to load page",
      },
      {
         value: "pageretention",
         label: "Retention on page",
         description: "Represents time the users stays on page",
      },
   ];

   const dispatch = useDispatch();
   const checkedList = useSelector((state) => state.trackingCode.stepTimerOptions.checkedList);
   const indeterminate = useSelector((state) => state.trackingCode.stepTimerOptions.indeterminate);
   const checkAll = useSelector((state) => state.trackingCode.stepTimerOptions.checkAll);

   useEffect(() => {
      onOptionChange({ type: TIMER_OPTION, list: checkedList });
   }, [checkedList]);

   const onChange = (checkedList) => {
      dispatch(
         changeTimerOptions({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < options.length,
            checkAll: checkedList.length === options.lengt,
         })
      );
   };

   const onCheckAllChange = (e) => {
      dispatch(
         changeTimerOptions({
            checkedList: e.target.checked ? options.map((option) => option.value) : [],
            indeterminate: false,
            checkAll: e.target.checked,
         })
      );
   };

   return (
      <div>
         <span className={styles.title}>Choose which timer options you want to track</span>
         <div className={styles.selectAllCheckboxContainer}>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
               Check all
            </Checkbox>
         </div>
         <br />
         <CheckboxGroup className="standard-options-checkbox-group" value={checkedList} onChange={onChange}>
            {options.map((option, i) => (
               <div key={i} className={styles.checkBoxItem}>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                  <Tooltip title={option.description}>
                     <QuestionCircleOutlined className={styles.questionIcon} />
                  </Tooltip>
               </div>
            ))}
         </CheckboxGroup>
      </div>
   );
};

export default StepTimerOptions;

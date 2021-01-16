import { Checkbox, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./StepStandardOptions.module.css";
import "./StepStandardOptions.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { STANDARD_OPTION } from "../../../../constants/constants";
import { changeStandardOptions } from "../trackingCodeSlice";
const CheckboxGroup = Checkbox.Group;

const StepStandardOption = ({ onOptionChange }) => {
   const options = [
      { value: "pageview", label: "Page view", description: "Represents tracking of page information" },
      { value: "screenview", label: "Screen view", description: "Represents tracking of screen information" },
      { value: "localtime", label: "Local time", description: "Represents tracking of local time information" },
      { value: "acquisition", label: "Acquisition", description: "Represents tracking of acquistion information" },
   ];

   const dispatch = useDispatch();
   const checkedList = useSelector((state) => state.trackingCode.stepStandardOptions.checkedList);
   const indeterminate = useSelector((state) => state.trackingCode.stepStandardOptions.indeterminate);
   const checkAll = useSelector((state) => state.trackingCode.stepStandardOptions.checkAll);

   useEffect(() => {
      onOptionChange({ type: STANDARD_OPTION, list: checkedList });
   }, [checkedList]);

   const onChange = (checkedList) => {
      dispatch(
         changeStandardOptions({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < options.length,
            checkAll: checkedList.length === options.lengt,
         })
      );
   };

   const onCheckAllChange = (e) => {
      dispatch(
         changeStandardOptions({
            checkedList: e.target.checked ? options.map((option) => option.value) : [],
            indeterminate: false,
            checkAll: e.target.checked,
         })
      );
   };

   return (
      <div>
         <span className={styles.title}>Choose which standard options you want to track</span>
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

export default StepStandardOption;

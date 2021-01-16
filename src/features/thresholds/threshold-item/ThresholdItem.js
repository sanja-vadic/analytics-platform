import React, { useState } from "react";
import styles from "./ThresholdItem.module.css";
import { Button, Input, Select, Tooltip } from "antd";
import { ALARM, GOAL } from "../../../constants/constants";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";

const ThresholdItem = ({ partTitle, value, type, viewId, thresholdId, onSave, onRemove, i }) => {
   const [selectedType, setSelectedType] = useState(type);
   const [thresholdInputValue, setThresholdInputValue] = useState(value);

   return (
      <div className={styles.partItemContainer}>
         <div className={styles.title}>{partTitle}</div>
         <div className={styles.thresholdType}>
            <Select
               defaultValue={type}
               value={selectedType}
               onSelect={(val, option) => setSelectedType(val)}
               className={styles.select}
            >
               <Select.Option key={ALARM}>ALARM</Select.Option>
               <Select.Option key={GOAL}>GOAL</Select.Option>
            </Select>
         </div>
         <div className={styles.value}>
            <Input
               placeholder="Threshold"
               defaultValue={value}
               value={thresholdInputValue}
               onChange={(e) => setThresholdInputValue(e.target.value)}
            />
         </div>
         <div className={styles.actionButtonsContainer}>
            <Tooltip title="Save threshold">
               <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  onClick={() => onSave(viewId, thresholdId, type, value)}
               />
            </Tooltip>
            <Tooltip title="Remove threshold">
               <Button icon={<CloseOutlined />} onClick={() => onRemove(thresholdId, viewId)} />
            </Tooltip>
         </div>
      </div>
   );
};

export default ThresholdItem;

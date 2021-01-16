import { Button, Input, Radio, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./StepEventOptions.module.css";
import { InfoCircleOutlined, TagOutlined, PlusOutlined } from "@ant-design/icons";
import { EVENT_OPTION } from "../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateEvents } from "../trackingCodeSlice";

const StepEventOptions = ({ onOptionChange }) => {
   const [typeValue, setTypeValue] = useState("click");
   const [inputValue, setInputValue] = useState("");
   const [inputErrorMessage, setInputErrorMessage] = useState("");

   const dispatch = useDispatch();
   const events = useSelector((state) => state.trackingCode.stepEventOptions.events);

   const onChange = (e) => {
      setTypeValue(e.target.value);
   };

   useEffect(() => {
      onOptionChange({ type: EVENT_OPTION, list: events });
   }, [events]);

   const addEvent = (e) => {
      if (inputValue) {
         dispatch(updateEvents([...events, { type: typeValue, elementId: inputValue }]));
         setInputValue("");
         setInputErrorMessage("");
      } else {
         setInputErrorMessage("Element id is required.");
      }
   };

   const closeTag = (event) => {
      dispatch(updateEvents(events.filter((e) => event.type !== e.type || event.elementId !== e.elementId)));
   };

   return (
      <div>
         <span className={styles.title}>Create events you want to track</span>
         <div className={styles.elementsContainer}>
            <Radio.Group onChange={onChange} value={typeValue}>
               <Radio value="click">Click</Radio>
               <Radio value="hover">Hover</Radio>
            </Radio.Group>
            <div className={styles.inputElementsContainer}>
               <div className={styles.inputHolder}>
                  <Input
                     placeholder="Enter element ID"
                     value={inputValue}
                     onChange={(e) => {
                        setInputValue(e.target.value);
                     }}
                     prefix={<TagOutlined style={{ color: "var(--secondary-near-color)" }} />}
                     suffix={
                        <Tooltip title="This ID has to be set up on element you want to track">
                           <InfoCircleOutlined style={{ color: "var(--primary-near-color)" }} />
                        </Tooltip>
                     }
                  />
               </div>
               <Button type="primary" icon={<PlusOutlined />} onClick={(e) => addEvent(e)} />
               <div className={styles.inputErrorMessage}>{inputErrorMessage}</div>
            </div>
            <div className={styles.tagsHolder}>
               {events.map((event, i) => (
                  <Tag
                     key={i}
                     color={event.type === "click" ? "blue" : "green"}
                     closable
                     onClose={(e) => {
                        e.preventDefault();
                        closeTag(event);
                     }}
                     className={styles.tag}
                  >
                     <span className={styles.tagLabel}>
                        {event.type} - {event.elementId}
                     </span>
                  </Tag>
               ))}
            </div>
         </div>
      </div>
   );
};

export default StepEventOptions;

import { PlusOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Tag } from "antd";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import withGlobalIntervalFetch from "../../../common/graph-util/hoc/interval-fetch/withGlobalIntervalFetch";
import { viewMappings } from "../../../common/graph-util/viewMappings";
import CompleteRangePickerGlobal from "../../../components/interval/complete-range-picker/CompleteRangePickerGlobal";
import styles from "./ReportsCustom.module.css";

const viewMap = new Map();

const ReportsCustom = (props) => {
   const [chosenViews, setChosenViews] = useState([]);
   const defaultValues = Object.keys(viewMappings)
      .filter((vm) => chosenViews.filter((v) => v.value === vm).length === 0)
      .map((value, i) => {
         return { value: value };
      });
   const [value, setValue] = useState("");
   const [options, setOptions] = useState(defaultValues);
   const [inputErrorMessage, setInputErrorMessage] = useState("");

   const onSearch = (searchText) => {
      setOptions(defaultValues.filter((o) => o.value.includes(searchText) && !chosenViews.includes(o.value)));
   };

   const onChange = (data) => {
      setValue(data);
   };

   const addView = (e) => {
      const isOptionExists = options.find((option) => option.value === value);
      if (value && isOptionExists) {
         setChosenViews([...chosenViews, { id: chosenViews.length + 1, value: value }]);
         setOptions(options.filter((option) => option.value != value));
         setValue("");
         setInputErrorMessage("");
      } else {
         setInputErrorMessage("View doesn't exists");
      }
   };

   const closeTag = (view) => {
      setChosenViews(chosenViews.filter((v) => v.value !== view));
      setOptions([...options, { value: view }]);
      viewMap.delete(view);
   };

   return (
      <div className={styles.reportsCustomContainer}>
         <div className={styles.contentHeader}>
            <div className={styles.findViewContainer}>
               <span className={styles.printLabel}>Add views you are interested in.</span>
               <div className={styles.findViewInputContainer}>
                  <AutoComplete
                     options={options}
                     onSearch={onSearch}
                     onChange={onChange}
                     value={value}
                     placeholder="Find view"
                     className={styles.autoComplete}
                  />
                  <Button type="primary" onClick={addView} icon={<PlusOutlined />}></Button>
                  <div className={styles.inputErrorMessage}>{inputErrorMessage}</div>
               </div>
            </div>
            <CompleteRangePickerGlobal />
         </div>
         <div className={styles.tagsHolder}>
            {chosenViews.map((view, i) => (
               <Tag
                  key={i}
                  color={"blue"}
                  closable
                  onClose={(e) => {
                     e.preventDefault();
                     closeTag(view.value);
                  }}
                  className={styles.tag}
               >
                  <span className={styles.tagLabel}>{view.value}</span>
               </Tag>
            ))}
         </div>
         <div className={styles.viewsContainer}>
            <ReactSortable
               tag="div"
               style={{ display: "flex", gap: "20px", flexWrap: "wrap", width: "1500px", paddingBottom: "10px" }}
               handle={`.${styles.itemHeader}`}
               animation={500}
               list={chosenViews}
               setList={setChosenViews}
            >
               {chosenViews.map((v, i) => {
                  const view = viewMappings[v.value];
                  if (view) {
                     let ViewGlobal;
                     if (viewMap.has(v.value)) {
                        ViewGlobal = viewMap.get(v.value);
                     } else {
                        const View = view.component;
                        ViewGlobal = withGlobalIntervalFetch(View);
                        viewMap.set(v.value, ViewGlobal);
                     }
                     return (
                        <div key={i}>
                           <ViewGlobal
                              fetchData={view.fetchData}
                              dragableClass={styles.itemHeader}
                              dragAndDrop={true}
                              footerVisible={false}
                           />
                        </div>
                     );
                  }
                  return <></>;
               })}
            </ReactSortable>
         </div>
      </div>
   );
};

export default ReportsCustom;

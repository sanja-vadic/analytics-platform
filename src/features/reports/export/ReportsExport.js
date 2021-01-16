import React, { useState } from "react";
import styles from "./ReportsExport.module.css";
import CompleteRangePickerGlobal from "../../../components/interval/complete-range-picker/CompleteRangePickerGlobal";
import PrintButton from "../../../components/printable/print-button/PrintButton";
import { AutoComplete, Button, Tag } from "antd";
import { viewMappings } from "../../../common/graph-util/viewMappings";
import withGlobalIntervalFetch from "../../../common/graph-util/hoc/interval-fetch/withGlobalIntervalFetch";
import Page from "../../../components/printable/page/Page";
import { PlusOutlined } from "@ant-design/icons";

const defaultValues = Object.keys(viewMappings).map((value, i) => {
   return { value: value };
});

const Reports = (props) => {
   const [chosenViews, setChosenViews] = useState([]);
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
         setChosenViews([...chosenViews, value]);
         setOptions(options.filter((option) => option.value != value));
         setValue("");
         setInputErrorMessage("");
      } else {
         setInputErrorMessage("View doesn't exists");
      }
   };

   const closeTag = (view) => {
      setChosenViews(chosenViews.filter((v) => v !== view));
      setOptions([...options, { value: view }]);
   };

   return (
      <div className={styles.reportsContainer}>
         <div className={styles.header}>
            <PrintButton label="Export" printableClassName="toPrint" disabled={chosenViews.length === 0} />
            <CompleteRangePickerGlobal />
         </div>
         <span className={styles.printLabel}>Add views you are interested in and export them as PDF</span>
         <div className={styles.findViewContainer}>
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
         <div className={styles.tagsHolder}>
            {chosenViews.map((view, i) => (
               <Tag
                  key={i}
                  color={"blue"}
                  closable
                  onClose={(e) => {
                     e.preventDefault();
                     closeTag(view);
                  }}
                  className={styles.tag}
               >
                  <span className={styles.tagLabel}>{view}</span>
               </Tag>
            ))}
         </div>
         <div className={styles.views}>
            {chosenViews.length === 0 ? (
               <div className={styles.noDataLabel}>Nothing to export</div>
            ) : (
               chosenViews.map((view, i) => {
                  if (i % 2 === 0) {
                     const pageElements = chosenViews.slice(i, i + 2);
                     return (
                        <Page key={i} printableClassName="toPrint" label={`Page ${i / 2 + 1}`}>
                           {pageElements.map((element, elementIndex) => {
                              const view = viewMappings[element];
                              const View = view.component;
                              const ViewGlobal = withGlobalIntervalFetch(View);
                              return <ViewGlobal key={elementIndex} fetchData={view.fetchData} />;
                           })}
                        </Page>
                     );
                  } else {
                     return "";
                  }
               })
            )}
         </div>
      </div>
   );
};

export default Reports;

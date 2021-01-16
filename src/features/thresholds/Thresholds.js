import { AutoComplete, Button, Collapse, Select } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Thresholds.module.css";
import ThresholdItem from "./threshold-item/ThresholdItem";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ALARM, GOAL } from "../../constants/constants";

const alreadyChosenDataFromServer = [
   {
      viewId: 10000,
      name: "view_id1",
      title: "Acquisition overview",
      thresholds: [
         {
            partId: 10000,
            partName: "part_id1",
            partTitle: "Total number part",
            thresholdId: 10000,
            thresholdType: ALARM,
            threshold: 1000,
         },
         {
            partId: 10001,
            partName: "part_id2",
            partTitle: "Total number by day part",
            thresholdId: 10001,
            thresholdType: GOAL,
            threshold: 200,
         },
      ],
   },
   {
      viewId: 10001,
      name: "view_id2",
      title: "Geo Acquisition",
      thresholds: [
         {
            partId: 10002,
            partName: "part_id1",
            partTitle: "Total number part",
            thresholdId: 10002,
            thresholdType: ALARM,
            threshold: 1000,
         },
      ],
   },
   {
      viewId: 10002,
      name: "view_id3",
      title: "Site load speed",
      thresholds: [
         {
            partId: 10003,
            partName: "part_id1",
            partTitle: "Total number part",
            thresholdId: 10003,
            thresholdType: GOAL,
            threshold: 1000,
         },
      ],
   },
];

const allDataFromServer = [
   {
      viewId: 10000,
      name: "view_id1",
      title: "Acquisition overview",
      parts: [
         {
            partId: 10000,
            name: "part_id1",
            title: "Total number part",
         },
         {
            partId: 10001,
            name: "part_id2",
            title: "Total number by day part",
         },
      ],
   },
   {
      viewId: 10001,
      name: "view_id2",
      title: "Geo Acquisition",
      parts: [
         {
            partId: 10002,
            part: "part_id1",
            title: "Total number part",
         },
      ],
   },
   {
      viewId: 10002,
      name: "view_id3",
      title: "Site load speed",
      parts: [
         {
            partId: 10003,
            part: "part_id1",
            title: "Total number part",
         },
      ],
   },
   {
      viewId: 10003,
      name: "view_id4",
      title: "Site speed",
      parts: [
         {
            partId: 10004,
            part: "part_id1",
            title: "Total part",
         },
      ],
   },
];

const Thresholds = (props) => {
   const [defaultOptions, setDefaultOptions] = useState(getDefaultOptions());
   const [chosenViews, setChosenViews] = useState([]);
   const [options, setOptions] = useState(defaultOptions);
   const [selectedViewId, setSelectedViewId] = useState("");
   const [allViews, setAllViews] = useState([]);
   const [selectedPart, setSelectedPart] = useState({});
   const [viewInputErrorMessage, setViewInputErrorMessage] = useState("");
   const [viewValue, setViewValue] = useState("");
   const [thresholdValues, setThresholdValues] = useState([]);

   useEffect(() => {
      // TO DO - get data from server
      setChosenViews(alreadyChosenDataFromServer);
   }, []);

   useEffect(() => {
      // TO DO - get data from server
      setAllViews(allDataFromServer);
   }, []);

   useEffect(() => {
      setOptions(getOptions(chosenViews));
   }, [chosenViews]);

   useEffect(() => {
      const thresholds = allViews.map((view) => {
         return { viewId: view.viewId, value: undefined };
      });
      setThresholdValues(thresholds);
   }, [allViews]);

   const onSearch = (searchText) => {
      setViewValue(searchText);
      setOptions(search(searchText, getOptions(chosenViews)));
   };

   const onSelectViewwOption = (data, option) => {
      setViewValue(option.value);
      setSelectedViewId(option.key);
   };

   const addView = () => {
      if (selectedViewId && options.find((option) => option.key === selectedViewId)) {
         const view = findViewById(selectedViewId, allViews);
         let newView = { ...view };
         newView.thresholds = [];
         delete newView.parts;
         setChosenViews([...chosenViews, newView]);
         setOptions(options.filter((option) => option.value !== selectedViewId));
         setViewValue("");
         setSelectedViewId("");
         setViewInputErrorMessage("");
      } else {
         setViewInputErrorMessage("View doesn't exists");
      }
   };

   const removeView = (e, viewId) => {
      setChosenViews(removeViewById(viewId, chosenViews));
   };

   const onSelectPart = (viewId, partId) => {
      const parts = findAllPartsOfView(viewId, allDataFromServer);
      const part = findPartById(partId, parts);
      setSelectedPart({
         viewId: viewId,
         partId: partId,
         partName: part.name,
         partTitle: part.title,
      });

      setThresholdValues(
         thresholdValues.map((t) => {
            if (t.viewId === viewId) {
               const newThreshold = { ...t };
               newThreshold.value = part.title;
               return newThreshold;
            } else {
               return t;
            }
         })
      );
   };

   const addThreshold = (e) => {
      const defaultThresholdType = ALARM;
      const thresholdId = getThresholdIdFromServer(selectedPart.partId, defaultThresholdType);
      let view = findViewById(selectedPart.viewId, chosenViews);
      view.thresholds.push(
         createDefaultThreshold(
            thresholdId,
            defaultThresholdType,
            selectedPart.partId,
            selectedPart.partName,
            selectedPart.partTitle
         )
      );
      const newViews = chosenViews.map((v, i) => (v.viewId === selectedPart.viewId ? view : v));
      setChosenViews(newViews);
      setThresholdValues(
         thresholdValues.map((t) => {
            if (t.viewId === selectedPart.viewId) {
               const newThreshold = { ...t };
               newThreshold.value = undefined;
               return newThreshold;
            } else {
               return t;
            }
         })
      );
   };

   const removeThreshold = (thresholdId, viewId) => {
      let view = findViewById(viewId, chosenViews);
      view.thresholds = removeThresholdFromView(thresholdId, view);
      const newViews = chosenViews.map((v, i) => (v.viewId === viewId ? view : v));
      setChosenViews(newViews);
   };

   const saveThreshold = (viewId, partId, type, value) => {
      console.log("on save: ", viewId, partId, type, value);
   };

   return (
      <div className={styles.thresholdsContainer}>
         <div className={styles.inputRow}>
            <AutoComplete
               prefix={<SearchOutlined />}
               options={options}
               onSearch={(val) => onSearch(val)}
               onSelect={(val, option) => onSelectViewwOption(val, option)}
               value={viewValue}
               placeholder="Find view you want to add"
               className={styles.autoComplete}
               showSearch={true}
            ></AutoComplete>
            <Button type="primary" icon={<PlusOutlined />} onClick={addView}></Button>
            <div className={styles.viewInputErrorMessage}>{viewInputErrorMessage}</div>
         </div>
         <div className={styles.collapsesContainer}>
            {chosenViews.length === 0 ? (
               <div>There is no thresholds selected.</div>
            ) : (
               <Collapse>
                  {chosenViews.map((view, i) => (
                     <Collapse.Panel
                        header={view.title}
                        key={view.viewId}
                        extra={
                           <CloseOutlined
                              onClick={(e) => {
                                 e.stopPropagation();
                                 removeView(e, view.viewId);
                              }}
                           />
                        }
                     >
                        <div className={styles.partSelectorContainer}>
                           <Select
                              placeholder="Choose part of selected view"
                              onSelect={(partId) => onSelectPart(view.viewId, +partId)}
                              value={
                                 thresholdValues && thresholdValues.length > 0
                                    ? thresholdValues.find((t) => t.viewId === view.viewId).value
                                    : undefined
                              }
                              className={styles.partsSelect}
                           >
                              {findAllPartsOfView(view.viewId, allDataFromServer).map((part, i) => (
                                 <Select.Option key={part.partId}>{part.title}</Select.Option>
                              ))}
                           </Select>
                           <Button type="primary" icon={<PlusOutlined />} onClick={addThreshold}></Button>
                        </div>
                        {view.thresholds.length === 0 ? (
                           <div>There is no thresholds set up.</div>
                        ) : (
                           view.thresholds.map((threshold, i) => (
                              <ThresholdItem
                                 key={threshold.thresholdId}
                                 partTitle={threshold.partTitle}
                                 value={threshold.threshold}
                                 type={threshold.thresholdType}
                                 viewId={view.viewId}
                                 thresholdId={threshold.thresholdId}
                                 onSave={saveThreshold}
                                 onRemove={removeThreshold}
                              />
                           ))
                        )}
                     </Collapse.Panel>
                  ))}
               </Collapse>
            )}
         </div>
      </div>
   );
};

/**
 * This function creates default option data for view AutoComplete component.
 *
 * @returns {Array} Array of javascript object in format {key: "viewId", value: "viewTitle"} which represents default option data for AutoComplete component
 */
function getDefaultOptions() {
   return getOptions(alreadyChosenDataFromServer);
}

/**
 * This function creates option data for view AutoComplete component.
 * Every time when user added new view into accordion, that view have to be removed
 * from options data.
 *
 * @param {Array} chosenData - Array of chosen views data
 * @returns {Array} Array of javascript object in format {key: "viewId", value: "viewTitle"} which represents option data for AutoComplete component
 */
function getOptions(chosenData) {
   const autoCompleteOptions = allDataFromServer
      .filter((view) => chosenData.filter((chosenView) => chosenView.viewId === view.viewId).length === 0)
      .map((item) => {
         return { key: item.viewId, value: item.title };
      });
   return autoCompleteOptions;
}

/**
 * Retrive all options which match `searchText`.
 *
 * @param {string} searchText - Text which user want to search
 * @param {Array} options - All options in AutoComplete component
 * @returns {Array}
 */
function search(searchText, options) {
   return options.filter((o) => o.value.toLowerCase().includes(searchText.toLowerCase()));
}

/**
 * Find view by `viewId` in `views`.
 *
 * @param {number} viewId
 * @param {Array} views
 * @returns {Object} View with id `viewId`
 */
function findViewById(viewId, views) {
   return views.find((v) => v.viewId === viewId);
}

/**
 * Remove view with `viewId` from `views` array.
 * `views` will not be modified, instead new array will be created.
 *
 * @param {number} viewId
 * @param {Array} views
 */
function removeViewById(viewId, views) {
   return views.filter((v) => v.viewId !== viewId);
}

/**
 * Finds all parts of view with id `viewId` in `data` array.
 * Data will not be modified, instead new array will be created.
 *
 * @param {number} viewId
 * @param {Array} data
 * @returns {Array} Parts of view with id `viewId`
 */
function findAllPartsOfView(viewId, data) {
   return data.find((v) => v.viewId === viewId).parts;
}

/**
 * Find part with id `partId` in `parts`.
 *
 * @param {number} partId
 * @param {Array} parts
 * @returns {Object} Part with id `partId`
 */
function findPartById(partId, parts) {
   return parts.find((p) => p.partId === partId);
}

/**
 * Remove threshold with `thresholdId` from `view`.
 * View will not be modified, instead new array will be created.
 *
 * @param {number} thresholdId
 * @param {Object} view
 * @returns {Array} Thresholds array without threshold with id `thresholdId`
 */
function removeThresholdFromView(thresholdId, view) {
   return view.thresholds.filter((t) => t.thresholdId !== thresholdId);
}

/**
 * Sends request to server for new threshold creation
 * Server will generate new threshold id and return it to the client.
 *
 * @param {number} partId
 * @returns {number} Generated threshold id
 */
function getThresholdIdFromServer(partId) {
   // TODO: Get threshold id from server
   const max = 10000;
   const min = 1;
   const newThresholdIdFromServer = Math.floor(Math.random() * (max - min + 1) + min);
   return newThresholdIdFromServer;
}

/**
 * Format threshold parameters into object which will be inserted into view thresholds in chosenViews array.
 *
 * @param {number} thresholdId
 * @param {string} thresholdType
 * @param {number} partId
 * @param {string} partName
 * @param {string} partTitle
 */
function createDefaultThreshold(thresholdId, thresholdType, partId, partName, partTitle, thresholdValue = 0) {
   return {
      partId: partId,
      partName: partName,
      partTitle: partTitle,
      thresholdId: thresholdId,
      thresholdType: thresholdType,
      threshold: thresholdValue,
   };
}

export default Thresholds;

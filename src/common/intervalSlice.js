import { createSlice } from "@reduxjs/toolkit";
import {
   RELATIVE_RANGE,
   DAY,
   ACQUISITION_DASHBOARD_ACTIVE_USERS_GROUP,
   HOME_DASHBOARD_USER_SITES_GROUP,
} from "../constants/constants";
import { jsdateToDatetime } from "./util";

export const intervalSlice = createSlice({
   name: "intervalSlice",
   initialState: {
      interval: {
         custom: false,
         type: RELATIVE_RANGE,
         last: 7, // active in relative range
         unit: DAY, // active in relative range
         dateFrom: "2020-09-20T00:00:00.000Z", // active in absolute range
         dateTo: "2020-09-27T00:00:00.000Z", // active in absolute range
      },
      [HOME_DASHBOARD_USER_SITES_GROUP]: {
         custom: false,
         type: RELATIVE_RANGE,
         last: 7, // active in relative range
         unit: DAY, // active in relative range
         dateFrom: "2020-09-20T00:00:00.000Z", // active in absolute range
         dateTo: "2020-09-27T00:00:00.000Z", // active in absolute range
      },
   },
   reducers: {
      changeInterval: (state, action) => {
         let group = action.payload.group;
         let payloadValue = group ? action.payload.value : action.payload;
         let stateInterval = group ? state[group] : state.interval;

         stateInterval.custom = payloadValue.custom;
         if (payloadValue.type) stateInterval.type = payloadValue.type;
         if (payloadValue.last) stateInterval.last = payloadValue.last;
         if (payloadValue.unit) stateInterval.unit = payloadValue.unit;
         if (payloadValue.dateFrom) stateInterval.dateFrom = payloadValue.dateFrom;
         if (payloadValue.dateTo) stateInterval.dateTo = payloadValue.dateTo;
      },
      changeStartDate: (state, action) => {
         let group = action.payload.group;
         let payloadValue = group ? action.payload.value : action.payload;
         let stateInterval = group ? state[group] : state.interval;

         let oldDate = new Date(stateInterval.dateFrom);
         let newDate = new Date(payloadValue);
         newDate.setHours(oldDate.getHours());
         newDate.setMinutes(oldDate.getMinutes());
         stateInterval.dateFrom = jsdateToDatetime(newDate);
      },
      changeEndDate: (state, action) => {
         let group = action.payload.group;
         let payloadValue = group ? action.payload.value : action.payload;
         let stateInterval = group ? state[group] : state.interval;

         let oldDate = new Date(stateInterval.dateTo);
         let newDate = new Date(payloadValue);
         newDate.setHours(oldDate.getHours());
         newDate.setMinutes(oldDate.getMinutes());
         stateInterval.dateTo = jsdateToDatetime(newDate);
      },
      changeStartTime: (state, action) => {
         let group = action.payload.group;
         let payloadValue = group ? action.payload.value : action.payload;
         let stateInterval = group ? state[group] : state.interval;

         stateInterval.dateFrom = payloadValue;
      },
      changeEndTime: (state, action) => {
         let group = action.payload.group;
         let payloadValue = group ? action.payload.value : action.payload;
         let stateInterval = group ? state[group] : state.interval;

         stateInterval.dateTo = payloadValue;
      },
   },
});

export const { changeInterval, changeStartDate, changeEndDate, changeStartTime, changeEndTime } = intervalSlice.actions;

export default intervalSlice.reducer;

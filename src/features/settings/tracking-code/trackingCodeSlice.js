import { createSlice } from "@reduxjs/toolkit";

export const trackingCodeSlice = createSlice({
   name: "trackingCodeSlice",
   initialState: {
      stepStandardOptions: {
         checkedList: ["pageview", "screenview", "localtime", "acquisition"],
         indeterminate: true,
         checkAll: false,
      },
      stepEventOptions: {
         events: [],
      },
      stepTimerOptions: {
         checkedList: [],
         indeterminate: true,
         checkAll: false,
      },
   },
   reducers: {
      changeStandardOptions: (state, action) => {
         state.stepStandardOptions.checkedList = action.payload.checkedList;
         state.stepStandardOptions.indeterminate = action.payload.indeterminate;
         state.stepStandardOptions.checkAll = action.payload.checkAll;
      },
      changeTimerOptions: (state, action) => {
         state.stepTimerOptions.checkedList = action.payload.checkedList;
         state.stepTimerOptions.indeterminate = action.payload.indeterminate;
         state.stepTimerOptions.checkAll = action.payload.checkAll;
      },
      updateEvents: (state, action) => {
         state.stepEventOptions.events = action.payload;
      },
   },
});

export const { changeStandardOptions, changeTimerOptions, updateEvents } = trackingCodeSlice.actions;
export default trackingCodeSlice.reducer;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEndDate, changeEndTime, changeInterval, changeStartDate, changeStartTime } from "../../../intervalSlice";
import { generatePayloadByTimeInterval } from "../../../util";

const withGlobalInterval = (WrappedComponent) => (props) => {
   const dispatch = useDispatch();
   let interval = useSelector((state) => state.intervals.interval);

   const changeStartDateCallback = (date) => {
      dispatch(changeStartDate(date));
   };

   const changeEndDateCallback = (date) => {
      dispatch(changeEndDate(date));
   };

   const changeStartTimeCallback = (date) => {
      dispatch(changeStartTime(date));
   };

   const changeEndTimeCallback = (date) => {
      dispatch(changeEndTime(date));
   };

   const changeRelativeRangeCallback = (value) => {
      let payload = generatePayloadByTimeInterval(value);
      dispatch(changeInterval(payload));
   };

   return (
      <WrappedComponent
         {...props}
         interval={interval}
         changeStartDate={changeStartDateCallback}
         changeEndDate={changeEndDateCallback}
         changeStartTime={changeStartTimeCallback}
         changeEndTime={changeEndTimeCallback}
         changeRelativeRange={changeRelativeRangeCallback}
      />
   );
};

export default withGlobalInterval;

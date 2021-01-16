import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEndDate, changeEndTime, changeInterval, changeStartDate, changeStartTime } from "../../../intervalSlice";
import { generatePayloadByTimeInterval } from "../../../util";

const withGroupInterval = (WrappedComponent, group) => (props) => {
   const dispatch = useDispatch();
   let interval = useSelector((state) => state.intervals[group]);

   const changeStartDateCallback = (date) => {
      dispatch(changeStartDate({ group: group, value: date }));
   };

   const changeEndDateCallback = (date) => {
      dispatch(changeEndDate({ group: group, value: date }));
   };

   const changeStartTimeCallback = (date) => {
      dispatch(changeStartTime({ group: group, value: date }));
   };

   const changeEndTimeCallback = (date) => {
      dispatch(changeEndTime({ group: group, value: date }));
   };

   const changeRelativeRangeCallback = (value) => {
      let payload = generatePayloadByTimeInterval(value);
      dispatch(changeInterval({ group: group, value: payload }));
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

export default withGroupInterval;

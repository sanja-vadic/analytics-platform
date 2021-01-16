import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL } from "../../../../constants/constants";
import { changeInterval } from "../../../intervalSlice";

const withGlobalIntervalFetch = (WrappedComponent) => (props) => {
   const { fetchData, dragAndDrop } = props;
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const dispatch = useDispatch();

   const interval = useSelector((state) => state.intervals.interval);

   useEffect(() => {
      const fetch = async (dateFrom, dateTo) => {
         try {
            setLoading(true);
            const apiResponse = await fetchData(dateFrom, dateTo);
            setLoading(false);
            if (apiResponse.status !== 200) {
               setError(true);
            } else {
               setData(apiResponse.data.responses);
               setError(false);
            }
         } catch (ex) {
            setError(true);
            setLoading(false);
         }
      };
      fetch(interval.dateFrom, interval.dateTo);
   }, [interval]);

   const dispatchInterval = (payload) => {
      dispatch(changeInterval(payload));
   };

   return (
      <WrappedComponent
         {...props}
         scope={GLOBAL}
         data={data}
         loading={loading}
         error={error}
         dispatchInterval={dispatchInterval}
      />
   );
};

export default withGlobalIntervalFetch;

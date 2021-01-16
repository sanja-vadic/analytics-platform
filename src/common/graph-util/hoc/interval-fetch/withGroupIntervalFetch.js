import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GROUP } from "../../../../constants/constants";
import { changeInterval } from "../../../intervalSlice";

const withGroupIntervalFetch = (WrappedComponent, group) => (props) => {
   const { fetchData, extra } = props;
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const dispatch = useDispatch();

   const interval = useSelector((state) => state.intervals[group]);

   useEffect(() => {
      const fetch = async (dateFrom, dateTo) => {
         try {
            setLoading(true);
            const apiResponse = await fetchData(dateFrom, dateTo, extra);
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
      dispatch(changeInterval({ group: group, value: payload }));
   };

   return (
      <WrappedComponent
         {...props}
         scope={GROUP}
         data={data}
         loading={loading}
         error={error}
         dispatchInterval={dispatchInterval}
      />
   );
};

export default withGroupIntervalFetch;

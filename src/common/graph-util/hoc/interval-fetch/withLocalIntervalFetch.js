import React, { useEffect, useState } from "react";
import { DAY, LOCAL, RELATIVE_RANGE } from "../../../../constants/constants";

const withLocalIntervalFetch = (WrappedComponent) => (props) => {
   const { fetchData, extra } = props;
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [localInterval, setLocalInterval] = useState({
      custom: false,
      type: RELATIVE_RANGE,
      last: 7, // active in relative range
      unit: DAY, // active in relative range
      dateFrom: "2020-09-20T00:00:00.000Z", // active in absolute range
      dateTo: "2020-09-27T00:00:00.000Z", // active in absolute range
   });

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
      fetch(localInterval.dateFrom, localInterval.dateTo);
   }, [localInterval]);

   const dispatchInterval = (payload) => {
      setLocalInterval(payload);
   };

   return (
      <WrappedComponent
         {...props}
         scope={LOCAL}
         data={data}
         loading={loading}
         error={error}
         localInterval={localInterval}
         dispatchInterval={dispatchInterval}
      />
   );
};

export default withLocalIntervalFetch;

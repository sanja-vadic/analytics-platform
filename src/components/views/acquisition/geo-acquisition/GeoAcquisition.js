import React, { useEffect, useState } from "react";
import ViewBox from "../../../view-box/ViewBox";
import { ACQUISITION_USERS_COUNTRY_GEO_MAP_PART, HORIZONTAL_LARGE_VIEW_BOX } from "../../../../constants/constants";
import GeoChart from "../../common/geo-chart/GeoChart";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";

const GeoAcquisition = ({ data, loading, error }) => {
   const [geoData, setGeoData] = useState([["Country", "Popularity"]]);
   // let geoData = [
   //    ["Country", "Popularity"],
   //    ["Serbia", 30],
   //    ["France", 70],
   //    ["Spain", 80],
   // ];

   useEffect(() => {
      const geoPart = getResultByPartId(ACQUISITION_USERS_COUNTRY_GEO_MAP_PART, data);
      let geoData = [["Country", "Popularity"]];
      if (geoPart) {
         for (let row of geoPart.data) {
            geoData.push([row.dimensionValues[0], row.metricValues[0]]);
         }
      }
      setGeoData(geoData);
   }, [data]);

   return (
      <ViewBox type={HORIZONTAL_LARGE_VIEW_BOX} footerVisible={false} headerTitle="Geo Acquisition" loading={loading}>
         <GeoChart
            height="550px"
            geoData={geoData}
            //mapsApiKey="AIzaSyCblvtXfclRYLUxb7W-rRGhnTLysrht_Ws"
         />
      </ViewBox>
   );
};

export default GeoAcquisition;

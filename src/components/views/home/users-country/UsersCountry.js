import React from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import styles from "./UsersCountry.module.css";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { HOME_USERS_COUNTRY_BAR_PART, HOME_USERS_COUNTRY_GEO_MAP_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import GeoChart from "../../common/geo-chart/GeoChart";

const UsersCountry = (props) => {
   const { data, loading, error, dispatchInterval } = props;
   const chartPartData = getResultByPartId(HOME_USERS_COUNTRY_BAR_PART, data);
   const geoPartData = getResultByPartId(HOME_USERS_COUNTRY_GEO_MAP_PART, data);

   const chartData = chartPartData
      ? chartPartData.data.map((row) => {
           return {
              country: row.dimensionValues[0],
              count: row.metricValues[0],
           };
        })
      : [];

   let geoData = [["Country", "Popularity"]];
   if (geoPartData) {
      for (let row of geoPartData.data) {
         geoData.push([row.dimensionValues[0], row.metricValues[0]]);
      }
   }

   return (
      <ViewBox headerTitle="User Country">
         <div className={styles.content}>
            <div className={styles.geoGraphHolder}>
               <GeoChart
                  geoData={geoData}
                  height="300px"
                  //mapsApiKey="AIzaSyCblvtXfclRYLUxb7W-rRGhnTLysrht_Ws"
               />
            </div>
            <div className={styles.barChartHolder}>
               <BarChart
                  barSize={14}
                  layout="vertical"
                  width={250}
                  height={200}
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
               >
                  <XAxis type="number" tick={{ fill: "#aaa", fontSize: "8pt" }} stroke="#aaa" />
                  <YAxis
                     type="category"
                     dataKey="country"
                     orientation="left"
                     tick={{ fill: "#aaa", fontSize: "8pt" }}
                     axisLine={false}
                  />
                  <Tooltip cursor={false} />
                  <Bar dataKey="count" fill="#4285F4" />
               </BarChart>
            </div>
         </div>
      </ViewBox>
   );
};

export default UsersCountry;

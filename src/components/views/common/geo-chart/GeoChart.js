import React from "react";
import { Chart } from "react-google-charts";

const GeoChart = (props) => {
   const geoData = props.geoData;
   const height = props.height;

   return (
      <Chart
         chartEvents={[
            {
               eventName: "select",
               callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = geoData[selection[0].row + 1];
                  console.log(region);
               },
            },
         ]}
         chartType="GeoChart"
         width="100%"
         height={height}
         data={geoData}
         options={{
            colorAxis: { colors: ["#e6f2ff", "#007BFF"] },
            datalessRegionColor: "#fcfcfc",
            defaultColor: "#f9f9f9",
         }}
         //mapsApiKey="AIzaSyCblvtXfclRYLUxb7W-rRGhnTLysrht_Ws"
      />
   );
};

export default GeoChart;

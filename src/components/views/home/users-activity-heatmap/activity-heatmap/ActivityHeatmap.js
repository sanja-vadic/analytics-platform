import React, { useEffect } from "react";
import { Chart } from "@antv/g2";

const ActivityHeatmap = ({data, xArray, yArray, containerId}) => {
   
   const chartConfig = {
      container: containerId,
      autoFit: true,
      height: 380,
      padding: [10, 40, 60, 10],
   };
   const chartScale = {
      y: yArray,
      x: xArray,
   };

   useEffect(() => {
      createGraph(containerId, data, chartConfig, chartScale);
   }, [data, containerId]);
   return <div id={containerId}></div>;
};

function createGraph(containerId, data, chartConfig, chartScale) {
   document.getElementById(containerId).innerHTML = ""; // hack
   const source = data.map((arr) => {
      return {
         y: arr[0],
         x: arr[1],
         total: arr[2],
      };
   });

   const chart = new Chart(chartConfig);

   chart.data(source);

   chart.scale("y", {
      type: "cat",
      values: chartScale.y,
   });
   chart.scale("x", {
      type: "cat",
      values: chartScale.x,
   });
   chart.scale("total", {
      nice: true,
   });

   chart.axis("y", {
      position: "right",
      tickLine: null,
      grid: {
         alignTick: false,
         line: {
            style: {
               lineWidth: 1,
               lineDash: null,
               stroke: "#f0f0f0",
            },
         },
      },
   });

   chart.axis("x", {
      title: null,
      grid: {
         alignTick: false,
         line: {
            style: {
               lineWidth: 1,
               lineDash: null,
               stroke: "#f0f0f0",
            },
         },
      },
   });

   chart.tooltip({
      showMarkers: false,
   });

   chart.polygon().position("x*y").color("total", "#BAE7FF-#1890FF-#0050B3").style({
      lineWidth: 1,
      stroke: "#fff",
   });

   chart.interaction("element-active");

   chart.render();
}
export default ActivityHeatmap;

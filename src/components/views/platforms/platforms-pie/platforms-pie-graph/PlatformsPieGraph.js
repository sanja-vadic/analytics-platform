import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
import React, { useEffect } from "react";

const PlatformsPieGraph = (props) => {
   const dataPie = [
      { name: "Windows", type: "PC", value: 15 },
      { name: "Linux", type: "PC", value: 54 },
      { name: "MAC", type: "PC", value: 25 },

      { name: "Android", type: "Tablet", value: 5 },
      { name: "IOS", type: "Tablet", value: 58 },
      { name: "Windows", type: "Tablet", value: 15 },

      { name: "Android", type: "TV", value: 75 },
      { name: "Nesto", type: "TV", value: 53 },

      { name: "Android", type: "Mobile", value: 51 },
      { name: "IOS", type: "Mobile", value: 35 },

      // { name: "Da li postoji", type: "EReaders", value: 51 },

      // { name: "Linux 1", type: "GameC", value: 15 },
   ];

   const colorMap = {
      PC: "#0D59B7",
      Tablet: "#71C3FF",
      TV: "#4AADFF",
      Mobile: "#2496FF",
      EReaders: "#0D59B7",
      GameC: "#166FD0",
   };

   const transformShapes = {
      nameDimensions: {
         type: "percent",
         field: "value",
         dimension: "type",
         as: "percent",
      },
      typeDimensions: {
         type: "percent",
         field: "value",
         dimension: "name",
         as: "percent",
      },
   };

   const containerId = "platformsPieContainerId";

   const chartConfig = {
      container: containerId,
      autoFit: true,
      height: 440,
   };

   useEffect(() => {
      createPie(containerId, dataPie, colorMap, transformShapes, chartConfig);
   }, [dataPie, containerId]);
   return <div id={containerId}></div>;
};

function createPie(containerId, dataPie, colorMap, transformShapes, chartConfig) {
   document.getElementById(containerId).innerHTML = ""; // hack

   const ds = new DataSet();
   const dv = ds.createView();
   dv.source(dataPie).transform(transformShapes.nameDimensions);

   const chart = new Chart(chartConfig);
   chart.data(dv.rows);
   chart.legend(false);
   chart.coordinate("theta", {
      radius: 0.5,
      innerRadius: 0.3,
   });
   chart.tooltip({
      showMarkers: false,
   });
   chart
      .interval()
      .adjust("stack")
      .position("percent")
      .color("type", (val) => colorMap[val])
      .style({
         stroke: "white",
         lineWidth: 1,
      })
      .label("type", {
         offset: -5,
         style: {
            fill: "white",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
         },
      });

   const ds2 = new DataSet();
   const dv2 = ds2.createView();
   dv2.source(dataPie).transform(transformShapes.typeDimensions);
   const outterView = chart.createView();
   outterView.data(dv2.rows);
   outterView.coordinate("theta", {
      innerRadius: 0.5 / 0.8,
      radius: 0.8,
   });
   outterView
      .interval()
      .adjust("stack")
      .position("percent")
      .color("type*name", (type, name) => colorMap[type])
      .style({
         stroke: "white",
         lineWidth: 1,
      })
      .label("name", {
         offset: -10,
         style: {
            fill: "white",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
         },
      });

   chart.interaction("element-active");
   chart.render();
}

export default PlatformsPieGraph;

import React, { useEffect } from "react";
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
const { DataView } = DataSet;

const FunnelGraph = ({data, containerId, sum}) => {
   const chartConfig = {
      container: containerId,
      autoFit: true,
      height: 340,
      padding: [20, 10, 30, 10],
   };

   useEffect(() => {
      createFunnel(containerId, data, chartConfig, sum);
   }, [data, containerId]);
   return <div id={containerId}></div>;
};

function createFunnel(containerId, funnelData, chartConfig, sum) {
   document.getElementById(containerId).innerHTML = ""; // hack
   const dv = new DataView().source(funnelData);
   dv.transform({
      type: "map",
      callback(row) {
         row.percent = Math.round((row.pv / sum) * 100) / 100; //sabrati sve metrike
         return row;
      },
   });
   const data = dv.rows;
   const chart = new Chart(chartConfig);
   chart.data(data);
   chart.axis(false);
   chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl:
         '<li style="margin-bottom:4px;list-style-type:none;padding: 0;">' +
         '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
         "{name}<br/>" +
         '<span style="padding-left: 16px;line-height: 16px;">total：{pv}</span><br/>' +
         '<span style="padding-left: 16px;line-height: 16px;">percentage：{percent}</span><br/>' +
         "</li>",
   });
   chart.coordinate("rect").transpose().scale(1, -1);
   chart
      .interval()
      .adjust("symmetric")
      .position("action*percent")
      .shape("funnel")
      .color("action", ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"])
      .tooltip("action*pv*percent", (action, pv, percent) => {
         return {
            name: action,
            percent: +percent * 100 + "%",
            pv,
         };
      })
      .animate({
         appear: {
            animation: "fade-in",
         },
         update: {
            annotation: "fade-in",
         },
      });

   chart.interaction("element-active");

   chart.on("beforepaint", () => {
      chart.annotation().clear(true);
      const chartData = chart.getData();
      chartData.forEach((obj) => {
         chart.annotation().text({
            top: true,
            position: {
               action: obj.action,
               percent: "median",
            },
            content: +obj.percent * 100 + "%",
            style: {
               stroke: null,
               fill: "#fff",
               textAlign: "center",
            },
         });
      });
   });

   chart.render();
}
export default FunnelGraph;

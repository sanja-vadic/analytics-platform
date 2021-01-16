import { Chart } from "@antv/g2";
import React, { useEffect } from "react";

const DonutChart = (props) => {
   const data = props.data;
   const containerId = props.containerId;
   const chartConfig = {
      container: containerId,
      autoFit: true,
      height: 300,
      width: 290,
   };

   useEffect(() => {
      createDonut(data, chartConfig);
   }, [data, containerId]);
   return <div id={containerId}></div>;
};

function createDonut(data, chartConfig) {
   const chart = new Chart(chartConfig);
   chart.data(data);
   chart.scale("percent", {
      formatter: (val) => {
         val = val * 100 + "%";
         return val;
      },
   });
   chart.coordinate("theta", {
      radius: 0.75,
      innerRadius: 0.6,
   });
   chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl:
         '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
   });
   // 辅助文本
   chart
      .annotation()
      .text({
         position: ["50%", "50%"],
         content: "主机",
         style: {
            fontSize: 14,
            fill: "#8c8c8c",
            textAlign: "center",
         },
         offsetY: -20,
      })
      .text({
         position: ["50%", "50%"],
         content: "200",
         style: {
            fontSize: 20,
            fill: "#8c8c8c",
            textAlign: "center",
         },
         offsetX: -10,
         offsetY: 20,
      })
      .text({
         position: ["50%", "50%"],
         content: "台",
         style: {
            fontSize: 14,
            fill: "#8c8c8c",
            textAlign: "center",
         },
         offsetY: 20,
         offsetX: 20,
      });
   chart
      .interval()
      .adjust("stack")
      .position("percent")
      .color("item")
      .label("percent", (percent) => {
         return {
            content: (data) => {
               return `${data.item}: ${percent * 100}%`;
            },
         };
      })
      .tooltip("item*percent", (item, percent) => {
         percent = percent * 100 + "%";
         return {
            name: item,
            value: percent,
         };
      });

   chart.interaction("element-active");

   chart.render();
}
export default DonutChart;

import React, { useEffect } from "react";
import { Chart, registerShape } from "@antv/g2";

const GaugeGraph = ({ dataGauge, containerId }) => {
   const chartConfig = {
      container: containerId,
      autoFit: true,
      height: 320,
      width: 320,
      padding: [0, 0, 30, 0],
   };
   useEffect(() => {
      createGauge(dataGauge, chartConfig);
   }, [dataGauge, containerId]);
   return <div id={containerId}></div>;
};

function createGauge(dataGauge, chartConfig) {
   registerShape("point", "pointer", {
      draw(cfg, container) {
         const group = container.addGroup();
         const center = this.parsePoint({ x: 0, y: 0 });
         group.addShape("line", {
            attrs: {
               x1: center.x,
               y1: center.y,
               x2: cfg.x,
               y2: cfg.y,
               stroke: cfg.color,
               lineWidth: 5,
               lineCap: "round",
            },
         });
         group.addShape("circle", {
            attrs: {
               x: center.x,
               y: center.y,
               r: 9.75,
               stroke: cfg.color,
               lineWidth: 4.5,
               fill: "#fff",
            },
         });

         return group;
      },
   });

   const chart = new Chart(chartConfig);
   chart.data(dataGauge.data);

   const tickDivider = 7;
   const tickInterval = Math.ceil(dataGauge.max / tickDivider);
   chart.scale("value", {
      min: dataGauge.min,
      max: tickInterval * tickDivider,
      tickInterval: tickInterval,
   });
   chart.coordinate("polar", {
      startAngle: (-9 / 8) * Math.PI,
      endAngle: (1 / 8) * Math.PI,
      radius: 0.75,
   });

   chart.axis("1", false);
   chart.axis("value", {
      line: null,
      label: {
         offset: -36,
         style: {
            fontSize: 18,
            textAlign: "center",
            textBaseline: "middle",
         },
      },
      subTickLine: {
         count: 4,
         length: -15,
      },
      tickLine: {
         length: -24,
      },
      grid: null,
   });
   chart.legend(false);
   chart
      .point()
      .position("value*1")
      .shape("pointer")
      .color("#1890FF")
      .animate({
         appear: {
            animation: "fade-in",
         },
      });

   chart.annotation().arc({
      top: false,
      start: [0, 1],
      end: [9, 1],
      style: {
         stroke: "#CBCBCB",
         lineWidth: 18,
         lineDash: null,
      },
   });

   chart.annotation().arc({
      start: [0, 1],
      end: [dataGauge.data[0].value, 1],
      style: {
         stroke:
            dataGauge.data[0].value < 1000
               ? dataGauge.content === "ucitavanje"
                  ? "#85C871"
                  : "#1890FF"
               : dataGauge.content === "zadrzavanje"
               ? "#85C871"
               : "#1890FF",
         lineWidth: 18,
         lineDash: null,
      },
   });
   chart.annotation().text({
      position: ["50%", "85%"],
      content: dataGauge.content,
      style: {
         fontSize: 20,
         fill: "#545454",
         textAlign: "center",
      },
   });
   chart.annotation().text({
      position: ["50%", "90%"],
      content: `${dataGauge.data[0].value}`,
      style: {
         fontSize: 36,
         fill: "#545454",
         textAlign: "center",
      },
      offsetY: 15,
   });

   chart.render();
}

export default GaugeGraph;

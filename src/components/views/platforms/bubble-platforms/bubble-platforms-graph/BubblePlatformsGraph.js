import React, { useEffect } from "react";
import { Chart, registerShape } from "@antv/g2";

const BubblePlatformsGraph = ({data, containerId}) => {
   
   const imageMap = {
      "Internet Explorer": "https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png",
      Chrome: "https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png",
      Firefox: "https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png",
      Safari: "https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png",
      Opera: "https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png",
      Undetectable: "https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png",
   };
  
   useEffect(() => {
      createBubble(containerId, data, imageMap);
   }, [data, containerId]);
   return <div id={containerId}></div>;
};

function createBubble(containerId, data, imageMap) {
   document.getElementById(containerId).innerHTML = ""; // hack

   registerShape("point", "image", {
      draw(cfg, container) {
         cfg.points = this.parsePoints(cfg.points);
         const coord = this.coordinate;
         container.addShape("line", {
            attrs: {
               x1: cfg.points[0].x,
               y1: cfg.points[0].y,
               x2: cfg.points[0].x,
               y2: coord.start.y,
               stroke: "#ccc",
               lineWidth: 1,
               lineDash: [4, 2],
            },
         });
         return container.addShape("image", {
            attrs: {
               x: cfg.points[0].x - (12 * cfg.size) / 2,
               y: cfg.points[0].y - 12 * cfg.size,
               width: 12 * cfg.size,
               height: 12 * cfg.size,
               img: cfg.shape[1],
            },
         });
      },
   });

   const chart = new Chart({
      container: containerId,
      autoFit: true,
      height: 400,
   });
   chart.data(data);
   chart.scale("value", {
      nice: false,
      max: Math.max(...data.map(o => o.value)) + 120,
      min: 0,
   });
   chart.legend(false);
   chart.axis("value", false);
   chart.tooltip({
      showMarkers: false,
   });
   chart
      .point()
      .position("name*value")
      .size("value")
      .color("name")
      .shape("name", (name) => {
         return ["image", imageMap[name]];
      })
      .label("value", {
         offset: -20,
         style: {
            fontSize: 16,
         },
      });
   chart.render();
}

export default BubblePlatformsGraph;

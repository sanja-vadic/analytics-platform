import { Chart, registerShape } from "@antv/g2";
import React, { useEffect } from "react";

const FacetGraph = (props) => {
   const data = [
      { type: "ucitavanje", value: 1123 },
      { type: "zadrzavanje", value: 400 },
      { type: "csite", value: 1999 },
      { type: "dsite", value: 50 },
      { type: "esite", value: 100 },
   ];
   const containerId = "facetContainerId";

   const chartConfig = {
      container: containerId,
      autoFit: true,
      height: 200,
   };

   const percentageStyle = {
      fontSize: 20,
      fill: "#000",
      fontWeight: 500,
      textAlign: "center",
   };

   const descriptionStyle = {
      fontSize: 14,
      fill: "#8c8c8c",
      fontWeight: 300,
      textAlign: "center",
   };

   useEffect(() => {
      createFunnel(data, chartConfig, percentageStyle, descriptionStyle);
   }, [data, containerId]);
   return <div id={containerId}></div>;
};

function createFunnel(data, chartConfig, percentageStyle, descriptionStyle) {
   registerShape("point", "pointer", {
      draw(cfg, group) {
         const point = cfg.points[0];
         const center = this.parsePoint({ x: 0, y: 0 });
         const target = this.parsePoint({ x: point.x, y: 0.9 });
         const dir_vec = { x: center.x - target.x, y: center.y - target.y };
         // normalize
         const length = Math.sqrt(dir_vec.x * dir_vec.x + dir_vec.y * dir_vec.y);
         dir_vec.x *= 1 / length;
         dir_vec.y *= 1 / length;
         // rotate dir_vector by -90 and scale
         const angle1 = -Math.PI / 2;
         const x_1 = Math.cos(angle1) * dir_vec.x - Math.sin(angle1) * dir_vec.y;
         const y_1 = Math.sin(angle1) * dir_vec.x + Math.cos(angle1) * dir_vec.y;
         // rotate dir_vector by 90 and scale
         const angle2 = Math.PI / 2;
         const x_2 = Math.cos(angle2) * dir_vec.x - Math.sin(angle2) * dir_vec.y;
         const y_2 = Math.sin(angle2) * dir_vec.x + Math.cos(angle2) * dir_vec.y;
         // polygon vertex
         const path = [
            ["M", target.x + x_1 * 1, target.y + y_1 * 1],
            ["L", center.x + x_1 * 3, center.y + y_1 * 3],
            ["L", center.x + x_2 * 3, center.y + y_2 * 3],
            ["L", target.x + x_2 * 1, target.y + y_2 * 1],
            ["Z"],
         ];
         const tick = group.addShape("path", {
            attrs: {
               path,
               fill: cfg.color,
            },
         });
         return tick;
      },
   });

   const chart = new Chart(chartConfig);
   chart.data(data);
   chart.coordinate("polar", {
      startAngle: (-10 / 8) * Math.PI,
      endAngle: (2 / 8) * Math.PI,
      radius: 0.75,
   });
   chart.scale("value", {
      min: 0,
      max: 2000,
      tickInterval: 2000,
   });
   chart.axis(false);
   chart.facet("rect", {
      fields: ["type"],
      showTitle: false,
      eachView: function eachView(view, facet) {
         const data = facet.data[0];
         // Pointer
         view
            .point()
            .position("value*1")
            .shape("pointer")
            .color("#d8d8d8")
            .animate({
               appear: {
                  animation: "fade-in",
               },
            });
         // Dashboard background
         view.annotation().arc({
            top: false,
            start: [0, 2000],
            end: [2000, 2000],
            style: {
               stroke: "#ebedf0", //boji ostatak, nepopunjeno
               lineWidth: 10,
            },
         });
         // Dashboard outlook
         view.annotation().arc({
            start: [0, 2000],
            end: [data.value, 2000],
            style: {
               stroke: data.value < 1000 ? "#1890ff" : "#F77D08",
               lineWidth: 10,
            },
         });
         // Dashboard information
         const percent = parseInt(data.value);

         view.annotation().text({
            position: ["50%", "70%"],
            content: data.type,
            style: descriptionStyle,
            offsetX: 0,
         });
         view.annotation().text({
            position: ["50%", "75%"],
            // content: `${percent}%`,
            content: `${percent}`,
            style: percentageStyle,
            offsetX: 0,
            offsetY: 10,
         });
      },
   });
   chart.render();
}

export default FacetGraph;

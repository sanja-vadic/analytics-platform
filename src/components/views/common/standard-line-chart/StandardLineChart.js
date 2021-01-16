import React from "react";
import { CartesianGrid, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const StandardLineChart = ({ graphData, children, width = 650, height = 300 }) => {
   return (
      <LineChart
         width={width}
         height={height}
         data={graphData}
         margin={{
            top: 15,
            right: 0,
            left: 10,
            bottom: 5,
         }}
      >
         <CartesianGrid strokeDasharray="1 1" vertical={false} />
         <XAxis dataKey="date" tick={{ fill: "#aaa" }} stroke="#aaa" />
         <YAxis orientation="right" axisLine={false} tick={{ fill: "#aaa" }} />
         <Tooltip />
         {children}
      </LineChart>
   );
};

export default StandardLineChart;

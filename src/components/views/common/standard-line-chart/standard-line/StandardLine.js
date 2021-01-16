import React from "react";
import { Line } from "recharts";

const StandardLine = ({ dataKey, strokeColor = "#1890FF" }) => {
   console.log("dataKey, strokeColor:", dataKey, strokeColor);
   return <Line type="monotone" dataKey={dataKey} stroke={strokeColor} strokeWidth="2" activeDot={{ r: 8 }} />;
};

export default StandardLine;

import React from "react";
import { Chart } from "react-google-charts";
import ViewBox from "../../../view-box/ViewBox";
import { HORIZONTAL_VIEW_BOX } from "../../../../constants/constants";

const PlatformsTreemap = (props) => {
   const dataTreeMap = [
      ["Location", "Parent", "Market trade volume (size)", "Market increase/decrease (color)"],
      ["Global", null, 0, 0],
      ["PC", "Global", 0, 0],
      ["Tablet", "Global", 0, 0],
      ["Mobile", "Global", 0, 0],
      ["TV", "Global", 0, 0],
      ["EReaders", "Global", 0, 0],
      ["GameC", "Global", 0, 0],

      ["Microsoft Windows", "PC", 11, 10],
      ["Apple macOS", "PC", 52, 31],
      ["Linux", "PC", 24, 12],
      ["Apples iOS", "PC", 16, -23],

      ["Windows 10", "Microsoft Windows", 16, -23],
      ["Windows 8", "Microsoft Windows", 16, -23],
      ["Windows 7", "Microsoft Windows", 16, -23],
      ["Windows XP", "Microsoft Windows", 16, -23],

      ["MX Linux", "Linux", 16, -23],
      ["Manjaro", "Linux", 16, -23],
      ["Linux Mint", "Linux", 16, -23],
      ["Ubuntu", "Linux", 16, -23],

      ["Android", "Tablet", 42, -11],
      ["IOS", "Tablet", 31, -2],
      ["Windows", "Tablet", 22, -13],
      ["Italy", "Tablet", 17, 4],
      ["UK", "Tablet", 21, -5],

      ["Android OS", "Mobile", 36, 4],
      ["Apple iOS", "Mobile", 20, -12],
      ["Symbian ", "Mobile", 40, 63],
      ["Windows Phone Operating System", "Mobile", 4, 34],
      ["verzija 1", "Android OS", 4, 34],
      ["verzija 2", "Android OS", 4, 34],
      // ['Mongolia', 'Mobile', 1, -5],
      // ['Iran', 'Mobile', 18, 13],
      // ['Pakistan', 'Mobile', 11, -52],

      ["Egypt", "EReaders", 21, 0],
      ["S. EReaders", "EReaders", 30, 43],

      ["Sudan", "GameC", 12, 2],
      // ['Congo', 'GameC', 10, 12],
      // ['Zaire', 'GameC', 8, 10],
   ];
   return (
      <ViewBox type={HORIZONTAL_VIEW_BOX} footerVisible={false} headerTitle="Platforms Treemap">
         <Chart
            width={"100%"}
            height={"100%"}
            chartType="TreeMap"
            loader={<div>Loading Chart</div>}
            data={dataTreeMap}
            options={{
               minColor: "#D3E8FF",
               midColor: "#73B6FF",
               maxColor: "#0D59B7",
               headerHeight: 25,
               fontColor: "white",
               showScale: true,
               // generateTooltip: (row, size, value) => {
               //     return (
               //       '<div style="background:#fd9; padding:10px; border-style:solid"> ' +
               //       value +
               //       '</div>'
               //     )
               //   }, //cudni brojevi, ne kontam sta je value
            }}
            rootProps={{ "data-testid": "1" }}
         />
      </ViewBox>
   );
};

export default PlatformsTreemap;

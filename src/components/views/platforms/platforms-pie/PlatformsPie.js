import React from "react";
import { HORIZONTAL_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import PlatformsPieGraph from "./platforms-pie-graph/PlatformsPieGraph";

const PlatformsPie = (props) => {
   return (
      <ViewBox type={HORIZONTAL_VIEW_BOX} footerVisible={false} headerTitle="Platforms pie">
         <PlatformsPieGraph></PlatformsPieGraph>
      </ViewBox>
   );
};

export default PlatformsPie;

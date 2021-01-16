import React from "react";
import { HORIZONTAL_LARGE_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import FacetGraph from "../facet-graph/FacetGraph";

const VisitsFacet = () => {
   return (
      <ViewBox type={HORIZONTAL_LARGE_VIEW_BOX}>
         <FacetGraph></FacetGraph>
      </ViewBox>
   );
};

export default VisitsFacet;

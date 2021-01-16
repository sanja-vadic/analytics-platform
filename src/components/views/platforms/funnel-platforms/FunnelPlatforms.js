import React, { useEffect, useState } from "react";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { PLATFORM_FUNNEL_PART, VERTICAL_VIEW_BOX } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import FunnelGraph from "../../common/funnel-graph/FunnelGraph";

const FunnelPlatforms = ({data, loading, error}) => {
   const [funnelData, setFunnelData] = useState([]);
   const [sum, setSum] = useState(0);

   useEffect(() => {
      const funnelPart = getResultByPartId(PLATFORM_FUNNEL_PART, data);

      let counter = 0;
      let funnelData = funnelPart
         ? funnelPart.data.map((row) => {
              counter += sum + row.metricValues[0];
              return { action: row.dimensionValues[0], pv: row.metricValues[0] };
           })
         : [];
      setSum(counter);
      funnelData.sort((a, b) => b.pv - a.pv);
      setFunnelData(funnelData);
   }, [data]);

   const containerId = "funnelPlatformsContainerId";

   return (
      <ViewBox type={VERTICAL_VIEW_BOX} footerVisible={false} headerTitle="Funnel Platforms" loading={loading}>
         <FunnelGraph data={funnelData} containerId={containerId} sum={sum}></FunnelGraph>
      </ViewBox>
   );
};

export default FunnelPlatforms;

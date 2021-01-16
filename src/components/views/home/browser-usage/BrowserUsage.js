import React, { useEffect, useState } from "react";
import { getResultByPartId } from "../../../../common/graph-util/viewUtil";
import { VERTICAL_VIEW_BOX, HOME_BROWSER_USAGE_FUNNEL_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import FunnelGraph from "../../common/funnel-graph/FunnelGraph";
import styles from "./BrowserUsage.module.css";

const BrowserUsage = ({ data, loading, error }) => {
   const [dataFunnel, setDataFunnel] = useState([]);
   const [sum, setSum] = useState(0);

   useEffect(() => {
      const funnelPart = getResultByPartId(HOME_BROWSER_USAGE_FUNNEL_PART, data);
      let counter = 0;
      let graphData = funnelPart
         ? funnelPart.data.map((row) => {
              counter += sum + row.metricValues[0];
              return { action: row.dimensionValues[0], pv: row.metricValues[0] };
           })
         : [];
      setSum(counter);
      graphData.sort((a, b) => b.pv - a.pv);
      setDataFunnel(graphData);
   }, [data]);

   const containerId = "browserFunnelContainerId";

   return (
      <ViewBox type={VERTICAL_VIEW_BOX} headerTitle="Browser Usage" loading={loading}>
         <FunnelGraph data={dataFunnel} containerId={containerId} sum={sum}></FunnelGraph>
      </ViewBox>
   );
};

export default BrowserUsage;

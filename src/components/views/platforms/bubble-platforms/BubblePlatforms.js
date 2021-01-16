import React, { useEffect, useState } from "react";
import { HORIZONTAL_VIEW_BOX, PLATFORM_BUBBLE_GRAPH_PART } from "../../../../constants/constants";
import ViewBox from "../../../view-box/ViewBox";
import BubblePlatformsGraph from "./bubble-platforms-graph/BubblePlatformsGraph";
import {getResultByPartId} from '../../../../common/graph-util/viewUtil';

const BubblePlatforms = ({data, loading, error}) => {
   const [graphData, setGraphData] = useState([]);

   useEffect(() => {
      const bubblePart = getResultByPartId(PLATFORM_BUBBLE_GRAPH_PART, data);
      const mappedData = bubblePart ? bubblePart.data.map(item => ({
         name: item.dimensionValues[0],
         value: item.metricValues[0]
      })) : [];
      setGraphData(mappedData);
   }, [data]);

   const containerId = "bubbleContainerId";

   return (
      <ViewBox type={HORIZONTAL_VIEW_BOX} footerVisible={false} headerTitle="Bubble Platforms" loading={loading}>
         <BubblePlatformsGraph data={graphData} containerId={containerId}></BubblePlatformsGraph>
      </ViewBox>
   );
};

export default BubblePlatforms;

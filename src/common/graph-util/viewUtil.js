export function getResultByPartId(partId, results) {
  if (!results) return; 
  console.log("results: ", results);
  console.log("partId: ", partId);
  let result = results.filter(result => result.part === partId)[0];
  return result;
}

export function getSingleValue(partData) {
  if (!partData) return "";
  return getMetricSingleValues(partData, 0, 0)[0];
}

export function getMetricSingleValues(partData, startIndex = 0, endIndex) {
  if (!partData) return [];
  endIndex = endIndex ? endIndex : partData.data.length - 1;

  let values = [];
  for (let i = startIndex; i <= endIndex; ++i) {
    values.push(partData.data[0].metricValues[i]);
  }

  return values;
}
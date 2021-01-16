import axios from "axios";
import { RequestBuilder } from "../../../../common/graph-util/request/RequestBuilder";
import { RequestPartBuilder } from "../../../../common/graph-util/request/RequestPartBuilder";

export async function fetchData(datetimeFrom, datetimeTo, extra) {
   let requestData = createRequest(datetimeFrom, datetimeTo, extra); // Send in POST request
   var random_boolean = Math.random() >= 0.5;
   let apiResponse;
   // await new Promise(r => setTimeout(r, 2000));
   if (random_boolean) {
      apiResponse = await axios.get("https://run.mocky.io/v3/b4a82fc6-cfa1-47ad-b06d-13c1d3587480");
   } else {
      apiResponse = await axios.get("https://run.mocky.io/v3/b4a82fc6-cfa1-47ad-b06d-13c1d3587480");
   }
   return apiResponse;
}

//TO DO
function createRequest(datetimeFrom, datetimeTo, extra) {
   let partOne = new RequestPartBuilder("part_one")
      .withDateStart(datetimeFrom)
      .withDateEnd(datetimeTo)
      .withMetric("total_visitors")
      .build();

   let partTwo = new RequestPartBuilder("part_two")
      .withDateStart(datetimeFrom)
      .withDateEnd(datetimeTo)
      .withDimension("days")
      .withMetric("total_visitors")
      .build();

   let request = new RequestBuilder("active_users_view").withRequestPart(partOne).withRequestPart(partTwo).build();

   return request;
}

import axios from "axios";
import { RequestBuilder } from "../../../../common/graph-util/request/RequestBuilder";
import { RequestPartBuilder } from "../../../../common/graph-util/request/RequestPartBuilder";

export async function fetchData(datetimeFrom, datetimeTo, extra) {
   let requestData = createRequest(datetimeFrom, datetimeTo, extra); // Send in POST request
   var random_boolean = Math.random() >= 0.5;
   let apiResponse;
   // await new Promise(r => setTimeout(r, 2000));
   if (random_boolean) {
      apiResponse = await axios.get("https://run.mocky.io/v3/4ffc144b-481b-49f3-9e2d-81e69091108b");
   } else {
      apiResponse = await axios.get("https://run.mocky.io/v3/4ffc144b-481b-49f3-9e2d-81e69091108b");
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

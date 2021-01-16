import axios from "axios";
import { RequestBuilder } from "../../../../common/graph-util/request/RequestBuilder";
import { RequestPartBuilder } from "../../../../common/graph-util/request/RequestPartBuilder";
import {
   DIMENSION_DAYS,
   HOME_USERS_SITE_AREA_PART,
   HOME_USERS_SITE_METRIC_PART,
   HOME_USERS_SITE_VIEW,
   TOTAL_VISITORS,
} from "../../../../constants/constants";

export async function fetchData(datetimeFrom, datetimeTo, extra) {
   let requestData = createRequest(datetimeFrom, datetimeTo, extra); // Send in POST request
   var random_boolean = Math.random() >= 0.5;
   let apiResponse;
   // await new Promise(r => setTimeout(r, 2000));
   if (random_boolean) {
      apiResponse = await axios.get("https://run.mocky.io/v3/a5983286-56bd-4ef7-bfa9-1e612bdf0002");
   } else {
      apiResponse = await axios.get("https://run.mocky.io/v3/b892e685-d94a-46e3-a653-bfd4c1a75611");
   }
   return apiResponse;
}

//TO DO
function createRequest(datetimeFrom, datetimeTo, extra) {
   let partOne = new RequestPartBuilder(HOME_USERS_SITE_METRIC_PART)
      .withDateStart(datetimeFrom)
      .withDateEnd(datetimeTo)
      .withMetric(TOTAL_VISITORS)
      .build();

   let partTwo = new RequestPartBuilder(HOME_USERS_SITE_AREA_PART)
      .withDateStart(datetimeFrom)
      .withDateEnd(datetimeTo)
      .withDimension(DIMENSION_DAYS)
      .withMetric(TOTAL_VISITORS)
      .build();

   let request = new RequestBuilder(HOME_USERS_SITE_VIEW).withRequestPart(partOne).withRequestPart(partTwo).build();

   return request;
}

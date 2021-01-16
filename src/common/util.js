import { ABSOLUTE_RANGE, RELATIVE_RANGE, TODAY, CUSTOM, DAY, YEAR, MONTH, MINUTE, HOUR } from "../constants/constants";
import moment from "moment";

export function generatePayloadByTimeInterval(timeInterval) {
   let payload = {};
   switch (timeInterval) {
      case CUSTOM:
         payload.custom = true;
         payload.type = ABSOLUTE_RANGE;
         break;
      case TODAY:
         payload.custom = false;
         payload.type = ABSOLUTE_RANGE;
         let startDateTime = new Date();
         startDateTime.setHours(0, 0, 0, 0);
         let endDateTime = new Date();
         endDateTime.setHours(23, 59, 59, 999);
         payload.dateFrom = jsdateToDatetime(startDateTime);
         payload.dateTo = jsdateToDatetime(endDateTime);
         break;
      default:
         let intervalParts = timeInterval.split("_");
         payload.custom = false;
         payload.type = RELATIVE_RANGE;
         payload.last = intervalParts[1];
         payload.dateTo = jsdateToDatetime(new Date());
         if (intervalParts[2].startsWith(YEAR)) {
            payload.unit = YEAR;
            payload.dateFrom = jsdateToDatetime(subYears(new Date(), +payload.last));
         } else if (intervalParts[2].startsWith(MONTH)) {
            payload.unit = MONTH;
            payload.dateFrom = jsdateToDatetime(subMonths(new Date(), +payload.last));
         } else if (intervalParts[2].startsWith(DAY)) {
            payload.unit = DAY;
            payload.dateFrom = jsdateToDatetime(subDays(new Date(), +payload.last));
         } else if (intervalParts[2].startsWith(HOUR)) {
            payload.unit = HOUR;
            payload.dateFrom = jsdateToDatetime(subHours(new Date(), +payload.last));
         } else if (intervalParts[2].startsWith(MINUTE)) {
            payload.unit = MINUTE;
            payload.dateFrom = jsdateToDatetime(subMinutes(new Date(), +payload.last));
         }
         break;
   }
   return payload;
}

export function jsdateToDatetime(jsdate) {
   return jsdate.toISOString();
}

export function addYears(jsdate, years) {
   return addMonths(jsdate, 12 * +years);
}

export function subYears(jsdate, years) {
   return addYears(jsdate, -years);
}

export function addMonths(jsdate, months) {
   jsdate.setMonth(jsdate.getMonth() + +months);
   return jsdate;
}

export function subMonths(jsdate, months) {
   return addMonths(jsdate, -months);
}

export function addDays(jsdate, days) {
   jsdate.setDate(jsdate.getDate() + days);
   return jsdate;
}

export function subDays(jsdate, days) {
   return addDays(jsdate, -days);
}

export function addHours(jsdate, hours) {
   jsdate = moment(jsdate)
      .add(+hours, "h")
      .toDate();
   return jsdate;
}

export function subHours(jsdate, hours) {
   return addHours(jsdate, -hours);
}

export function addMinutes(jsdate, minutes) {
   jsdate = moment(jsdate)
      .add(+minutes, "m")
      .toDate();
   return jsdate;
}

export function subMinutes(jsdate, minutes) {
   return addMinutes(jsdate, -minutes);
}

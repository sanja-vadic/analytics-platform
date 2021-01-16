import React from "react";
import CompleteRangePicker from "../../components/interval/complete-range-picker/CompleteRangePicker";
import withGlobalInterval from "../../common/graph-util/hoc/interval/withGlobalInterval";
import withGroupInterval from "../../common/graph-util/hoc/interval/withGroupInterval";
import { ACQUISITION_DASHBOARD_ACTIVE_USERS_GROUP, LAST_90_DAYS } from "../../constants/constants";
import RelativeRangePicker from "../../components/interval/relative-range-picker/RelativeRangePicker";

function ContentHeader(props) {
   const CompleteRangePickerGlobal = withGlobalInterval(CompleteRangePicker);
   const CompleteRangePickerGroup = withGroupInterval(CompleteRangePicker, ACQUISITION_DASHBOARD_ACTIVE_USERS_GROUP);
   const RelativeRangePickerGlobal = withGlobalInterval(RelativeRangePicker);
   const RelativeRangePickerGroup = withGroupInterval(RelativeRangePicker, ACQUISITION_DASHBOARD_ACTIVE_USERS_GROUP);

   return (
      <>
         <CompleteRangePickerGlobal defaultValue={LAST_90_DAYS} />
         <CompleteRangePickerGroup />
         <RelativeRangePickerGlobal />
         <RelativeRangePickerGroup />
      </>
   );
}

export default ContentHeader;

import { configureStore } from "@reduxjs/toolkit";
import loginPageReducer from "../features/login/loginPageSlice";
import commonReducer from "../common/commonSlice";
import intervalReducer from "../common/intervalSlice";
import trackingCodeReducer from "../features/settings/tracking-code/trackingCodeSlice";

export default configureStore({
   reducer: {
      common: commonReducer,
      loginPage: loginPageReducer,
      intervals: intervalReducer,
      trackingCode: trackingCodeReducer,
   },
});

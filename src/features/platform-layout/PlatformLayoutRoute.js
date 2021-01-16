import React from "react";
import { Route } from "react-router-dom";
import PlatformLayout from "./PlatformLayout";

const PlatformLayoutRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) => (
            <PlatformLayout>
               <Component {...props} />
            </PlatformLayout>
         )}
      />
   );
};

export default PlatformLayoutRoute;

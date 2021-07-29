import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import AppRoutes from "./AppRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route path="*" component={AppRoutes} />
    </Switch>
  );
};

export default Routes;

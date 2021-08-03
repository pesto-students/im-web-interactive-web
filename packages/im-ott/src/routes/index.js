import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Login from "imcomponents/molecules/login";
import UserProvider from "imbase/providers/UserProvider";
import AppRoutes from "./AppRoutes";

const Routes = () => {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="*" component={AppRoutes} />
      </Switch>
    </UserProvider>
  );
};

export default Routes;

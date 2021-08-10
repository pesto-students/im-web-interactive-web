import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import UserProvider from "imbase/providers/UserProvider";
import AppRoutes from "./AppRoutes";
import Login from "../pages/login";

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

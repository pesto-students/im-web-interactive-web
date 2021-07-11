import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Register from "../pages/register";
import Login from "../pages/login";
import AppRoutes from "./AppRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="*" component={AppRoutes} />
    </Switch>
  );
};

export default Routes;

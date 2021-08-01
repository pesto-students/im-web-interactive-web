import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Logout from "../pages/logout";
import Login from "../pages/login";
import AppRoutes from "./AppRoutes";
import UserProvider from "../providers/UserProvider";

const Routes = () => {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route path="*" component={AppRoutes} />
      </Switch>
    </UserProvider>
  );
};

export default Routes;

import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Components
import AppLoader from "imcomponents/molecules/appLoader";
import AppSkeleton from "../organisms/appSkeleton";
import Dashboard from "../pages/dashboard";
import EditVideo from "../pages/editVideo";
import Upload from "../pages/upload";

const AppRoutes = () => {
  const [ loading, setLoading ] = useState(true);
  const [ loggedIn, setLoggedIn ] = useState(true); // TODO:  Set to false later

  useEffect(() => {
    setTimeout(() => {
      AppLoader.setVisibility(false);
      setLoading(false);
    }, 2000);
  });

  if (loading) {
    AppLoader.setVisibility(true);
    return null;
  }

  return (
    <AppSkeleton>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/video/:videoId/edit" component={EditVideo} />
      </Switch>
    </AppSkeleton>
  );
};

export default AppRoutes;

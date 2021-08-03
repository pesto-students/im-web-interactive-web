import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

// Components
import AppLoader from "imcomponents/molecules/appLoader";
import AppSkeleton from "../organisms/appSkeleton";
import LandingPage from "../pages/landingPage";

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/video/:videoId/edit" component={EditVideo} />
      </Switch>
    </AppSkeleton>
  );
};

export default AppRoutes;

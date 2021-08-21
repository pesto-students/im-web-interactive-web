import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Components
import MoviesList from "imcomponents/pages/moviesList/MoviesList";
import AppLoader from "imcomponents/molecules/appLoader";
import AppSkeleton from "../organisms/appSkeleton";
import Dashboard from "../pages/dashboard";
import EditVideo from "../pages/editVideo";
import PreviewVideo from "../pages/previewVideo";
import Upload from "../pages/upload";

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
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/movies/:movieCriteria" component={MoviesList} />
        <Route exact path="/video/:videoId/edit" component={EditVideo} />
        <Route exact path="/video/:videoId/preview" component={PreviewVideo} />
      </Switch>
    </AppSkeleton>
  );
};

export default AppRoutes;

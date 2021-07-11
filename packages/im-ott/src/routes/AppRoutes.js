import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import AppSkeleton from "../organisms/appSkeleton";
import WatchList from "../pages/watchList";
import FilmDetails from "../pages/filmDetails";
import LandingPage from "../pages/landingPage";

const AppRoutes = () => {
  return (
    <AppSkeleton>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/watchlist" component={WatchList} />
        <Route exact path="/film/:filmId" component={FilmDetails} />
      </Switch>
    </AppSkeleton>
  );
};

export default AppRoutes;

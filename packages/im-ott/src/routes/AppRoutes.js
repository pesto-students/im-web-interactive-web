import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Seeker from "imcomponents/organisms/seeker";
import Player from "imcomponents/organisms/player";
import AppLoader from "imcomponents/molecules/appLoader";
import AppSkeleton from "../organisms/appSkeleton";
import WatchList from "../pages/watchList";
import MoviesList from "../pages/moviesList";
import FilmDetails from "../pages/filmDetails";
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
        <Route exact path="/watchlist" component={WatchList} />
        <Route exact path="/film/:filmId" component={FilmDetails} />
        <Route exact path="/player" component={Player} />
        <Route exact path="/player/seeker" component={Seeker} />
        <Route exact path="/movies/:movieCriteria" component={MoviesList} />
      </Switch>
    </AppSkeleton>
  );
};

export default AppRoutes;

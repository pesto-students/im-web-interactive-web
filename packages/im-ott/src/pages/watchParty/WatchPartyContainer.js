import React from "react";
import { Route } from "react-router-dom";

// Components
import CreateWatchParty from "./components/createWatchParty";
import WatchParty from "./components/watchParty";

function WatchPartyContainer(props) {
  const { match } = props;
  const matchUrl = match.url;
  return (
    <>
      <Route
        exact
        path={`${matchUrl}/create/:movieId`}
        component={CreateWatchParty}
      />
      <Route exact path={`${matchUrl}/:partyId`} component={WatchParty} />
    </>
  );
}

export default WatchPartyContainer;

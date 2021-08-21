// Constants
import { EMPTY_OBJECT } from "../constants/base.constants";
import VIEWS from "../constants/route.views";
import APPS from "../constants/route.apps";

const watchlistViewRouteGenerate = (params) => {
  const { mode } = params;
  if (mode) {
    return `/watchlist/${mode}`;
  }
  return `/watchlist`;
};

const filmDetailsViewRouteGenerate = (params) => {
  const { filmId } = params;
  if (filmId) {
    return `/film/${filmId}`;
  }
  return `/film`;
};

const playerViewRouteGenerate = (params) => {
  const { mode } = params;
  if (mode) {
    return `/player/${mode}`;
  }
  return `/player`;
};

const seekerViewRouteGenerate = (params) => {
  const { mode } = params;
  if (mode) {
    return `/player/seeker/${mode}`;
  }
  return `/player/seeker`;
};

const moveListViewRouteGenerate = (params) => {
  const { listKey } = params;
  if (listKey) {
    return `/movies/${listKey}`;
  }
  return `/movies`;
};

const searchMovieViewRouteGenerate = (params) => {
  const { mode } = params;
  if (mode) {
    return `/movie/search/${mode}`;
  }
  return `/movie/search`;
};

const watchPartyViewRouteGenerate = (params) => {
  const { watchPartyId } = params;
  if (watchPartyId) {
    return `/watchparty/${watchPartyId}`;
  }
  return `/watchparty`;
};

const homeViewRouteGenerate = () => {
  return `/`;
};

// Studio
const uploadRouteGenerate = (params) => {
  const { mode } = params;
  if (mode) {
    return `/upload/${mode}`;
  }
  return `/upload`;
};

const editVideoRouteGenerate = (params) => {
  const { filmId } = params;
  return `/video/${filmId}/edit`;
};

const OTT_VIEW_TO_ROUTE_GEN = {
  [VIEWS.HOME]: homeViewRouteGenerate,
  [VIEWS.WATCHLIST]: watchlistViewRouteGenerate,
  [VIEWS.FILMDETAILS]: filmDetailsViewRouteGenerate,
  [VIEWS.PLAYER]: playerViewRouteGenerate,
  [VIEWS.SEEKER]: seekerViewRouteGenerate,
  [VIEWS.MOVIELIST]: moveListViewRouteGenerate,
  [VIEWS.SEARCHMOVIE]: searchMovieViewRouteGenerate,
  [VIEWS.WATCHPARTY]: watchPartyViewRouteGenerate,
};

const STUDIO_VIEW_TO_ROUTE_GEN = {
  [VIEWS.HOME]: homeViewRouteGenerate,
  [VIEWS.UPLOAD]: uploadRouteGenerate,
  [VIEWS.MOVIELIST]: moveListViewRouteGenerate,
  [VIEWS.EDITVIDEO]: editVideoRouteGenerate,
};

const getRoute = (appModule, viewType, params = EMPTY_OBJECT) => {
  let routeGen;
  if (appModule === APPS.OTT) {
    routeGen = OTT_VIEW_TO_ROUTE_GEN[viewType];
  }
  if (appModule === APPS.STUDIO) {
    routeGen = STUDIO_VIEW_TO_ROUTE_GEN[viewType];
  }

  if (routeGen) {
    return routeGen(params);
  }

  return undefined;
};

export default getRoute;

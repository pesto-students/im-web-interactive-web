import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import AppSkeleton from "./organisms/appSkeleton";
import LandingPage from "./pages/landingPage";
import WatchList from "./pages/watchList/WatchList";
import FilmDetails from "./pages/filmDetails";

// Antd Styles
import "antd/dist/antd.css";

// Slider Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <AppSkeleton>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/watchlist" component={WatchList} />
          <Route exact path="/film/:filmId" component={FilmDetails} />
        </Switch>
      </AppSkeleton>
    </Router>
  );
}

export default App;

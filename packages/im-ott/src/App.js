import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import AppSkeleton from "./organisms/appSkeleton";
import LandingPage from "./pages/landingPage";

// Styles
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <Router>
      <AppSkeleton>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </AppSkeleton>
    </Router>
  );
}

export default App;

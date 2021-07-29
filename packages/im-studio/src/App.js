import { BrowserRouter as Router } from "react-router-dom";

// Components
import AppLoader from "imcomponents/molecules/appLoader";

// Routes
import Routes from "./routes";

// Antd Styles
import "antd/dist/antd.css";

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      {/* new Http(MODULES.YOUTUBE); */} // Add where it is loaded
      <AppLoader />
      <Routes />
    </Router>
  );
}

export default App;

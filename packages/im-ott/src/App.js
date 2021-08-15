import { BrowserRouter as Router } from "react-router-dom";

// Components
import noDataFound from "imbase/assets/images/noDataFound.png";
import PageNotFound from "imcomponents/atoms/pageNotFound";
import { ErrorBoundary } from "@sentry/react";
import AppLoader from "imcomponents/molecules/appLoader";
import { ToastContainer } from "imcomponents/atoms/toaster";
// import SocketIoTest from "./SocketIoTest";

// Routes
import Routes from "./routes";

// Antd Styles
import "antd/dist/antd.css";

// Styles
import "./App.css";

// sentry test purpose only, will be replaced by 404 page
function FallbackComponent() {
  return (
    <div>
      <PageNotFound
        url={noDataFound}
        width="60rem"
        message={"An Error has occurred"}
      />
    </div>
  );
}

const myFallback = <FallbackComponent />;

function App() {
  return (
    <Router>
      <ErrorBoundary fallback={myFallback} showDialog>
        {/* <SocketIoTest /> */}
        <AppLoader />
        <Routes />
        <ToastContainer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;

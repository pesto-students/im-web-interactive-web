import { BrowserRouter as Router } from "react-router-dom";

// Components
import AppLoader from "imcomponents/molecules/appLoader";
import { ToastContainer } from "imcomponents/atoms/toaster";

// Routes
import Routes from "./routes";

// Antd Styles
import "antd/dist/antd.css";

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <AppLoader />
      <Routes />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;

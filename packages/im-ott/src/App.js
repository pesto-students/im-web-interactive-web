import "./App.css";
// Components
import Input from "imcomponents/atoms/input";
import { INPUT_SIZES } from "imcomponents/atoms/input";

function App() {
  return <Input size={INPUT_SIZES.LARGE} placeholder={"My Input"} />;
}

export default App;

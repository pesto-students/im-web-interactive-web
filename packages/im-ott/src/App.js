import "./App.css";
// Components
import Button from "imcomponents/atoms/button";
import Input from "imcomponents/atoms/input";
import { INPUT_SIZES } from "imcomponents/atoms/input";

function App() {
  return (
    <>
      <div>
        <Button label={"My Button"} />
      </div>
      <div>
        <Input placeholder={"My Input"} size={INPUT_SIZES.LARGE} />;
      </div>
    </>
  )
}

export default App;

import "antd/dist/antd.css";
import "./App.css";
// Components
import Button from "imcomponents/atoms/button";
import { Label } from "imcomponents/atoms/typography";
import Image from "imcomponents/atoms/image";
import FilmCard from "imcomponents/molecules/FilmCard";

function App() {
  return (
    <>
      <div>
        <Button label={"My Button"} />
      </div>
      <div>
        <Label>Hi how are you</Label>
      </div>
      <>
        <Image
          width={200}
          src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
        />
      </>
      <FilmCard className="pl-2" title={"Jab We Met"} year={"2020"} />
    </>
  );
}

export default App;

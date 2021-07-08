import "./App.css";
// Components
import Button from "imcomponents/atoms/button";
import SearchBox from "imcomponents/atoms/searchBox";

function App() {
  return (
    <>
      <div>
        <Button label={"My Button"} />
      </div>
      <div>
        <SearchBox placeholder={"Enter Search Text"} onSearch={(searchText) => console.log('Searching ' + searchText)} />
      </div>
    </>
  )
}

export default App;

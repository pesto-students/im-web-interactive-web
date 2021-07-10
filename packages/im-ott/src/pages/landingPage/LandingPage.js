import React from "react";

// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";

function LandingPage() {
  return (
    <>
      <Banner />
      <FilmList />
      <FilmList label={"Featured Movies"} isFeatured={true}/>
    </>
  );
}

export default LandingPage;

import React from "react";

// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";

function LandingPage() {
  return (
    <div>
      <Banner />
      <FilmList
        key="new-releases"
        label={"New Releases"}
        listKey={"new-releases"}
      />
      <FilmList
        key="featured-movies"
        label={"Featured Movies"}
        listKey={"featured"}
        isFeatured={true}
        showDetails
      />
      <FilmList
        key="featured-movies"
        label={"Featured Movies"}
        listKey={"featured"}
        isFeatured={true}
      />
      <Banner onlyOne />
      <FilmList
        key="featured-movies"
        label={"Featured Movies"}
        listKey={"new-releases"}
        isFeatured={true}
        showDetails
        isDetailsRightAligned
      />
    </div>
  );
}

export default LandingPage;

import React from "react";

//graphql
import { NEW_RELEASES, FEATURED_MOVIES } from "imbase/graphql/queries";

// Components
import FilmList from "imcomponents/organisms/filmList";
import Banner from "../../organisms/banner";

function LandingPage() {
  return (
    <div>
      <Banner />
      <FilmList
        key="new-releases"
        label={"New Releases"}
        listKey={"new-releases"}
        query={NEW_RELEASES}
        dataPath={"getNewReleases"}
        linkTo={(id) => {
          return `/film/${id}`;
        }}
      />
      <FilmList
        key="featured-movies"
        label={"Featured Movies"}
        listKey={"featured"}
        isFeatured={true}
        showDetails
        query={FEATURED_MOVIES}
        dataPath={"getFeatured"}
        linkTo={(id) => {
          return `/film/${id}`;
        }}
      />
      <FilmList
        key="featured-movies"
        label={"Featured Movies"}
        listKey={"featured"}
        isFeatured={true}
        query={FEATURED_MOVIES}
        dataPath={"getFeatured"}
        linkTo={(id) => {
          return `/film/${id}`;
        }}
      />
      <Banner onlyOne />
      <FilmList
        key="featured-movies"
        label={"Featured Movies"}
        listKey={"new-releases"}
        isFeatured={true}
        showDetails
        isDetailsRightAligned
        query={FEATURED_MOVIES}
        dataPath={"getFeatured"}
        linkTo={(id) => {
          return `/film/${id}`;
        }}
      />
    </div>
  );
}

export default LandingPage;

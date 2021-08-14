import React from "react";

// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";

// Styles
import styles from "./landingPage.module.scss";

function LandingPage() {
  return (
    <div>
      <Banner />
      <div className={styles.container}>
        <FilmList label={"New Releases"} listKey={"new-releases"} />
        <FilmList
          label={"Featured Movies"}
          listKey={"featured"}
          isFeatured={true}
        />
      </div>
    </div>
  );
}

export default LandingPage;

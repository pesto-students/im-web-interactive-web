import React, { useEffect, useState } from "react";

// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";
import AppLoader from "../../molecules/appLoader";

// Styles
import styles from "./landingPage.module.scss";

function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      AppLoader.setVisibility(false);
      setLoading(false);
    }, 2000);
  });

  if (loading) {
    AppLoader.setVisibility(true);
    return null;
  }

  return (
    <>
      <Banner />
      <div className={styles.container}>
        <FilmList label={"New Releases"} />
        <FilmList label={"Featured Movies"} isFeatured={true} />
      </div>
    </>
  );
}

export default LandingPage;

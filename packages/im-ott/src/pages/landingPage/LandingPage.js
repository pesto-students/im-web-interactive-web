// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";

// Styles
import styles from "./landingPage.module.scss";

function LandingPage() {
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

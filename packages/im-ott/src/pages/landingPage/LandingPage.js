import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";
import { fetchMovies } from "../../redux/movies/actions";
// Styles
import styles from "./landingPage.module.scss";

function LandingPage(props) {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleC = () => {
    dispatch(fetchMovies());
  };
  console.log(count);
  return (
    <div>
      <Banner />
      <div className={styles.container}>
        <div onClick={() => handleC()}>Test to check redux</div>
        <FilmList label={"New Releases"} />
        <FilmList label={"Featured Movies"} isFeatured={true} />
      </div>
    </div>
  );
}

export default LandingPage;

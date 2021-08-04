import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Movies Actions
import { fetchMovies } from "../../redux/movies/actions";

// Styles
import styles from "./landingPage.module.scss";

function LandingPage() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleC = () => {
    dispatch(fetchMovies());
  };
  console.log(count);
  return (
    <div>
       {/* Delete this later for test */}
      <div onClick={() => handleC()}>Test Rdux on Console after clicking on it</div>
      <div className={styles.container}>
        Welcome to iFlix Studio
        <br />
        This is a test page
      </div>
    </div>
  );
}

export default LandingPage;

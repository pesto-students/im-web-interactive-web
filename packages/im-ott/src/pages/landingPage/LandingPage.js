import React from "react";

// Components
import Banner from "../../organisms/banner";
import FilmList from "../../organisms/filmList";

// Styles
import styles from "./landingPage.module.scss";

function LandingPage(props) {
  // Below comment is for referal purpose to how to use redux will remove it later
  // const count = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const handleC = () => {
  //   dispatch(fetchMovies());
  // };
  // console.log(count);
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

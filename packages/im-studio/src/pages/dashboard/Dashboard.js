import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// Utils
import { getCurrentUser } from "imbase/services/firebase";

// Readers
import FilmReader from "imbase/readers/Film";

// Constants
import { EMPTY_OBJECT } from "imbase/constants/base.constants";

// Redux Actions
import { getAllMovies } from "../../redux/movies/actions";

// Styles
import styles from "./dashboard.module.scss";

const renderFilm = (filmDetails = EMPTY_OBJECT) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc = FilmReader.thumbnail(filmDetails);
  return (
    <Link to={`video/${filmId}/edit`} className={styles.movieLinks}>
      <FilmCard
        key={filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
        className={styles.film}
      />
    </Link>
  );
};

const Dashboard = (props) => {
  const location = useLocation();
  const currentUser = getCurrentUser()?.uid;
  const dispatch = useDispatch();
  const { loading, movies, error } = useSelector((state) => state.MovieReducer);
  //   console.log(movies);
  //   const [loading, setLoading] = useState(true);
  //   const [films, setFilms] = useState(EMPTY_ARRAY);
  //   const [error, setError] = useState(EMPTY_OBJECT);

  useEffect(() => {
    dispatch(getAllMovies(currentUser));

    return () => {
      dispatch(getAllMovies(currentUser));
    };
  }, [dispatch, currentUser, location]);

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>My Movies</h1>
        <div className={styles.movies}>{_map(movies, renderFilm)}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);

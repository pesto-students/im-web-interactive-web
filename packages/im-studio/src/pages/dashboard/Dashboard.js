import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import FilmCard from "imcomponents/molecules/filmCard";
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// Utils
import getDataFromResponse from "imbase/utils/getDataFromResponse";

// Readers
import FilmReader from "imbase/readers/Film";

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from "imbase/constants/base.constants";
import MOCK_DATA from "imbase/constants/mockDataWatchlist.json";

// Styles
import styles from "./dashboard.module.scss";

const renderFilm = (filmDetails = EMPTY_OBJECT) => {
    const filmId = FilmReader.id(filmDetails);
    const filmTitle = FilmReader.title(filmDetails);
    const filmRating = FilmReader.rating(filmDetails);
    const filmGenre = FilmReader.genre(filmDetails);
    const filmImgSrc = FilmReader.thumbnail(filmDetails);
    return (
        <Link
            to={`video/${filmId}/edit`}
            className={styles.movieLinks}
        >
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

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [films, setFilms] = useState(EMPTY_ARRAY);
    const [error, setError] = useState(EMPTY_OBJECT);

    useEffect(() => {
        Promise.resolve(MOCK_DATA)
            .then((response) => {
                const films = getDataFromResponse(response);
                setFilms(films);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!_isEmpty(error)) {
        return <Error {...error} />;
    }

    return <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.heading}>My Movies</h1>
            <div className={styles.movies}>
                {_map(films, renderFilm)}
            </div>
        </div>
    </div>;
};

export default Dashboard;

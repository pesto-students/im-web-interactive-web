import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

// Lodash
import _isEmpty from "lodash/isEmpty";

import { QUERY_ALL_MOVIES } from "imbase/graphql/queries";

// Components
import FilmList from "imcomponents/organisms/filmList";

// Components
import Loader from "imcomponents/molecules/loader/Loader";
import Error from "imcomponents/molecules/error";

// Utils
import { getCurrentUser } from "imbase/services/firebase";
import APPS from "imbase/constants/route.apps";

// Styles
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const currentUser = getCurrentUser()?.uid;
  const { loading, error } = useSelector((state) => state.MovieReducer);

  if (loading) {
    return <Loader />;
  }

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div>
      <FilmList
        className={styles.filmlist}
        key="unpublished-movies"
        label={"Continue Editing"}
        listKey={"unpublished-movies"}
        query={QUERY_ALL_MOVIES}
        variables={{
          userId: currentUser,
          isPublished: false,
        }}
        dataPath={"movies"}
        application={APPS.STUDIO}
      />
      <FilmList
        className={styles.filmlist}
        key="published-movies"
        label={"Published"}
        listKey={"published-movies"}
        query={QUERY_ALL_MOVIES}
        variables={{
          userId: currentUser,
          isPublished: true,
        }}
        dataPath={"movies"}
        application={APPS.STUDIO}
      />
      <FilmList
        className={styles.filmlist}
        key="featured-edited"
        label={"Featured"}
        listKey={"featured-edited"}
        isFeatured={true}
        query={QUERY_ALL_MOVIES}
        variables={{
          userId: currentUser,
          isFeatured: true,
        }}
        dataPath={"movies"}
        application={APPS.STUDIO}
      />
    </div>
  );
};

export default withRouter(Dashboard);

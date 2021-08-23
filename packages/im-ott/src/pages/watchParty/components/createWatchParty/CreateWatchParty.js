import React from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import { Title, Label } from "imcomponents/atoms/typography";
import Button, { BUTTON_TYPES } from "imcomponents/atoms/button";
import Image from "imcomponents/atoms/image";
import WatchPartyTips from "../watchPartyTips/WatchPartyTips";
import { EyeOutlined, InfoCircleOutlined } from "imcomponents/atoms/icon";
import Input from "imcomponents/atoms/input";
import Participants from "../participants/Participants";
import Tooltip from "imcomponents/atoms/toolTip";

// Utils
import getRoute from "imbase/utils/getRoute";
import VIEWS from "imbase/constants/route.views";
import APPS from "imbase/constants/route.apps";

// Styles
import styles from "./createWatchParty.module.scss";

function WatchParty(props) {
  const watchPartyId = "1234";
  const { movieId } = useParams();
  const history = useHistory();
  const watchpartyRoute = getRoute(APPS.OTT, VIEWS.WATCHPARTY, {
    watchPartyId,
  });
  const filmDetailsRoute = getRoute(APPS.OTT, VIEWS.FILMDETAILS, {
    filmId: movieId,
  });

  const handleCreateWatchParty = () => {
    history.push(watchpartyRoute);
  };

  const handleCancel = () => {
    history.push(filmDetailsRoute);
  };

  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <div className={styles.movieDetails}>
          <div className={styles.movieTitleDetails}>
            <Label className={styles.watchPartyLabel}>
              Create Watch Party for
            </Label>
            <Title className={styles.movietitle}>Shershah</Title>
          </div>
          <div className={styles.movieImage}>
            <Image
              src={
                "https://images-eu.ssl-images-amazon.com/images/S/atv-aps-images/encoded/DHARMA_SHAH/IN/en_US.hi_IN/COVER_ART/NEW_MOVIE/Save._UR800,450_RI_SX712_.jpg"
              }
            />
          </div>
        </div>
        <div className={styles.watchPartyTips}>
          <WatchPartyTips />
        </div>
      </div>
      <div className={styles.settingscontainer}>
        <div className={`${styles.settings} ${styles.bordered}`}>
          <Title level={4} className={styles.title}>
            {"Let's start a watch party"}
          </Title>
          <Label>
            {"With watch party, invite, watch and interact movies along others"}
          </Label>
        </div>
        <div className={`${styles.settings} ${styles.bordered}`}>
          <Title className={styles.inviteFriendsTitle}>
            <Label>Invite friends to join</Label>
            <Tooltip
              title="Only users registered on the platform can be added to watchlist"
              zIndex={99999}
            >
              <InfoCircleOutlined className={styles.infoIcon} />
            </Tooltip>
          </Title>
          <Input placeholder={"Enter Email Address"} />
          <Participants />
        </div>
        <div className={`${styles.settings} ${styles.actionButtons}`}>
          <Button
            type={BUTTON_TYPES.PRIMARY}
            className={styles.createWatchPartyButton}
            onClick={handleCreateWatchParty}
          >
            <EyeOutlined />{" "}
            <span className={styles.createWatchPartyButtonLabel}>
              {"Create Watch Party"}
            </span>
          </Button>
          <Button
            type={BUTTON_TYPES.LINK}
            className={styles.createWatchPartyButton}
            onClick={handleCancel}
          >
            <span className={styles.createWatchPartyButtonLabel}>
              {"Cancel"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WatchParty;

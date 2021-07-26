import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./footerContent.module.scss";

// Icons
import { Row, Col } from "imcomponents/atoms/grid";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  VideoCameraFilled,
} from "imcomponents/atoms/icon";

function FooterContent() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerWrapper}>
          <Row className={styles.footerRow}>
            <Col className={styles.footerColumn}>
              <div className={styles.footerTitle}>iFlix Media</div>
              <Link to="#" className={styles.footerLink}>
                Pricing
              </Link>
              <Link to="#" className={styles.footerLink}>
                Updated
              </Link>
              <Link to="#" className={styles.footerLink}>
                FAQs
              </Link>
              <Link to="#" className={styles.footerLink}>
                Tutorials
              </Link>
            </Col>
            <Col className={styles.footerColumn}>
              <div className={styles.footerTitle}>Product</div>
              <Link to="#" className={styles.footerLink}>
                Business
              </Link>
              <Link to="#" className={styles.footerLink}>
                Designers
              </Link>
            </Col>
            <Col className={styles.footerColumn}>
              <div className={styles.footerTitle}>About</div>
              <Link to="#" className={styles.footerLink}>
                Company
              </Link>
              <Link to="#" className={styles.footerLink}>
                Careers
              </Link>
              <Link to="#" className={styles.footerLink}>
                Legal
              </Link>
              <Link to="#" className={styles.footerLink}>
                Help
              </Link>
            </Col>
          </Row>
          <div>
            <VideoCameraFilled style={{ fontSize: "500%" }} />
            <div className={styles.footerLogo}>
              © 2021 Studio Media. All rights reserved.
            </div>
            <div className={styles.socialContainer}>
              <Link to="#" className={styles.social}>
                <FacebookFilled />
              </Link>
              <Link to="#" className={styles.social}>
                <TwitterOutlined />
              </Link>
              <Link to="#" className={styles.social}>
                <InstagramOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterContent;

import React from "react";

// Styles
import styles from "./footerContent.module.scss";

// Icons
import { Row, Col } from "imcomponents/atoms/grid";
import { FacebookFilled, InstagramOutlined, TwitterOutlined, VideoCameraFilled } from "imcomponents/atoms/icon";

function FooterContent() {
    return (
        <>
        <div className={styles.footerContainer}>
            <div className={styles.footerWrapper}>
            <Row className={styles.footerRow}>
                <Col className={styles.footerColumn}>
                    <div className={styles.footerTitle}>iFlix Media</div>
                    <a href="#" className={styles.footerLink}>Pricing</a>
                    <a href="#" className={styles.footerLink}>Updated</a>
                    <a href="#" className={styles.footerLink}>FAQs</a>
                    <a href="#" className={styles.footerLink}>Tutorials</a>
                </Col>
                <Col className={styles.footerColumn}>
                    <div className={styles.footerTitle}>Product</div>
                    <a href="#" className={styles.footerLink}>Business</a>
                    <a href="#" className={styles.footerLink}>Designers</a>
                    </Col>
                <Col className={styles.footerColumn}>
                    <div className={styles.footerTitle}>About</div>
                    <a href="#" className={styles.footerLink}>Company</a>
                    <a href="#" className={styles.footerLink}>Careers</a>
                    <a href="#" className={styles.footerLink}>Legal</a>
                    <a href="#" className={styles.footerLink}>Help</a>
                </Col>
            </Row>
            <div>
                <VideoCameraFilled style={{ fontSize: '500%' }} />
                <div className={styles.footerLogo}>© 2021 Studio Media. All rights reserved.</div>
                <div className={styles.socialContainer}>
                    <a href="#" className={styles.social}><FacebookFilled /></a>
                    <a href="#" className={styles.social}><TwitterOutlined /></a>
                    <a href="#" className={styles.social}><InstagramOutlined /></a>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default FooterContent;

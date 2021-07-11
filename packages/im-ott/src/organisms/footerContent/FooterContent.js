import React from "react";

// Components
import Footer from "imcomponents/atoms/footer";

// Styles
import styles from "./footerContent.module.scss";

// Icons
import { FacebookFilled, InstagramOutlined, TwitterOutlined, VideoCameraFilled } from "imcomponents/atoms/icon";

function FooterUI() {
    return (
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>iFlix Media</Footer.Title>
                        <Footer.Link href="#">Pricing</Footer.Link>
                        <Footer.Link href="#">Updated</Footer.Link>
                        <Footer.Link href="#">FAQs</Footer.Link>
                        <Footer.Link href="#">Tutorials</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Product</Footer.Title>
                        <Footer.Link href="#">Business</Footer.Link>
                        <Footer.Link href="#">Designers</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>About</Footer.Title>
                        <Footer.Link href="#">Company</Footer.Link>
                        <Footer.Link href="#">Careers</Footer.Link>
                        <Footer.Link href="#">Legal</Footer.Link>
                        <Footer.Link href="#">Help</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
                <div>
                    <VideoCameraFilled style={{ fontSize: '500%'}}/>
                    <div>© 2021 Studio Media. All rights reserved.</div>
                    <div className={styles.socialContainer}>
                        <a href="#" className={styles.social}><FacebookFilled /></a>
                        <a href="#" className={styles.social}><TwitterOutlined /></a>
                        <a href="#" className={styles.social}><InstagramOutlined /></a>
                    </div>
                </div>
            </Footer.Wrapper>
        </Footer>
      );
}

export default FooterUI;

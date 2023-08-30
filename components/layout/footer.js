import Link from "next/link";

import classes from "../../styles/components/layout/footer.module.css";
import Merle2 from "../../public/icons/SVG/merle2.svg";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Merle2 height="50" width="50" className={classes.heading} />
        <div className={classes.contentContainer}>
          <div>
            <h4 className={classes.subHeading}>Client Service</h4>
            <p className={classes.text}>
              <Link href="/faq">FAQ</Link>
            </p>
            <p className={classes.text}>
              <Link href="/contact">Contact</Link>
            </p>
            <p className={classes.text}>
              <Link href="/about">About MERLE</Link>
            </p>
            <p className={classes.text}>
              <Link href="/faq?qry=delivery-and-returns">Delivery and returns</Link>
            </p>
          </div>
          <div>
            <h4 className={classes.subHeading}>COUNTRY / REGION</h4>
            <p className={classes.text}>Norway exclusive</p>
          </div>
        </div>
        <div className={classes.bottomContainer}>
          <div className={classes.line} />
          <div className={classes.finalContainer}>
            <p className={classes.text}>All rights reserved Merle AS 2023</p>
            <div className={classes.text}>icon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

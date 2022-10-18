import { useState } from "react";
import classes from "../../styles/components/layout/header.module.css";

import Anchor from "../UI/anchor";
import useIsMobile from "../util/useIsMobile";

const Header = (props) => {
  const { className, color } = props;
  const isMobile = useIsMobile();

  const [menuActive, setMenuActive] = useState(false);

  if (!isMobile) {
    return (
      <nav className={`${classes.nav} ${className}`}>
        <div className={classes.navOptions}></div>
        <Anchor className={classes.logo} href="/" color={color}>
          MERLE
        </Anchor>
        <div className={classes.navOptions}>
          <Anchor className={classes.navOption} color={color} href="/search">
            Search
          </Anchor>
          <Anchor className={classes.navOption} color={color} href="/cart">
            Cart
          </Anchor>
        </div>
      </nav>
    );
  }
  if (isMobile) {
    return (
      <nav className={`${classes.nav} ${className}`}>
        <div className={classes.navIconContainer}>
          <svg
            onClick={() => setMenuActive((prev) => !prev)}
            className={classes.navIcon}
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447715 20 1V5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5V1ZM2 2V4H18V2H2Z"
              fill="#1E1E1E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 9C0 8.44771 0.447715 8 1 8H19C19.5523 8 20 8.44771 20 9V13C20 13.5523 19.5523 14 19 14H1C0.447715 14 0 13.5523 0 13V9ZM2 10V12H18V10H2Z"
              fill="#1E1E1E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1 16C0.447715 16 0 16.4477 0 17V21C0 21.5523 0.447715 22 1 22H19C19.5523 22 20 21.5523 20 21V17C20 16.4477 19.5523 16 19 16H1ZM2 20V18H18V20H2Z"
              fill="#1E1E1E"
            />
          </svg>
        </div>
        {menuActive && (
          <div className={classes.mobileNavMenu}>
            <div className={classes.mobileNavContainer}>
              <Anchor
                className={classes.navOptionMobile}
                color={color}
                href="/search"
              >
                Search
              </Anchor>
            </div>
            <div className={classes.mobileNavContainer}>
              <Anchor className={classes.navOptionMobile} color={color} href="/cart">
                Cart
              </Anchor>
            </div>
          </div>
        )}
        <Anchor className={classes.mobileLogo} href="/" color={color}>
          MERLE
        </Anchor>
        <div className={classes.navIconContainer}></div>
      </nav>
    );
  }
};

export default Header;

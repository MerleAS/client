import { useState, useContext, useEffect } from "react";
import classes from "../../styles/components/layout/header.module.css";

import Anchor from "../UI/anchor";
import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

const Header = (props) => {
  const { className, color } = props;

  const [menuActive, setMenuActive] = useState(false);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const isMobile = useIsMobile();
  const { cartItems, setCartIsActive } = useContext(StateContext);

  const cartClasses = `${classes.navOption} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    } else {
      setBtnIsHighlighted(true);
    }
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);

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
          <p className={classes.navOption} onClick={() => setCartIsActive(true)}>Cart</p>
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
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1C0 0.447715 0.447715 0 1 0H19C19.5523 0 20 0.447717 20 1C20 1.55229 19.5523 2 19 2L1 2C0.447715 2 0 1.55228 0 1Z"
              fill="#1E1E1E"
            />
            <path
              d="M0 7C0 6.44772 0.447715 6 1 6L19 6C19.5523 6 20 6.44772 20 7C20 7.55229 19.5523 8 19 8L1 8C0.447715 8 0 7.55228 0 7Z"
              fill="#1E1E1E"
            />
            <path
              d="M1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14L19 14C19.5523 14 20 13.5523 20 13C20 12.4477 19.5523 12 19 12L1 12Z"
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
              <p className={classes.navOptionMobile} onClick={() => setCartIsActive(true)}>Cart</p>
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

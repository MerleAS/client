import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import classes from "../../styles/components/layout/header.module.css";

import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";
import Merle from "../../public/icons/SVG/merle.svg";
import Menu from "../../public/icons/SVG/menu.svg";
import Cross from "../../public/icons/SVG/cross.svg";

const Header = () => {
  const router = useRouter();

  const [menuActive, setMenuActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isMobile = useIsMobile();
  const { setCartIsActive, setSearchIsActive, routeStackHandler } =
    useContext(StateContext);

  const routeHandler = (routeObject, index) => {
    router.push(routeObject.path);
    routeStackHandler(routeObject, index);
  };

  const closeMenuHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setMenuActive(false);
    }, 600);
  };

  const menuContainerStyle = isMobile ? { width: "50%" } : { width: "20%" };

  const backdropClasses = isClosing ? classes.backdropOut : classes.backdropIn;

  const containerClasses = isClosing
    ? classes.containerOut
    : classes.containerIn;

  return (
    <nav className={classes.nav}>
      <Head>
        <title>MERLE</title>
      </Head>
      {!isMobile && (
        <>
          <div
            className={classes.navIconContainer}
            style={{ justifyContent: "start", marginLeft: "3%" }}
            onClick={() => setMenuActive(true)}
          >
            <Menu height="25" width="25" />
          </div>
          <div
            className={classes.logo}
            onClick={() => routeHandler({ path: "/", label: "Home" })}
          >
            <Merle height="120" width="280" />
          </div>
          <div className={classes.navOptions}>
            <div
              className={classes.navOption}
              onClick={() => setSearchIsActive(true)}
            >
              <SearchIcon width="20" height="20" />
            </div>
            <p
              className={classes.navOption}
              onClick={() => setCartIsActive(true)}
            >
              <CartIcon height="20" width="20" />
            </p>
          </div>
        </>
      )}
      {isMobile && (
        <>
          <div className={classes.navIconContainer}>
            <Menu
              height="20"
              width="20"
              onClick={() => setMenuActive((prev) => !prev)}
            />
            <SearchIcon width="20" height="20" />
          </div>
          <div
            className={classes.mobileLogo}
            onClick={() => routeHandler({ path: "/", label: "Home" })}
          >
            <Merle height="100" width="250" />
          </div>
          <div className={classes.navIconContainer}>
            <CartIcon height="20" width="20" />
          </div>
        </>
      )}
      {menuActive && (
        <>
          <div
            className={`${classes.backdrop} ${backdropClasses}`}
            onClick={closeMenuHandler}
          />
          <div
            className={`${classes.navMenuContainer} ${containerClasses}`}
            style={menuContainerStyle}
          >
            <Cross width="20" height="20" onClick={closeMenuHandler} />
            <div className={classes.navMenu}>
              <div className={classes.menuOption}>
                <Link href="/about">About Merle</Link>
              </div>
            </div>
            <div className={classes.navMenu}>
              <p className={classes.menuOption}>
                <Link href="/contact">Contact us</Link>
              </p>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;

import { useState } from "react";

import classes from "../../styles/components/UI/sidebar.module.css";
import useIsMobile from "../util/useIsMobile";

import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";
import Cross from "../../public/icons/SVG/cross.svg";

const SideBar = ({
  isActive,
  setIsActive,
  title,
  headerContent,
  bodyContent,
  footerContent,
  orientation,
}) => {
  const isMobile = useIsMobile();

  const [isClosing, setIsClosing] = useState(false);

  const closeModalHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsActive(false);
    }, 600);
  };

  const backdropStyles = isClosing ? classes.backdropOut : classes.backdropIn;

  let containerStyles;
  if (orientation === "right") {
    containerStyles = isClosing
      ? classes.containerOutRight
      : classes.containerInRight;
  } else {
    containerStyles = isClosing
      ? classes.containerOutLeft
      : classes.containerInLeft;
  }

  const containerClass = isMobile
    ? `${classes.mobileContainer}`
    : `${classes.container}`;

  const crossContainerClass = isMobile
    ? classes.mobileCrossContainer
    : classes.crossContainer;

  return (
    <>
      {isActive && (
        <>
          <div
            className={`${classes.backdrop} ${backdropStyles}`}
            onClick={closeModalHandler}
          ></div>
          <div className={`${containerClass} ${containerStyles}`}>
            <div className={classes.line}>
              <div className={crossContainerClass}>
                {title === "Cart" && <CartIcon width="20" height="20" />}
                {title === "Search" && <SearchIcon width="20" height="20" />}
              </div>
              {headerContent}
              <div className={crossContainerClass} onClick={closeModalHandler}>
                <Cross width="25" height="25" />
              </div>
            </div>
            {bodyContent}
            {footerContent}
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;

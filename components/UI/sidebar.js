import { useState } from "react";

import classes from "../../styles/components/UI/sideModal.module.css";
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
}) => {
  const isMobile = useIsMobile();

  const [isClosing, setIsClosing] = useState(false);

  const closeModalHandler = () => {
    setIsClosing(true);
    const time = isMobile ? 300 : 600;
    setTimeout(() => {
      setIsClosing(false);
      setIsActive(false);
    }, time);
  };

  const backdropStyles = isClosing ? classes.backdropOut : classes.backdropIn;

  const containerStyles = isClosing
    ? classes.containerOut
    : classes.containerIn;
  const mobileContainerStyles = isClosing
    ? classes.mobileContainerDown
    : classes.mobileContainerUp;

  const containerClass = isMobile
    ? `${classes.mobileContainer} ${mobileContainerStyles}`
    : `${classes.container} ${containerStyles}`;
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
          <div className={containerClass}>
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

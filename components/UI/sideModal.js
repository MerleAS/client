import { useState } from "react";

import classes from "../../styles/components/UI/sideModal.module.css";
import useIsMobile from "../util/useIsMobile";

import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";

const SideModal = ({
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2071 2.20702C13.5976 1.81649 13.5976 1.18333 13.2071 0.792802C12.8166 0.402277 12.1834 0.402277 11.7929 0.792802L6.99995 5.58574L2.20711 0.792895C1.81658 0.40237 1.18342 0.40237 0.792893 0.792895C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L5.58574 6.99996L0.792893 11.7928C0.402368 12.1833 0.40237 12.8165 0.792893 13.207C1.18342 13.5975 1.81658 13.5975 2.20711 13.207L6.99995 8.41417L11.7929 13.2071C12.1834 13.5976 12.8166 13.5976 13.2071 13.2071C13.5976 12.8166 13.5976 12.1834 13.2071 11.7929L8.41417 6.99995L13.2071 2.20702Z"
                    fill="#000"
                  />
                </svg>
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

export default SideModal;

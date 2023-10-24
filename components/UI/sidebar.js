import { useState } from "react";

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
  const [isClosing, setIsClosing] = useState(false);

  const closeModalHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsActive(false);
    }, 600);
  };

  let containerAnimation;
  if (orientation === "right") {
    containerAnimation = isClosing
      ? "animate-slideOutRight"
      : "animate-slideInRight";
  } else {
    containerAnimation = isClosing
      ? "animate-slideOutLeft"
      : "animate-slideInLeft";
  }

  if (!isActive) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed w-full h-full z-[90] top-0 left-0 bg-black ${
          isClosing ? "animate-backdropOut " : "animate-backdropIn"
        }`}
        onClick={closeModalHandler}
      ></div>
      <div
        className={`fixed z-[100] flex flex-col h-full bg-white top-0 w-[90%] md:w-1/2 lg:w-[35%] xl:w-[25%] shadow-2xl ${
          orientation === "right" ? "right-0" : "left-0"
        } ${containerAnimation}`}
      >
        <div className="border-b h-[10%] border-gray-300 w-full flex items-center justify-between">
          <div className="flex mx-[3%]">
            {title === "Cart" && <CartIcon width="20" height="20" />}
            {title === "Search" && <SearchIcon width="20" height="20" />}
            {title !== "Search" ||
              (title !== "Cart" && <div className="w-[20px] h-[20px]" />)}
          </div>
          {headerContent}
          <div className="flex mx-[3%]" onClick={closeModalHandler}>
            <Cross width="25" height="25" />
          </div>
        </div>
        {bodyContent}
        {footerContent}
      </div>
    </>
  );
};

export default SideBar;

import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";
import Cross from "../../public/icons/SVG/cross.svg";

const SideBar = ({
  isActive,
  isClosing,
  title,
  headerContent,
  bodyContent,
  footerContent,
  orientation,
  closeModalHandler,
}) => {
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
        className={`hidden md:flex fixed w-full z-[90] md:h-full md:top-0 left-0 bg-black ${
          isClosing ? "animate-backdropOut " : "animate-backdropIn"
        }`}
        onClick={closeModalHandler}
      ></div>
      <div
        className={`fixed z-[100] !m-0 flex flex-col h-[calc(100%-5rem)] top-20 md:h-full md:top-0  bg-white w-full md:w-1/2 lg:w-[35%] xl:w-[25%] shadow-2xl ${
          orientation === "right" ? "right-0" : "left-0"
        } ${containerAnimation}`}
      >
        <div className="w-full hidden md:flex  items-center justify-between border-b h-[10%] border-gray-300 ">
          <div className="flex mx-[5%]">
            {title === "Cart" && <CartIcon width="25" height="25" />}
            {title === "Search" && <SearchIcon width="25" height="25" />}
            {title !== "Search" && title !== "Cart" && <div className="w-[20px] h-[20px]" />}
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

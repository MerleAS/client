import Link from "next/link";

import Merle from "../../public/icons/SVG/merle.svg";

import Search from "./search";
import Cart from "./cart";

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex w-full">
        <div className="w-1/4 ml-[3%] space-y-3"></div>
        <Link className="flex w-1/2 items-center justify-center" href="/">
          <Merle height="80" width="160" />
        </Link>
        <div className="w-1/4 flex items-center justify-end mr-[3%]">
          <div className="w-[15%] flex items-center justify-center">
            <Search />
          </div>

          <div className="w-[15%] h-full flex items-center justify-center">
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

{
  /* <div
            className="w-[15%] flex items-center justify-center"
            onClick={() => setSearchIsActive(true)}
          >
            <SearchIcon width="20" height="20" />
          </div>
          <p
            className="w-[15%] flex items-center justify-center"
            onClick={() => setCartIsActive(true)}
          >
            <CartIcon height="20" width="20" />
          </p> */
}

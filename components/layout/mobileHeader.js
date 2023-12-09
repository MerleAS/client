import Search from "./search";
import Menu from "./menu";
import Cart from "./cart";

import Merle from "../../public/icons/SVG/merle.svg";
import Link from "next/link";

const MobileHeader = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/4 space-x-3 flex items-center justify-center">
        <Menu />
        <Search />
      </div>
      <Link href="/" className="flex w-1/2 items-center justify-center">
        <Merle height="60" width="150" />
      </Link>
      <div className="space-y-3 w-1/4 flex items-center justify-center">
        <Cart />
      </div>
    </div>
  );
};

export default MobileHeader;

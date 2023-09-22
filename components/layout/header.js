import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";
import Merle from "../../public/icons/SVG/merle.svg";
import Menu from "../../public/icons/SVG/menu.svg";
import SideBar from "../UI/sidebar";

const Header = () => {
  const router = useRouter();

  const [sidebarActive, setSidebarActive] = useState(false);

  const isMobile = useIsMobile();
  const { setCartIsActive, setSearchIsActive, routeStackHandler } =
    useContext(StateContext);

  const routeHandler = (routeObject, index) => {
    router.push(routeObject.path);
    routeStackHandler(routeObject, index);
  };

  const headerContent = <div></div>;

  const bodyContent = (
    <div className="p-8">
      <div className="h-10 flex items-center py-4">
        <div className="text-md text-black flex items-center justify-center">
          <Link href="/about">About Merle</Link>
        </div>
      </div>
      <div className="h-10 flex items-center py-4">
        <p className="text-md text-black flex items-center justify-center">
          <Link href="/contact">Contact us</Link>
        </p>
      </div>
    </div>
  );

  const footerContent = <div></div>;

  return (
    <nav className="relative w-full h-24 z-10 flex flex-row">
      <Head>
        <title>MERLE</title>
      </Head>
      {!isMobile && (
        <>
          <div
            className="w-1/4 space-y-3 flex items-center justify-start ml-[3%]"
            onClick={() => setSidebarActive(true)}
          >
            <Menu height="25" width="25" />
          </div>
          <div
            className="flex w-1/2 items-center justify-center"
            onClick={() => routeHandler({ path: "/", label: "Home" })}
          >
            <Merle height="120" width="280" />
          </div>
          <div className="w-1/4 h-full flex items-center justify-end mr-[3%]">
            <div
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
            </p>
          </div>
        </>
      )}
      {isMobile && (
        <>
          <div className="w-1/4 space-x-3 flex items-center justify-center">
            <Menu
              height="20"
              width="20"
              onClick={() => setSidebarActive((prev) => !prev)}
            />
            <SearchIcon
              width="20"
              height="20"
              onClick={() => setSearchIsActive(true)}
            />
          </div>
          <div
            className="flex w-1/2 items-center justify-center"
            onClick={() => routeHandler({ path: "/", label: "Home" })}
          >
            <Merle height="100" width="250" />
          </div>
          <div className="w-1/4 space-y-3 flex items-center justify-center">
            <CartIcon
              height="20"
              width="20"
              onClick={() => setCartIsActive(true)}
            />
          </div>
        </>
      )}
      <SideBar
        title=""
        orientation="left"
        headerContent={headerContent}
        bodyContent={bodyContent}
        footerContent={footerContent}
        isActive={sidebarActive}
        setIsActive={setSidebarActive}
      />
    </nav>
  );
};

export default Header;

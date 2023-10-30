import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";
import Merle from "../../public/icons/SVG/merle.svg";
import Menu from "../../public/icons/SVG/menu.svg";
import SideBar from "../UI/sidebar";
import Cart from "./cart";
import Search from "./search";

const Header = () => {
  const router = useRouter();
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

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
          <Link href="/products">Products</Link>
        </p>
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
    <nav className="fixed top-0 left-0 right-0 bg-white w-full border-b shadow-lg h-20 z-50 flex flex-row">

      {!isMobile && (
        <>
          <div
            className={`fixed h-12 flex items-center justify-center top-20 w-full z-10 transition-all duration-300s ${
              isTop ? "hidden" : "bg-white shadow-lg"
            }`}
          >
            <div className="flex justify-between justify-center items-center p-4">
              <div className="flex items-center justify-center space-x-6">
                <Link href="/products">
                  <a className="hover:scale-105 cursor-pointer text-dark">Shop</a>
                </Link>
                <Link href="/contact">
                  <a className="hover:scale-105 cursor-pointer text-dark">Our Blog</a>
                </Link>
                <Link href="/about">
                  <a className="hover:scale-105 cursor-pointer text-dark">About Merle</a>
                </Link>
                <Link href="/contact">
                  <a className="hover:scale-105 cursor-pointer text-dark">Contact us</a>
                </Link>
                <Link href="/contact">
                  <a className="hover:scale-105 cursor-pointer text-dark">
                    Authentication
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-1/3 ml-[3%] space-y-3" />
          <div
            className="flex w-1/2 items-center justify-center"
            onClick={() => routeHandler({ path: "/", label: "Home" })}
          >
            <Merle height="80" width="160" />
          </div>
          <div className="w-1/3 h-full flex items-center justify-end mr-[3%]">
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
            <Merle height="60" width="150" />
          </div>
          <div className="space-y-3 w-1/4 flex items-center justify-center">
            <CartIcon
              height="20"
              width="20"
              onClick={() => setCartIsActive(true)}
            />
          </div>
          <SideBar
            title=""
            orientation="left"
            headerContent={headerContent}
            bodyContent={bodyContent}
            footerContent={footerContent}
            isActive={sidebarActive}
            setIsActive={setSidebarActive}
          />
        </>
      )}

      <Search />
      <Cart />
    </nav>
  );
};

export default Header;

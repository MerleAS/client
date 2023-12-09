"use client"

import Link from "next/link";
import { useState } from "react";

import SideBar from "../UI/sidebar";

import MenuIcon from "../../public/icons/SVG/menuIcon.svg";

const Menu = () => {

  const [menuActive, setMenuActive] = useState(false)

  const headerContent = <div></div>;

  const bodyContent = (
    <div className="p-8">
      <div className="h-10 flex items-center py-4">
        <div className="text-md text-black flex items-center justify-center">
          <Link href="/about" onClick={() => setMenuActive(false)}>About Merle</Link>
        </div>
      </div>
      <div className="h-10 flex items-center py-4">
        <p className="text-md text-black flex items-center justify-center">
          <Link href="/products" onClick={() => setMenuActive(false)}>Products</Link>
        </p>
      </div>
      <div className="h-10 flex items-center py-4">
        <p className="text-md text-black flex items-center justify-center">
          <Link href="/contact" onClick={() => setMenuActive(false)}>Contact us</Link>
        </p>
      </div>
    </div>
  );

  const footerContent = <div></div>;

  return (
    <>
      <MenuIcon
        height="20"
        width="20"
        onClick={() => setMenuActive(true)}
        className="hover:scale-105 cursor-pointer"
      />
      <SideBar
        title=""
        orientation="left"
        headerContent={headerContent}
        bodyContent={bodyContent}
        footerContent={footerContent}
        isActive={menuActive}
        setIsActive={setMenuActive}
      />
    </>
  );
};

export default Menu;

"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import Header from "./header";
import MobileHeader from "./mobileHeader";

const Nav = () => {
  const [isTop, setIsTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY < 20) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white w-full border-b shadow-lg h-20 z-50 flex flex-row">
      <div className="hidden md:flex w-full">
        <Header />
        <div
          className={`fixed h-12 flex items-center justify-center top-20 w-full z-10 transition-all duration-300s ${
            isTop ? "hidden" : "bg-white shadow-lg"
          }`}
        >
          <div className="flex justify-center items-center p-4">
            <div className="flex items-center justify-center space-x-6">
              <Link
                href="/products"
                className="hover:scale-105 cursor-pointer text-dark"
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="hover:scale-105 cursor-pointer text-dark"
              >
                Our Blog
              </Link>
              <Link
                href="/about"
                className="hover:scale-105 cursor-pointer text-dark"
              >
                About Merle
              </Link>
              <Link
                href="/contact"
                className="hover:scale-105 cursor-pointer text-dark"
              >
                Contact us
              </Link>
              <Link
                href="/authenticity"
                className="hover:scale-105 cursor-pointer text-dark"
              >
                Authentication
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden w-full">
        <MobileHeader />
      </div>
    </nav>
  );
};

export default Nav;

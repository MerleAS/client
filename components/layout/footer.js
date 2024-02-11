import Link from "next/link";

import Merle2 from "../../public/icons/SVG/merle2.svg";
import Instagram from "../../public/icons/SVG/instagram.svg";
import Tiktok from "../../public/icons/SVG/tiktok.svg";

import IconLink from "../UI/iconLink";

const Footer = () => {
  return (
    <div className="h-[35rem] w-full bg-black py-4 md:py-16 px-[4%]">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="md:w-1/4">
            <Merle2
              height="50"
              width="150"
              className="w-full flex items-center justify-center md:justify-start"
            />
            <p className="text-white p-4 text-[12px] w-full">
              We share our interest in fashion, and sell popular secondhand and
              vintage products from well known brands!
            </p>
            <div className="hidden md:flex">
              <div className="flex flex-row space-x-4 p-4">
                <IconLink href="https://www.instagram.com/merle__no/">
                  <Instagram height={20} width={20} />
                </IconLink>
                <IconLink href="https://www.tiktok.com/@merle__no">
                  <Tiktok height={20} width={20} />
                </IconLink>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between md:justify-center p-4 md:space-x-16">
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-normal text-white">Client Service</h4>
              <p className="text-white text-[12px]">
                <Link href="/faq">FAQ</Link>
              </p>
              <p className="text-white text-[12px]">
                <Link href="/contact">Contact Us</Link>
              </p>
              <p className="text-white text-[12px]">
                <Link href="/about">About MERLE</Link>
              </p>
              <p className="text-white text-[12px]">
                <Link href="/terms-of-service">Terms of service</Link>
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-normal text-white">
                COUNTRY / REGION
              </h4>
              <p className="text-white text-[12px]">Norway exclusive</p>
              {/* <p className="text-white text-[12px]">Tlf: 97655367</p> */}
              <p className="text-white text-[12px]">Mail: post@merle.no</p>
            </div>
          </div>
          <div className="w-1/4" />
        </div>
        <div className="">
          <div className="w-full border-b border-white my-4" />
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-white text-[10px]">
              All rights reserved Merle AS 2023 | Org.nr. 931171887{" "}
            </p>
            <div className="flex md:hidden">
              <div className="flex flex-row space-x-4 p-4">
                <IconLink href="https://www.instagram.com/merle__no/">
                  <Instagram height={20} width={20} />
                </IconLink>
                <IconLink href="https://www.tiktok.com/@merle__no">
                  <Tiktok height={20} width={20} />
                </IconLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

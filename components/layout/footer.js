import Link from "next/link";

import Merle2 from "../../public/icons/SVG/merle2.svg";
import Instagram from "../../public/icons/SVG/instagram.svg";
import Tiktok from "../../public/icons/SVG/tiktok.svg";

const Footer = () => {

  return (
    <div className="h-96 w-full bg-black py-6 md:py-8 px-[4%]">
      <div className="w-full h-full flex flex-col justify-between space-y-8">
        <Merle2 height="50" width="50" className="w-full flex items-center justify-center" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-normal text-white">Client Service</h4>
            <p className="text-white text-[10px]">
              <Link href="/faq">FAQ</Link>
            </p>
            <p className="text-white text-[10px]">
              <Link href="/contact">Contact</Link>
            </p>
            <p className="text-white text-[10px]">
              <Link href="/about">About MERLE</Link>
            </p>
            <p className="text-white text-[10px]">
              <Link href="/faq?qry=delivery-and-returns">
                Delivery and returns
              </Link>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-normal text-white">COUNTRY / REGION</h4>
            <p className="text-white text-[10px]">Norway exclusive</p>
          </div>
        </div>
        <div className="">
          <div className="w-full border-b border-white my-4" />
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-white text-[10px]">All rights reserved Merle AS 2023</p>
            <div className="flex flex-row space-x-4">
              <Instagram height={20} width={20} onClick={() => window.location.href = "https://www.instagram.com/merle__no/"}/>
              <Tiktok height={20} width={20} onClick={() => window.location.href = "https://www.tiktok.com/@merle__no"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import Image from "next/image";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

const Authenticity = () => {
  return (
    <>
      <Header />
      <div className="w-[90%] mx-[5%] space-y-12 px-8 md:px-12 lg:px-16">
        <h2 className="w-full flex items-center justify-center text-lg md:text-xl text-center">AUTHENTICITY</h2>
        <div className="flex justify-between my-[5%]">
          <div className="w-full md:w-4/5 lg:w-2/5 border border-gray-400 p-[5%] mb-[5%]">
            <p className="leading-8">
              “We share our interest in fashion, and sell popular secondhand and
              vintage products from well known brands”
            </p>
            <p className="leading-8"> 
              The idea with Merle is to give you a lot of inspiration through
              Instagram, tiktok and the website. You can join the products
              journey with different outfits, styles and fashion. On MERLE´s
              instagram and tiktok you can se how to style the products and you
              can get a better view on how the product looks and the condition
              to the products.
            </p>
            <p className="leading-8">
              We follow the trends on tiktok and instagram and ensure that you
              get the products you are looking for.
            </p>
          </div>
          <div className="w-2/5">{/* <Image /> */}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Authenticity;

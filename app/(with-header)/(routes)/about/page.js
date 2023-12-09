import Image from "next/image";

const About = () => {
  return (
    <div className="w-full p-8 md:p-16 mb-16 flex flex-col items-center justify-center">
      <h2 className="text-xl font-light w-full flex items-center justify-center mb-16">
        About Us
      </h2>
      <div className="w-4/5 md:w-2/3 lg:w-2/5 px-[2%] py-[5%] border border-black">
        <p className="leading-8">
          We share our interest in fashion, and sell popular secondhand and
          vintage products from well known brands
        </p>
        <p className="leading-8">
          The idea with Merle is to give you a lot of inspiration through
          Instagram, tiktok and the website. You can join the products journey
          with different outfits, styles and fashion. On MERLEs instagram and
          tiktok you can se how to style the products and you can get a better
          view on how the product looks and the condition to the products
        </p>
        <p className="leading-8">
          We follow the trends on tiktok and instagram and ensure that you get
          the products you are looking for.
        </p>
      </div>
      <div className="max-w-4/5 my-[5%]">
        <Image
          src="/images/about-us-image.png"
          alt="image"
          width={997}
          height={1253}
          objectFit="cover"
          priority={true}
        />
      </div>
      <h3 className="text-xl font-light w-full flex items-center justify-center mb-16">
        Our social media
      </h3>
      <div className="w-4/5 md:w-2/3 lg:w-2/5 px-[2%] py-[5%] border border-black">
        <p className="leading-8">
          The goal with our sosial media is to share content that is
          inspirational. We wont out sosial media like instagram and tiktok to
          be like a typical influencer profile, that share a lot of content,
          have a beautyful feed and share pictures that gives you a lot of
          inspiration. Our sosial media will help you get a better view on how
          the products looks and how you can style it.
        </p>
      </div>
    </div>
  );
};

export default About;

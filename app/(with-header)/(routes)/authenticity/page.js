import Image from "next/image";

const Authenticity = () => {
  return (
    <div className="w-[90%] mx-[5%] md/lg:w-[80%] md/lg:mx-[10%] lg:w-[60%] lg:mx-[20%] flex flex-col items-center justify-center my-36 md:my-48 space-y-24 md:space-y-36">
      <h1 className="w-full text-2xl flex items-center justify-center">
        Autentisitet
      </h1>
      <section className="w-full flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-[30%]">
        <div className="w-full md:w-[45%] space-y-6">
          <h2 className="font-normal text-xl flex w-full items-center justify-center">
            Vårt samarbeid
          </h2>
          <div className="flex flex-col space-y-4">
            <p className="leading-9">
              Vi samarbeider med Legitgrails. Legitgrails autentiserer alle våre
              produkter, og sammen med de gir vi dere et autensitetsbevis fra
              Merle
            </p>
          </div>
        </div>
        <div className="w-full md:w-[25%] hidden md:flex">
          <Image
            src="/images/authenticity/authenticity1.png"
            alt="image"
            width={495}
            height={703}
            objectFit="cover"
            priority={true}
          />
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-[20%]">
        <div className="w-full md:w-[45%] space-y-6">
          <h3 className="font-normal text-xl flex w-full items-center justify-center">
            Om Legitgrails
          </h3>
          <div className="flex flex-col space-y-4">
            <p className="leading-9">
              Legitgrails har mange år med autensitets erfaring, med over 500
              000 autentiserte produkter. Legitgrails har sertifiserte
              autentikatorer med en nøyaktighetsgrad på over 99% og erfaring med
              å videreselge og jobbe direkte med kjente merkevarer. Les mer om
              legitgrails her:
              https://legitgrails.com/pages/our-authentication-experts
            </p>
          </div>
        </div>
        <div className="w-full md:w-[35%]">
          <Image
            src="/images/authenticity/authenticity2.png"
            alt="image"
            width={495}
            height={703}
            objectFit="cover"
            priority={true}
          />
        </div>
      </section>
    </div>
  );
};

export default Authenticity;

/* <>
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
          <div className="w-2/5"></div>
          </div>
          </div>
        </> */

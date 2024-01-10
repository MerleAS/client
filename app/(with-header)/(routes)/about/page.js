import Image from "next/image";

const About = () => {
  return (
    <div className="w-[90%] mx-[5%] md/lg:w-[80%] md/lg:mx-[10%] lg:w-[60%] lg:mx-[20%] flex flex-col items-center justify-center my-36 md:my-48 space-y-24 md:space-y-48">
      <section className="w-full flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-[10%]">
        <div className="w-full md:w-[45%] space-y-6">
          <h1 className="font-normal text-xl flex w-full items-center justify-center">Om oss</h1>
          <div className="flex flex-col space-y-4">
            <p className="leading-9">
              Vi deler vår interesse innenfor mote, og selger populære seconhand
              og vintage produkter fra kjente merker som Dior, Louis Vuitton,
              Chloe, Chanel, Celine, Bottega Veneta osv.
            </p>
            <p className="leading-9">
              Vårt mål i Merle er å gi deg inspirasjon til å bruke vintage og
              secondhand produkter, dette gir vi gjennom våre sosiale medier og
              nettsiden. Vi vil vise produktene fra sin beste side og inspirere
              deg til hvordan du kan style våre vintage og secondhand produkter
            </p>
          </div>
        </div>
        <div className="w-full md:w-[45%]">
          <Image
            src="/images/about/about1.png"
            alt="image"
            width={495}
            height={703}
            objectFit="cover"
            priority={true}
          />
        </div>
      </section>
      <section className="w-full flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-[10%]">
        <div className="w-full md:w-[45%] space-y-6">
          <h2 className="font-normal text-xl flex w-full items-center justify-center">Våre produkter</h2>
          <div className="flex flex-col space-y-4">
            <p className="leading-9">
              Produktene våre er nøye fotografert, hvor vi prøver å vise så
              nøyaktig som mulig hvilke stand produktene er i. Vær oppmerksom på
              at vintage varer kan ha mindre flekker enn hva som kommer frem i
              teksten eller på bildene. På brukte varer er det ingen
              reklamasjonsrett og de blir solgt “som de er”, men vi har 14
              dagers returrett på alle varer som har overhold reglene for retur,
              blant annet at tagen må være bevart på og at produktene må være i
              nøyaktig samme stand som da vi sendte den. Dersom man trenger å
              reparere vintagevarer anbefales det å oppsøke en lærmasker som er
              eksperter i dette feltet. Vi reparerer ingen vintage produkter.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[45%]">
          <Image
            src="/images/about/about2.png"
            alt="image"
            width={495}
            height={703}
            objectFit="cover"
            priority={true}
          />
        </div>
      </section>
      <section className="w-full flex flex-col-reverse md:flex-row space-y-12 md:space-y-0 md:space-x-[10%]">
        <div className="w-full md:w-[45%] hidden md:flex">
          <Image
            src="/images/about/about3.png"
            alt="image"
            width={495}
            height={703}
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="w-full md:w-[45%] space-y-6">
          <h3 className="font-normal text-xl flex w-full items-center justify-center">Vintage og secondhand</h3>
          <div className="flex flex-col space-y-4">
            <p className="leading-9">
              Vintage og seconhand produkter har virkelig blitt populært og
              trendy for tiden. Nå er det nesten mer populært å kjøpe brukt enn
              nytt!
            </p>
            <p className="leading-9">
              Vi ønsker å følge moten og vise deg hvordan man kan style vintage
              produkter og hvordan du kan sette sammen en stilfull og klassisk
              vintage look!
            </p>
            <p className="leading-9">
              Kjøp og salg av vintage og seconhand produkter bidrar til en mer
              bærekraftig verden. Vi ønsker å gi deg mer inspirasjon til å kjøpe
              vintage og sacondhand produkter.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
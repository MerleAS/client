"use server";

import DropDown from "../../../../components/UI/dropDown";

const questionsList = [
  {
    question: "Autentisering",
    anwser:
      "Vi samarbeider med Legitgrails. Legitgrails autentiserer alle våre produkter, og sammen med de gir vi dere et autensitetsbevis fra Merle. Les mer om dette på vår autensitets side. ",
  },
  {
    question: "Leveringstid ",
    anwser:
      "Alle våre pakker blir sendt med posten eller helthjem. Både Posten og helthjem har en leveringstid på 2- 5 dager   ",
  },
  {
    question: "Våre produkter",
    anwser:
      "Produktene våre er nøye fotografert, hvor vi prøver å vise så nøyaktig som mulig hvilke stand produktene er i. Vær oppmerksom på at vintage varer kan ha mindre flekker enn hva som kommer frem i teksten eller på bildene. Les mer om dette på “Om oss” siden. ",
  },
  {
    question: "Frakt ",
    anwser:
      "Vi sender våre bestillinger med Helthjem eller Posten, etter hva du foretrekker. Posten og Helthjem er to kjente og trygge frakt byråer, hvor du får sporing på pakken din og rask levering",
  },
  {
    question: "Retur",
    anwser:
      "Angrer du på et kjøp fra oss, gjelder angrerettloven. Vi har 14 dagers angrerett fra kjøpsdato. Dersom du ønsker å returnere varen, må du sende en epost til post@MERLE.no og informere oss om at du ønsker å returnere varen. Pakken må sendes tilbake til oss med sporing fra postkontoret (du betaler fraktkostnaden for returen) og du må sende oss sporingsnummeret slik at vi kan spore pakken. Alle merker og original plaggmerke/tråd må fortsatt festes til varen ved retur. Vi har nøye fotografert varen før vi sender den ut og krever at varen returneres i samme stand som den ble mottatt. Vi tolererer ikke å ta tilbake varer som har vært brukt eller hvor lappen ikke lenger er festet til varen. Vi overfører pengene tilbake til kortet som ble brukt ved bestilling av varen - og du får pengene tilbake 4-10 virkedager etter at vi har mottatt varen i retur.​",
  },
  {
    question: "Levering",
    anwser:
      "Pakken din vil bli levert til der du bor eller til en butikk eller pakke boks nærme der du bor. Alt dette blir oppdatert med frakt byrået som frakter din pakke",
  },
  {
    question: "Hvis du ikke henter pakken din og forholder deg passiv ",
    anwser:
      "Dersom du ikke henter bestillingen og ellers er helt passiv, vil dette ikke gi oss noen indikasjon på hvorfor pakken ikke er hentet. Du vil da ikke ha oppfylt kravene som stilles til deg i henhold til § 11 og § 13 i angrerettloven, og mister dermed retten til å si opp avtalen. Når bestillingen er returnert som ikke levert, vil den bli kreditert i sin helhet (minus håndteringsgebyr) og varen(e) vil bli returnert til lager. Håndteringskostnaden inkluderer porto to veier (kr 80 x 2) pluss et uavkrevet gebyr på kr. 500 - totalt 660 kr.",
  },
];

const FAQ = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col items-center justify-center my-[5%] space-y-16 px-8 md:px-12 lg:px-16 pb-12 h-inherit">
        <h1 className="w-full flex items-center justify-center text-lg md:text-2xl font-medium text-center">
          Ofte stilte spørsmål
        </h1>
        <div className="w-full md:w-[90%] md/lg:w-4/5 flex flex-col md/lg:grid md/lg:grid-cols-2 gap-[5%]">
          {questionsList.map((item, index) => (
            <DropDown placeholder={item.question} key={index}>
              <p className="leading-8 font-light">{item.anwser}</p>
            </DropDown>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

const content = [
  {
    heading: "Kontakt oss",
    content:
      "Du kan kontakte oss på tlf: 97655367, mail: post@merle.no eller i kontaktskjemaet vårt som du finner en lenke til nederst på siden.",
  },
  {
    heading: "Pris",
    content:
      "Den oppgitte prisen for varen er inkludert avgifter som MVA. Den endelige summen er prisen for alle varene pluss frakt. ",
  },
  {
    heading: "Betaling",
    content:
      "Ved bestilling, vil det totale beløpet bli reservert på kontoen til kjøperen. Pengene vil ikke bli trukket før bestillingen har blitt levert. du kan velge mellom å betale med kort eller med vipps.",
  },
  {
    heading: "Levering",
    content: "Levering er skjedd når kjøperen, eller hans representant, har overtatt tingen. Hvis ikke leveringstidspunkt fremgår av bestillingsløsningen, skal selgeren levere varen til kjøper uten unødig opphold og senest 30 dager etter bestillingen fra kunden. Varen skal leveres hos kjøperen med mindre annet er særskilt avtalt mellom partene.",
  },
  {
    heading: "Angrerett og Retur",
    content:
      "Dersom du angrer på kjøp hos oss, er det angrerettloven som gjelder. Vi har 14 dagers angrerett fra kjøpsdatoen. Retur gjelder under prinsippene at alle originale lapper og tags må være bevart på produktet slik det opprinnelig var. Produktet må være i samme stand som de nøye fotograferte bildene vi har av produktet. Vi tar ikke imot varen dersom de originale lappene på produktet ikke henger på og dersom varen er brukt. Dersom du vil sende varen i retur må du sende en mail til post@merle.no og informere oss om at du ønsker å sende varen i retur. Pakken må sendes tilbake til oss med sporing fra posten (du betaler fraktkostnaden for returen) og du må sende over sporingsnummeret til oss slik at vi får sporet pakken.",
  },
  {
    heading: "Reklamasjonsrett",
    content:
      "Ved kjøp og salg av brukt varer gjelder forbruksloven § 17. Vi beskriver varenes tilstand så nøye og oppriktig som mulig, men vi kan ikke garantere produktenes tilstand utover det som er synlig ved det blotte øyet, ettersom de er brukt. Dersom produktet / produktene dere mottar er i betydelig dårligere stand enn det som ble reklamert har dere rett til å klage.",
  },
  {
    heading: "Mangel på varen",
    content:
      "Hvis det foreligger en mangel ved varen må kjøper innen rimelig tid etter at den ble oppdaget eller burde ha blitt oppdaget, gi selger melding om at han eller hun vil påberope seg mangelen. Kjøper har alltid reklamert tidsnok dersom det skjer innen 2 mnd. fra mangelen ble oppdaget eller burde blitt oppdaget. Dersom varen er utsolgt vil kjøper bli informert på sms eller mail, og bli refundert det totale beløpet på den kontoen kjøperen betalte fra.",
  },
  {
    heading: "Konfliktløsning",
    content:
      "Klager rettes til selger innen rimelig tid, jf. punkt 9 og 10. Partene skal forsøke å løse eventuelle tvister i minnelighet. Dersom dette ikke lykkes, kan kjøperen ta kontakt med Forbrukertilsynet for mekling. Forbrukertilsynet er tilgjengelig  på  telefon 23  400  600  eller www.forbrukertilsynet.no Europa-Kommisjonens klageportal kan også brukes hvis du ønsker å inngi en klage. Det er særlig relevant, hvis du er forbruker bosatt i et annet EU-land. Klagen inngis her: http://ec.europa.eu/odr.",
  },
];

const TermsOfService = () => {

  
  return (
    <>
      <Header />
      <ul className="min-h-full p-8 md:p-16 lg:p-24 space-y-8">
        {content.map((item, index) => (
          <li key={index}>
            <h3 className="text-lg font-medium leading-8">{item.heading}</h3>
            <p className="leading-8">{item.content}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
};

export default TermsOfService;

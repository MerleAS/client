import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

const content = [
  {
    heading: "Betaling",
    content: "Ved bestilling, vil det totale beløpet bli reservert på kontoen til kjøperen. Pengene vil ikke bli trukket før bestillingen har blitt levert",
  },
  {
    heading: "Mangel på varen",
    content:
      "Dersom varen er utsolgt vil kjøper bli informert på sms eller mail, og bli refundert det totale beløpet på den kontoen kjøperen betalte fra.",
  },
  {
    heading: "Retur",
    content:
      "Dersom du angrer på kjøp hos oss, er det angrerettloven som gjelder. Vi har 14 dagers angrerett fra kjøpsdatoen. Retur gjelder under prinsippene at alle originale lapper og tags må være bevart på produktet slik det opprinnelig var. Produktet må være i samme stand som de nøye fotograferte bildene vi har av produktet. Vi tar ikke imot varen dersom de originale lappene på produktet ikke henger på og dersom varen er brukt. Dersom du vil sende varen i retur må du sende en mail til post@merle.no og informere oss om at du ønsker å sende varen i retur. Pakken må sendes tilbake til oss med sporing fra posten (du betaler fraktkostnaden for returen) og du må sende over sporingsnummeret til oss slik at vi får sporet pakken",
  },
  {
    heading: "Reklamasjonsrett",
    content:
      "Ved kjøp og salg av brukt varer gjelder forbruksloven § 17. Varene vi selger er vintage og er ofte mange år gamle, det er derfor ikke reklamasjonsrett på våre produkter. Vi beskriver varenes tilstand så nøye og oppriktig som mulig, men vi kan ikke garantere produktenes tilstand utover det som er synlig ved det blotte øyet, ettersom de er brukt.",
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

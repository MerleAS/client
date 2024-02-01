import Nav from "../../components/layout/nav";

export const metadata = {
  title: "MERLE",
  description:
    "Merle er en norsk nettbutikk som selger moterelaterte vintageprodukter som klær, vesker og annet tilbehør",
};

export default function WithHeaderLayout({ children }) {
  return (
    <>
      <Nav />
      <div className="mt-20 md:mt-40">{children}</div>
    </>
  );
}

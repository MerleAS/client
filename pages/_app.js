import "../styles/globals.css";
import Head from "next/head";
import StateContextProvider from "../context/stateContext";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Error from "../components/layout/error";

import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <title>MERLE</title>
      </Head>
      <StateContextProvider>
        {!asPath.includes("/checkout") && <Header />}
        <div className="mt-20">
          <Component {...pageProps} />
        </div>
        <Error />
      </StateContextProvider>
      <Footer />
    </>
  );
}

export default MyApp;

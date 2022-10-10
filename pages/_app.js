import "../styles/globals.css";
import StateContextProvider from "../context/stateContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </>
  );
}

export default MyApp;

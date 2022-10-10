import { createContext, useEffect, useState } from "react";

export const StateContext = createContext({
  setIsMobile: () => {},
  setIsAndroid: () => {},
  setIsIPhone: () => {},
});


const StateContextProvider = (props) => {

  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);
  const [serverUrl] = useState('http://localhost:8080');

  useEffect(() => {
    if (navigator.userAgent.match("Android")) {
      setIsMobile(true)
      setIsAndroid(true)
    } else if (navigator.userAgent.match("Macintosh")) {
      setIsMobile(true)
      setIsIPhone(true)
    }
  },[])

  return (
    <StateContext.Provider
      value={{
        isMobile,
        setIsMobile,
        isAndroid,
        setIsAndroid,
        isIPhone,
        setIsIPhone,
        serverUrl,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;

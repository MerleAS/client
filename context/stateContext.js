import { createContext, useState } from "react";

export const StateContext = createContext({});


const StateContextProvider = (props) => {

  const [serverUrl] = useState('http://localhost:8080/');

  return (
    <StateContext.Provider
      value={{
        serverUrl,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;

import {createContext, useState} from "react";

const Context = createContext<any>(null);

const ContextProvider = ({children}: any) => {
  const [ctx, setCtx] = useState<any>({
    text: '',
    yearStart: '',
    yearEnd: '',
    nasaData: [],
  });

  return (
    <Context.Provider value={{ctx, setCtx}}>
      {children}
    </Context.Provider>
  );
};

export {Context, ContextProvider};
import React from "react";

export const createContext = <T extends object>() => {
  const Context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const ctx = React.useContext(Context);

    if (!ctx) {
      throw new Error(`useContext must be inside a Provider and a value must be provided`);
    }

    return ctx;
  };

  return { useContext, ContextProvider: Context.Provider };
};
import React from "react";
import { useStore as useZustandStore } from 'zustand'

export const createContext = <T extends object>() => {
  const Context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const ctx = React.useContext(Context);

    if (!ctx) {
      throw new Error(`useContext must be inside a Provider and a value must be provided`);
    }

    return ctx;
  };

  const useStore = () => {}

  return { useContext, ContextProvider: Context.Provider };
};
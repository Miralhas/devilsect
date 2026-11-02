import React from "react";
import { StoreApi, useStore as useZustandStore } from 'zustand'

export const createContext = <S, T extends StoreApi<S>>() => {
  const Context = React.createContext<T | undefined>(undefined);

  const useStore = (selector: (store: S) => S) => {
    const ctx = React.useContext(Context);

    if (!ctx) {
      throw new Error(`useContext must be inside a Provider and a value must be provided`);
    }

    return useZustandStore(ctx, selector);
  }

  return { useStore, ContextProvider: Context.Provider };
};
'use client'

import { PropsWithChildren, useState } from "react";
import { createContext } from "./create-context";

type GlobalLoginState = {
  open: boolean;
}

type GlobalLoginActions = {
  handleOpen: () => void;
  close: () => void;
}

const initialValues: GlobalLoginState = {
  open: false,
}

const { ContextProvider, useContext } = createContext<GlobalLoginState & GlobalLoginActions>();

export const GlobalLoginProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(initialValues["open"]);

  const handleOpen = () => setOpen(prev => !prev); 
  const close = () => setOpen(false);

  return (
    <ContextProvider value={{
      open,
      handleOpen,
      close
    }}>
      {children}
    </ContextProvider>
  )
} 

export const useGlobalLoginContext = useContext;
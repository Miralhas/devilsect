'use client'

import { User } from "@/types/authentication";
import { PropsWithChildren, useState } from "react";
import { createContext } from "./create-context";
import { useAuthContext } from "./use-auth-context";

type GlobalLoginState = {
  open: boolean;
  currentUser: User | undefined;
}

type GlobalLoginActions = {
  handleOpen: () => void;
  close: () => void;
}

const initialValues: GlobalLoginState = {
  open: false,
  currentUser: undefined,
}

const { ContextProvider, useContext } = createContext<GlobalLoginState & GlobalLoginActions>();

export const GlobalLoginProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(initialValues["open"]);
  const { authState } = useAuthContext();

  const handleOpen = () => setOpen(prev => !prev);
  const close = () => setOpen(false);

  return (
    <ContextProvider value={{
      open,
      handleOpen,
      close,
      currentUser: authState?.user
    }}>
      {children}
    </ContextProvider>
  )
}

export const useGlobalLoginContext = useContext;
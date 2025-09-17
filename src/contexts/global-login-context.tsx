'use client'

import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";
import { useCurrentUserQuery } from "@/services/authentication/client-queries";
import { User } from "@/types/authentication";

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
  const query = useCurrentUserQuery();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (query.isLoading || query.isError) return setCurrentUser(undefined);
    if (query.isSuccess) {
      setCurrentUser(query.data);
    }
  }, [query.isLoading, query.isError, query.isSuccess, query.data]);

  const handleOpen = () => setOpen(prev => !prev);
  const close = () => setOpen(false);

  return (
    <ContextProvider value={{
      open,
      handleOpen,
      close,
      currentUser
    }}>
      {children}
    </ContextProvider>
  )
}

export const useGlobalLoginContext = useContext;
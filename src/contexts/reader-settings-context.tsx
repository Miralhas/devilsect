'use client'

import { createReaderSettingsStore, initialReaderSettingsValues, ReaderSettingsStore } from "@/stores/reader-settings-store";
import { PropsWithChildren, useState } from "react";
import { createContext } from "./create-store-context";
import { useIsMobile } from "@/hooks/use-mobile";

export type GlobalReaderSettingsApi = ReturnType<typeof createReaderSettingsStore>;

const { ContextProvider, useStore } = createContext<ReaderSettingsStore, GlobalReaderSettingsApi>();

export const ReaderProvider = ({ children }: PropsWithChildren) => {
  const isMobile =  useIsMobile();
  const [store] = useState(() => createReaderSettingsStore(initialReaderSettingsValues, isMobile));
  return (
    <ContextProvider value={store}>
      {children}
    </ContextProvider>
  )
}

export const useReaderSettingsStore = useStore;

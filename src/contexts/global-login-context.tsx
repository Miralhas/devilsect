'use client'

import { PropsWithChildren, useState } from 'react';

import { createGlobalLoginStore, GlobalLoginStore } from '@/stores/global-login-store';
import { createContext } from './create-store-context';

export type GlobalLoginApi = ReturnType<typeof createGlobalLoginStore>;

const { ContextProvider, useStore } = createContext<GlobalLoginStore, GlobalLoginApi>();

export const GlobalLoginProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() => createGlobalLoginStore());
  return (
    <ContextProvider value={store}>
      {children}
    </ContextProvider>
  )
}

export const useGlobalLoginStore = useStore;
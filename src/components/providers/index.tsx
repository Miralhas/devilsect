'use client'

import { GlobalLoginProvider } from '@/contexts/global-login-context';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

// SSR Documentation: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 2,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoginProvider>
        {children}
      </GlobalLoginProvider>
    </QueryClientProvider>
  )
}

export default Providers;

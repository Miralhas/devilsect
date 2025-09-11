'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GlobalLoginProvider } from '@/contexts/global-login-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000 // 2 minutes
    }
  }
});

const Providers = ({ children }: PropsWithChildren) => {

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <GlobalLoginProvider>
          {children}
        </GlobalLoginProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  )
}

export default Providers;

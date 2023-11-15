import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  createTRPCClient,
  createTRPCProxyClient,
  httpBatchLink,
} from '@trpc/client';
import Constants from 'react-native';
import React, {useState} from 'react';
import {createTRPCReact} from '@trpc/react-query';
import {AppRouter} from '../../../backend/trpc/router';

type AppProps = {
  children?: React.ReactNode;
};

export const apiBaseUrl = `${''}/api/trpc`;

const trpc = createtr<AppRouter>();

export function TRPCProvider({children}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/trpc',
        // You can pass any HTTP headers you wish here
        // async headers() {
        //   return {
        //     authorization: getAuthCookie(),
        //   };
        // },
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigators';
import {httpBatchLink} from '@trpc/client';
import {trpc} from './src/utils/trpc';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {ThemeProvider} from 'styled-components';
import theme from '@app/lib/styles/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
// import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

function App() {
  const apiBaseUrl = `http://localhost:3000/trpc`;
  // const [queryClient] = useState(() => new QueryClient());

  const queryClient = new QueryClient();

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: apiBaseUrl,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {/* <QueryClientProvider client={queryClient}>
        <SafeAreaProvider style={{backgroundColor: 'red'}}>
          <AppNavigator />
        </SafeAreaProvider>
      </QueryClientProvider> */}

      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister: asyncStoragePersister}}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <AppNavigator />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistQueryClientProvider>
    </trpc.Provider>
  );
}

export default App;

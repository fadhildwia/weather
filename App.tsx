import 'react-native-gesture-handler';

import React from 'react';

import Routes from './src/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;

import React from 'react';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </QueryClientProvider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);

export default App;
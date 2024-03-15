import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Login, Register, Loading, Dashboard } from './pages';
import { AudioPlayerProvider } from './contexts/playerContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/loading',
    element: <Loading />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

const customTheme = extendTheme({
  components: {
    Toast: {},
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: '#f68f32',
        },
      },
    },
    Slider: {
      baseStyle: {
        filledTrack: {
          bg: '#f68f32',
        },
      },
    },
    Text: {
      baseStyle: {
        color: '#ffffff',
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <AudioPlayerProvider>
          <RouterProvider router={router} />
        </AudioPlayerProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

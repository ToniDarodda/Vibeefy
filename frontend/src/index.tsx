/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Loading } from './pages';
import { AudioPlayerProvider } from './contexts/player.context';
import { ViewStateProvider } from './contexts/viewState.context';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { Album } from './pages/album';
import { Playlist } from './pages/playlist';
import { Search } from './pages/search';
import { Layout } from './pages/layout';
import { EmptySearch } from './pages/emptySearch';
import { SearchProvider } from './contexts/search.context';
import { Artist } from './pages/artist';

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
    element: <Layout />,
    children: [
      { index: true, element: <EmptySearch /> },
      { path: 'search', element: <EmptySearch /> },
      { path: 'search/:name', element: <Search /> },
      { path: 'artist/:id', element: <Artist /> },
      { path: 'album/:albumId', element: <Album /> },
      { path: 'playlist/:playlistId', element: <Playlist /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/loading', element: <Loading /> },
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
          <ViewStateProvider>
            <SearchProvider>
              <RouterProvider router={router} />
            </SearchProvider>
          </ViewStateProvider>
        </AudioPlayerProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

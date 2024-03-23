import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AudioPlayerProvider } from './contexts/player.context';
import { ViewStateProvider } from './contexts/viewState.context';
import { SearchProvider } from './contexts/search.context';
import {
  Layout,
  EmptySearch,
  Artist,
  Album,
  Playlist,
  Collection,
  Login,
  Loading,
  Search,
  Register,
} from './pages';

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
      { path: 'collection/tracks', element: <Collection /> },
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

import { createBrowserRouter } from 'react-router-dom'
import {
  LazyPage,
  RequireAuth,
  RequireGuest,
  RequireRole,
  RootLayout
} from './Layout'

import { Admin, Cats, Home, Login, NotFound } from '@/views/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <Home />
          </LazyPage>
        )
      },
      {
        element: <RequireGuest />,
        children: [
          {
            path: 'login',
            element: (
              <LazyPage>
                <Login />
              </LazyPage>
            )
          }
        ]
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'cats',
            element: (
              <LazyPage>
                <Cats />
              </LazyPage>
            )
          }
        ]
      },
      {
        element: <RequireRole role="admin" />,
        children: [
          {
            path: 'admin',
            element: (
              <LazyPage>
                <Admin />
              </LazyPage>
            )
          }
        ]
      },
      {
        path: '*',
        element: (
          <LazyPage>
            <NotFound />
          </LazyPage>
        )
      }
    ]
  }
])

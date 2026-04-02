import {
  createBrowserRouter,
  Navigate,
  Outlet
} from 'react-router-dom'
import IoC from '@/ioc'
import { SERVICES, type IAuthService, type User } from '@/types'
import './router.css'

import Admin from '@/views/pages/admin/Admin'
import Cats from '@/views/pages/cats/Cats'
import Home from '@/views/pages/home/Home'
import Login from '@/views/pages/login/Login'
import Sidebar from './Sidebar'

const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

function getUser(): User | null {
  return authService.getUser()
}

function RootLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  )
}

function RequireAuth() {
  const user = getUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function RequireGuest() {
  const user = getUser()

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function RequireRole({ role }: { role: 'admin' | 'user' }) {
  const user = getUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      {
        element: <RequireGuest />,
        children: [{ path: 'login', element: <Login /> }]
      },

      {
        element: <RequireAuth />,
        children: [{ path: 'cats', element: <Cats /> }]
      },

      {
        element: <RequireRole role="admin" />,
        children: [{ path: 'admin', element: <Admin /> }]
      }
    ]
  }
])

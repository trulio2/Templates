import {
  createBrowserRouter,
  NavLink,
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

const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

function getUser(): User | null {
  return authService.getUser()
}

function logout() {
  authService.logout()
}

function RootLayout() {
  const user = getUser()

  return (
    <div>
      <div className="router-nav">
        <NavLink to="/">Home</NavLink>

        {user && <NavLink to="/cats">Cats</NavLink>}

        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}

        {!user && <NavLink to="/login">Login</NavLink>}

        {user && <button onClick={() => logout()}>Logout</button>}

        <span>{user?.name}</span>
      </div>

      <Outlet />
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

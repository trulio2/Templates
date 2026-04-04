import { useState } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import IoC from '@/ioc'
import { init } from '@/setup'
import {
  SERVICES,
  type IAuthService,
  type IRootService,
  type User
} from '@/types'
import './router.css'

import Admin from '@/views/pages/admin/Admin'
import Cats from '@/views/pages/cats/Cats'
import Home from '@/views/pages/home/Home'
import Login from '@/views/pages/login/Login'
import NotFound from '@/views/pages/notFound/NotFound'
import Sidebar from '@/views/components/Sidebar'

const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
const rootService = IoC.getOrCreateInstance<IRootService>(SERVICES.ROOT)

function getUser(): User | null {
  return authService.getUser()
}

function RootLayout() {
  init()

  const initialized = rootService.getInitialized()

  const [collapsed, setCollapsed] = useState(false)

  if (!initialized) {
    return (
      <div className="flex min-h-screen">
        <main className={'flex-1 transition-all duration-300 ml-64'}></main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}
      >
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
      },

      { path: '*', element: <NotFound /> }
    ]
  }
])

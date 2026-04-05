import { Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import IoC from '@/ioc'
import type { AuthService, RootService } from '@/modules'
import { init } from '@/setup'
import { SERVICES, type User } from '@/types'
import { Sidebar } from '@/views/components'

const authService = IoC.getOrCreateInstance<AuthService>(SERVICES.AUTH)
const rootService = IoC.getOrCreateInstance<RootService>(SERVICES.ROOT)

function getUser(): User | null {
  return authService.getUser()
}

function RootLayout() {
  useEffect(() => {
    init()
  }, [])

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

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export { LazyPage, RootLayout, RequireAuth, RequireGuest, RequireRole }

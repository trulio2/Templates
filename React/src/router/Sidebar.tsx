import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from '@/locale'
import IoC from '@/ioc'
import { SERVICES, type IAuthService, type User } from '@/types'

const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

function getUser(): User | null {
  return authService.getUser()
}

function logout() {
  authService.logout()
}

export default function Sidebar() {
  const { t } = useTranslation()

  const user = getUser()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[var(--bg)] border-r border-[var(--border)] transition-all duration-300 ease-in-out z-50 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-[var(--accent)] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        {collapsed ? '→' : '←'}
      </button>

      <nav className="flex flex-col p-4 gap-2 pt-12">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition-colors ${
              isActive
                ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                : 'text-[var(--text)] hover:bg-[var(--accent-bg)]'
            } ${collapsed ? 'text-center' : ''}`
          }
          title={collapsed ? t('nav.home') : undefined}
        >
          {collapsed ? '🏠' : t('nav.home')}
        </NavLink>

        {user && (
          <NavLink
            to="/cats"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors ${
                isActive
                  ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                  : 'text-[var(--text)] hover:bg-[var(--accent-bg)]'
              } ${collapsed ? 'text-center' : ''}`
            }
            title={collapsed ? t('nav.cats') : undefined}
          >
            {collapsed ? '🐱' : t('nav.cats')}
          </NavLink>
        )}

        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors ${
                isActive
                  ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                  : 'text-[var(--text)] hover:bg-[var(--accent-bg)]'
              } ${collapsed ? 'text-center' : ''}`
            }
            title={collapsed ? t('nav.admin') : undefined}
          >
            {collapsed ? '⚙️' : t('nav.admin')}
          </NavLink>
        )}

        {!user && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors ${
                isActive
                  ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                  : 'text-[var(--text)] hover:bg-[var(--accent-bg)]'
              } ${collapsed ? 'text-center' : ''}`
            }
            title={collapsed ? t('nav.login') : undefined}
          >
            {collapsed ? '🔑' : t('nav.login')}
          </NavLink>
        )}
      </nav>

      {user && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          {collapsed ? (
            <button
              onClick={() => logout()}
              className="w-full text-center text-lg"
              title={t('nav.logout')}
            >
              🚪
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-[var(--text)] text-sm">{user.name}</span>
              <button
                onClick={() => logout()}
                className="text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm text-left"
              >
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

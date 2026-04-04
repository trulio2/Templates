import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation, useTheme } from '@/hooks'
import IoC from '@/ioc'
import {
  SERVICES,
  type IAuthService,
  type ILocaleService,
  type Locale,
  type Theme,
  type User
} from '@/types'

const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
const localeService = IoC.getOrCreateInstance<ILocaleService>(SERVICES.LOCALE)

function getUser(): User | null {
  return authService.getUser()
}

function logout() {
  authService.logout()
}

export default function Sidebar() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const [collapsed, setCollapsed] = useState(false)

  const user = getUser()
  const locale = localeService.getLocale()

  function setLocale(newLocale: Locale) {
    localeService.setLocale(newLocale)
  }

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

      <div className="absolute  left-0 right-0 px-4 flex flex-col gap-2">
        {!collapsed && (
          <>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="w-full px-2 py-1.5 text-sm border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text)] cursor-pointer focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="w-full px-2 py-1.5 text-sm border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text)] cursor-pointer focus:outline-none focus:border-[var(--accent)]"
            >
              <option value="light">{t('theme.light')}</option>
              <option value="dark">{t('theme.dark')}</option>
            </select>
          </>
        )}
      </div>

      {user && (
        <div className="absolute bottom-14 left-0 right-0 px-4">
          {collapsed ? (
            <button
              onClick={() => logout()}
              className="w-full text-center text-lg cursor-pointer"
              title={t('nav.logout')}
            >
              🚪
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => logout()}
                className="w-full text-center text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm cursor-pointer"
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

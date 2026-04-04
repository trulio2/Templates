import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/hooks'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'

function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setError('')

    if (!username.trim()) {
      setError(t('pages.login.usernameRequired'))
      return
    }

    if (!password.trim()) {
      setError(t('pages.login.passwordRequired'))
      return
    }

    const success = authService.login(username, password)

    if (success) {
      navigate('/')
    } else {
      setError(t('pages.login.invalidCredentials'))
    }
  }

  return (
    <>
      <section id="center">
        <h1>{t('pages.login.title')}</h1>

        <form
          className="flex flex-col gap-5 w-full max-w-[360px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="username" className="text-sm text-[var(--text-h)]">
              {t('pages.login.username')}
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('pages.login.enterUsername')}
              className="px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text-h)] text-base font-[var(--sans)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text)] placeholder:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="password" className="text-sm text-[var(--text-h)]">
              {t('pages.login.password')}
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('pages.login.enterPassword')}
              className="px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text-h)] text-base font-[var(--sans)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text)] placeholder:opacity-60"
            />
          </div>

          {error && <p className="text-red-500 text-sm m-0">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-[var(--accent)] text-white border-none rounded-md cursor-pointer font-[var(--mono)] text-base transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          >
            {t('pages.login.submit')}
          </button>
        </form>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Login

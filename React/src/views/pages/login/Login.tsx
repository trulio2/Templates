import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/hooks'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'
import { Button, Input } from '@/views/components'

function Login() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const { t } = useTranslation()
  const navigate = useNavigate()

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
    <Suspense fallback={null}>
      <section id="center">
        <h1>{t('pages.login.title')}</h1>

        <form
          className="flex flex-col gap-5 w-full max-w-[360px]"
          onSubmit={handleSubmit}
        >
          <Input
            id="username"
            type="text"
            size="lg"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={t('pages.login.username')}
            placeholder={t('pages.login.enterUsername')}
          />

          <Input
            id="password"
            type="password"
            size="lg"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={t('pages.login.password')}
            placeholder={t('pages.login.enterPassword')}
          />

          {error && <p className="text-red-500 text-sm m-0">{error}</p>}

          <Button type="submit" variant="primary" size="lg">
            {t('pages.login.submit')}
          </Button>
        </form>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </Suspense>
  )
}

export default Login

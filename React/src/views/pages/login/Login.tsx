import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'

function Login() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setError('')

    if (!username.trim()) {
      setError('Username is required')
      return
    }

    if (!password.trim()) {
      setError('Password is required')
      return
    }

    const success = authService.login(username, password)

    if (success) {
      navigate('/')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <>
      <section id="center">
        <h1>Login</h1>

        <form
          className="flex flex-col gap-5 w-full max-w-[360px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="username" className="text-sm text-[var(--text-h)]">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text-h)] text-base font-[var(--sans)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text)] placeholder:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="password" className="text-sm text-[var(--text-h)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="px-3 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text-h)] text-base font-[var(--sans)] transition-colors duration-200 focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text)] placeholder:opacity-60"
            />
          </div>

          {error && <p className="text-red-500 text-sm m-0">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-[var(--accent)] text-white border-none rounded-md cursor-pointer font-[var(--mono)] text-base transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
          >
            Login
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

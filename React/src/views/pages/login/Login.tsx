import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'
import './Login.css'

function Login() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
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

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button className="counter" type="submit">
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

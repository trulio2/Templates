import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import heroImg from '@/assets/hero.png'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'
import './Admin.css'

function Admin() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const [count, setCount] = useState(0)
  const user = authService.getUser()

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div></div>
        <button className="counter">User name is {user?.name}</button>
        <button className="counter" onClick={() => setCount(count + 1)}>
          Count {count}
        </button>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Admin

import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import heroImg from '@/assets/hero.png'
import IoC from '@/ioc'
import { type IAuthService, SERVICES, type User } from '@/types'
import './Home.css'

function Home() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const [count, setCount] = useState(0)
  const user = authService.getUser()

  function setUser() {
    const data: User = {
      name: 'User Name',
      role: 'admin'
    }

    authService.setUser(data)
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div></div>
        <button className="counter" onClick={() => setUser()}>
          User name is {user?.name}
        </button>
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

export default Home

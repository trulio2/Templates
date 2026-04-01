import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'
import './Home.css'

function Home() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
  const user = authService.getUser()

  return (
    <>
      <section id="center">
        <h1>Welcome</h1>
        <p>{user ? `Hello, ${user.name}!` : 'Please log in to continue.'}</p>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home

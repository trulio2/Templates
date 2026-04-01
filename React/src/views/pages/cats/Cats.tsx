import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import heroImg from '@/assets/hero.png'
import IoC from '@/ioc'
import { type ICatsService, SERVICES } from '@/types'
import './Cats.css'

function Cats() {
  const catsService = IoC.getOrCreateInstance<ICatsService>(SERVICES.CATS)

  const cats = catsService.getCats()

  function addCat() {
    catsService.addCat()
  }

  function removeCat() {
    catsService.removeCat()
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
        <span>
          {catsService.userName()} has {cats} {cats !== 1 ? 'cats' : 'cat'}
        </span>
        <button className="counter" onClick={() => addCat()}>
          Add Cat
        </button>
        <button className="counter" onClick={() => removeCat()}>
          Remove Cat
        </button>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Cats

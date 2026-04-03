import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import heroImg from '@/assets/hero.png'
import { useTranslation } from '@/locale'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'

function Admin() {
  const { t } = useTranslation()

  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const [count, setCount] = useState(0)
  const user = authService.getUser()

  return (
    <>
      <section id="center">
        <div className="relative [&>*]:inset-x-0 [&>*]:mx-auto">
          <img
            src={heroImg}
            className="relative w-[170px] z-0"
            width="170"
            height="179"
            alt=""
          />
          <img
            src={reactLogo}
            className="absolute z-10 top-[34px] h-7"
            style={{
              transform:
                'perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)'
            }}
            alt="React logo"
          />
          <img
            src={viteLogo}
            className="absolute z-0 top-[107px] h-[26px] w-auto"
            style={{
              transform:
                'perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)'
            }}
            alt="Vite logo"
          />
        </div>
        <div></div>
        <button className="text-[var(--accent)] bg-[var(--accent-bg)] border-2 border-transparent rounded-md px-2.5 py-1.5 text-sm transition-colors duration-300 mb-6 hover:border-[var(--accent-border)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2">
          {t('pages.admin.userName', { name: user?.name ?? '' })}
        </button>
        <button
          className="text-[var(--accent)] bg-[var(--accent-bg)] border-2 border-transparent rounded-md px-2.5 py-1.5 text-sm transition-colors duration-300 mb-6 hover:border-[var(--accent-border)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
          onClick={() => setCount(count + 1)}
        >
          {t('pages.admin.count', { count })}
        </button>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Admin

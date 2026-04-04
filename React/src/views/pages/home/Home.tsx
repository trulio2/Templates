import { useTranslation } from '@/hooks'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'

function Home() {
  const { t } = useTranslation()

  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const user = authService.getUser()

  return (
    <>
      <section id="center">
        <h1>{t('pages.home.welcome')}</h1>
        <p>
          {user
            ? t('pages.home.greeting', { name: user.name })
            : t('pages.home.pleaseLogin')}
        </p>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home

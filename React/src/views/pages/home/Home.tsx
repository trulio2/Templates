import { useEffect } from 'react'
import { useTranslation } from '@/hooks'
import IoC from '@/ioc'
import { type IAuthService, type IBitmexService, SERVICES } from '@/types'
import './Home.css'

function Home() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
  const bitmexService = IoC.getOrCreateInstance<IBitmexService>(SERVICES.BITMEX)

  useEffect(() => {
    bitmexService.subscribe()

    return () => {
      IoC.cleanUp(SERVICES.BITMEX)
    }
  }, [])

  const trade = bitmexService.getTrade()

  const { t } = useTranslation()

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

        {trade && (
          <div>
            <p className={trade.tickDirection}>
              {trade.side} {trade.price}
            </p>
          </div>
        )}
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home

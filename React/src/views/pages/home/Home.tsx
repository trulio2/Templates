import { Suspense, useEffect } from 'react'
import IoC from '@/ioc'
import type { AuthService, BitmexService } from '@/modules'
import { SERVICES } from '@/types'
import './Home.css'

function Home() {
  const authService = IoC.getOrCreateInstance<AuthService>(SERVICES.AUTH)
  const bitmexService = IoC.getOrCreateInstance<BitmexService>(SERVICES.BITMEX)

  useEffect(() => {
    bitmexService.subscribe()

    return () => {
      IoC.cleanUp(SERVICES.BITMEX)
    }
  }, [])

  const trade = bitmexService.getTrade()

  const user = authService.getUser()

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  )
}

export default Home

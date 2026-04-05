import { Suspense, useState } from 'react'
import { useTranslation } from '@/hooks'
import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'
import { Button } from '@/views/components'

function Admin() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const { t } = useTranslation()

  const [count, setCount] = useState(0)
  const user = authService.getUser()

  return (
    <Suspense fallback={null}>
      <section id="center">
        <Button>{t('pages.admin.userName', { name: user?.name ?? '' })}</Button>
        <Button onClick={() => setCount(count + 1)}>
          {t('pages.admin.count', { count })}
        </Button>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </Suspense>
  )
}

export default Admin

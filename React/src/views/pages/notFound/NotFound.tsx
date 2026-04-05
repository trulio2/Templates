import { Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocale } from '@/hooks'

function NotFound() {
  const { t } = useLocale()

  return (
    <Suspense fallback={null}>
      <section id="center">
        <h1 className="text-[var(--accent)]">404</h1>
        <p className="text-lg">{t('pages.notFound.message')}</p>
        <NavLink
          to="/"
          className="px-4 py-2 bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] rounded-md transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        >
          {t('pages.notFound.goBack')}
        </NavLink>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </Suspense>
  )
}

export default NotFound

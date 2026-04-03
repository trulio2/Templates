import { localeStore } from '@/modules'

export default function useTranslation() {
  const locale = localeStore((s) => s.locale)
  const t = localeStore((s) => s.t)

  return { t, locale }
}

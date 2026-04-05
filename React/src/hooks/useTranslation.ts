import IoC from '@/ioc'
import { SERVICES, type ILocaleService } from '@/types'

const localeService = IoC.getOrCreateInstance<ILocaleService>(SERVICES.LOCALE)

export function useTranslation() {
  const locale = localeService.getLocale()
  const t = localeService.getT()

  return { locale, setLocale: localeService.setLocale, t }
}

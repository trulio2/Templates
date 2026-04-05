import IoC from '@/ioc'
import type { LocaleService } from '@/modules'
import { SERVICES } from '@/types'

const localeService = IoC.getOrCreateInstance<LocaleService>(SERVICES.LOCALE)

export default function useLocale() {
  return {
    locale: localeService.getLocale(),
    setLocale: localeService.setLocale,
    t: localeService.getTranslation
  }
}

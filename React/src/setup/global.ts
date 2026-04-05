import IoC from '@/ioc'
import { SERVICES } from '@/types'
import type { LocaleService } from '@/modules'

const localeService = IoC.getOrCreateInstance<LocaleService>(SERVICES.LOCALE)

declare global {
  var t: (key: string, values?: Record<string, unknown>) => string
}

globalThis.t = (key, values = {}) => {
  return localeService.getTranslation(key, values)
}

export {}

import IoC from '@/ioc'
import { SERVICES, type ILocaleService } from '@/types'

const localeService = IoC.getOrCreateInstance<ILocaleService>(SERVICES.LOCALE)

declare global {
  var t: (key: string, values?: Record<string, unknown>) => string
}

globalThis.t = (key, values) => {
  return localeService.getTranslation(key, values)
}

export {}

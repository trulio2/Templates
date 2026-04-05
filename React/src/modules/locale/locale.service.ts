import type { ILocaleService, Locale, T } from '@/types'
import { localeStore } from './locale.store'

class LocaleService implements ILocaleService {
  constructor() {}

  public getLocale(): string {
    return localeStore((state) => state.locale)
  }

  public getT(): T {
    const { t } = localeStore.getState()

    return t
  }

  public setLocale(newLocale: Locale): void {
    const { setLocale } = localeStore.getState()

    setLocale(newLocale)
  }
}

export default LocaleService

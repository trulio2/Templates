import { type ILocaleService, type Locale } from '@/types'
import { localeStore } from './locale.store'

class LocaleService implements ILocaleService {
  constructor() {}

  public getLocale(): string {
    return localeStore((state) => state.locale)
  }

  public setLocale(newLocale: Locale): void {
    const { setLocale } = localeStore.getState()

    setLocale(newLocale)
  }
}

export default LocaleService

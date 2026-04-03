import { type IGetLocaleHook, type ILocaleService, type Locale } from '@/types'
import { localeStore } from './locale.store'

class LocaleService implements ILocaleService {
  constructor() {}

  public getLocaleHook(): IGetLocaleHook {
    return {
      locale: localeStore((state) => state.locale),
      t: localeStore((state) => state.t)
    }
  }

  public getLocale(): string {
    return localeStore((state) => state.locale)
  }

  public setLocale(newLocale: Locale): void {
    const { setLocale } = localeStore.getState()

    setLocale(newLocale)
  }
}

export default LocaleService

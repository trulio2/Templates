interface IPages {
  home: {
    welcome: string
    greeting: string
    pleaseLogin: string
  }
  login: {
    title: string
    username: string
    password: string
    enterUsername: string
    enterPassword: string
    usernameRequired: string
    passwordRequired: string
    invalidCredentials: string
    submit: string
  }
  cats: {
    title: string
    hasCats: string
    addCat: string
    removeCat: string
  }
  admin: {
    title: string
    userName: string
    count: string
  }
}

interface INav {
  home: string
  cats: string
  admin: string
  login: string
  logout: string
}

export interface ITranslations {
  pages: IPages
  nav: INav
  theme: {
    light: string
    dark: string
  }
}

export type T = (key: string, values?: Record<string, unknown>) => string

export type Locale = 'en' | 'pt'

export interface IGetLocaleHook {
  locale: Locale
  t: T
}

export interface ILocaleService {
  getHook(): IGetLocaleHook
  getLocale(): string
  setLocale(newLocale: Locale): void
}

export interface LocaleState {
  locale: Locale
  translations: ITranslations
  setLocale: (locale: Locale) => void
  t: T
}

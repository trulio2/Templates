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
  notFound: {
    title: string
    message: string
    goBack: string
  }
}

interface INav {
  home: string
  cats: string
  admin: string
  login: string
  logout: string
}

interface ITheme {
  light: string
  dark: string
  'dark-purple': string
}

export interface ITranslations {
  pages: IPages
  nav: INav
  theme: ITheme
}

export type T = (key: string, values?: Record<string, unknown>) => string

export type Locale = 'en' | 'pt'

export interface ILocaleService {
  getT(): T
  getLocale(): string
  setLocale(newLocale: Locale): void
}

export interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: T
}

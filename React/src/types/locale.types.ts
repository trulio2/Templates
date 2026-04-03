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
}

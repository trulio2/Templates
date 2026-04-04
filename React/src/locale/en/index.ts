import { type ITranslations } from '@/types'

export const en: ITranslations = {
  pages: {
    home: {
      welcome: 'Welcome',
      greeting: 'Hello, {name}!',
      pleaseLogin: 'Please log in to continue.'
    },
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      enterUsername: 'Enter username',
      enterPassword: 'Enter password',
      usernameRequired: 'Username is required',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid credentials',
      submit: 'Login'
    },
    cats: {
      title: 'Cats',
      hasCats: '{name} has {count} cats',
      addCat: 'Add Cat',
      removeCat: 'Remove Cat'
    },
    admin: {
      title: 'Admin',
      userName: 'User name is {name}',
      count: 'Count {count}'
    },
    notFound: {
      title: 'Page Not Found',
      message: 'The page you are looking for does not exist.',
      goBack: 'Go Home'
    }
  },
  nav: {
    home: 'Home',
    cats: 'Cats',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout'
  },
  theme: {
    light: 'Light',
    dark: 'Dark'
  }
}

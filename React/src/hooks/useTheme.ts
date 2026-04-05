import { useEffect } from 'react'
import IoC from '@/ioc'
import { SERVICES, type IThemeService, type Theme } from '@/types'

const themeService = IoC.getOrCreateInstance<IThemeService>(SERVICES.THEME)

export function useTheme() {
  const theme = themeService.getTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle(
      'dark-purple',
      theme === 'dark-purple'
    )
  }, [theme])

  function setTheme(newTheme: Theme) {
    themeService.setTheme(newTheme)
  }

  return { theme, setTheme }
}

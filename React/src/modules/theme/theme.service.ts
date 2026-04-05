import { type IThemeService, type Theme, THEMES } from '@/types'
import { themeStore } from './theme.store'

class ThemeService implements IThemeService {
  constructor() {}

  public getTheme(): Theme {
    return themeStore((state) => state.theme)
  }

  public setTheme(newTheme: Theme): void {
    const { setTheme } = themeStore.getState()

    document.documentElement.classList.remove(...THEMES)
    document.documentElement.classList.add(newTheme)

    setTheme(newTheme)
  }
}

export default ThemeService

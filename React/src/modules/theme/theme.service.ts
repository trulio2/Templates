import type { IThemeService, Theme } from '@/types'
import { themeStore } from './theme.store'

class ThemeService implements IThemeService {
  constructor() {}

  public getTheme(): Theme {
    return themeStore((state) => state.theme)
  }

  public setTheme(newTheme: Theme): void {
    const { setTheme } = themeStore.getState()

    setTheme(newTheme)
  }
}

export default ThemeService

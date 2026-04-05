export type Theme = 'light' | 'dark' | 'dark-purple'

export const THEMES: Theme[] = ['dark', 'dark-purple', 'light']

export interface IThemeService {
  getTheme(): Theme
  setTheme(newTheme: Theme): void
}

export interface themeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

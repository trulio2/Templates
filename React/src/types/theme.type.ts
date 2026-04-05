export type Theme = 'light' | 'dark' | 'dark-purple'

export interface IThemeService {
  getTheme(): Theme
  setTheme(newTheme: Theme): void
}

export interface themeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

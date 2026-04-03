import { create } from 'zustand'
import { en } from '@/locale/en'
import { pt } from '@/locale/pt'
import type { ITranslations } from '@/types'

type Locale = 'en' | 'pt'

const locales: Record<Locale, ITranslations> = { en, pt }

function interpolate(message: string, values: Record<string, unknown>): string {
  return message.replace(/\{([^}]+)\}/g, (_, key: string) => {
    const parts = key.split(',').map((p: string) => p.trim())
    if (parts[1] === 'plural') {
      const count = Number(values[parts[0]])
      const form = count === 1 ? 'one' : 'other'
      const match = key.match(new RegExp(`${form}\\s*\\{([^}]*)\\}`))
      return match ? match[1] : String(count)
    }
    return String(values[parts[0]] ?? '')
  })
}

function resolve(translations: ITranslations, path: string): string | null {
  const keys = path.split('.')
  let current: unknown = translations
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k]
    } else {
      return null
    }
  }
  return typeof current === 'string' ? current : null
}

interface LocaleState {
  locale: Locale
  translations: ITranslations
  setLocale: (locale: Locale) => void
  t: (key: string, values?: Record<string, unknown>) => string
}

export const localeStore = create<LocaleState>((set, get) => ({
  locale: 'en',
  translations: en,
  setLocale: (locale) => set({ locale, translations: locales[locale] }),
  t: (key, values = {}) => {
    const message = resolve(get().translations, key)
    if (!message) return key
    return interpolate(message, values)
  }
}))

export const t = (key: string, values?: Record<string, unknown>) => localeStore.getState().t(key, values)

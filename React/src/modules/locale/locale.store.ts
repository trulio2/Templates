import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { en, pt } from '@/locale'
import type { ITranslations, Locale, LocaleState } from '@/types'

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

export const localeStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      t: (key, values = {}) => {
        const message = resolve(locales[get().locale], key)
        if (!message) return key
        return interpolate(message, values)
      }
    }),
    {
      name: 'locale-storage'
    }
  )
)

export const t = (key: string, values?: Record<string, unknown>) =>
  localeStore.getState().t(key, values)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { themeState } from '@/types'

export const themeStore = create<themeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage'
    }
  )
)

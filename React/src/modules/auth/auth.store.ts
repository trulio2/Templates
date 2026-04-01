import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type User } from '@/types'

type AuthState = {
  user: User | null
  setUser: (newUser: User | null) => void
}

const state = {
  user: null
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      ...state,
      setUser: (newUser: User | null) => set({ user: newUser })
    }),
    {
      name: 'auth-storage'
    }
  )
)

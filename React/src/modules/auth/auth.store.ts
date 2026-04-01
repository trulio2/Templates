import { create } from 'zustand'
import { type User } from '@/types'

type AuthState = {
  user: User | null
  setUser: (newUser: User | null) => void
}

const state = {
  user: null
}

export const authStore = create<AuthState>((set) => ({
  ...state,
  setUser: (newUser: User | null) => set({ user: newUser })
}))

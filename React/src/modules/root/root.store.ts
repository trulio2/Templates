import { create } from 'zustand'

type RootState = {
  initialized: boolean
  setInitialized: (value: boolean) => void
}

const state = {
  initialized: false
}

export const rootStore = create<RootState>((set) => ({
  ...state,
  setInitialized: (value: boolean) => set({ initialized: value })
}))

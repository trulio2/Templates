import { create } from 'zustand'

type CatsState = {
  cats: number
  setCats: (newValue: number) => void
}

const state = {
  cats: 0
}

export const catsStore = create<CatsState>((set) => ({
  ...state,
  setCats: (value: number) => set({ cats: value })
}))

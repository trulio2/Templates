import { create } from 'zustand'

type CatsState = {
  cats: number
  catImageUrl: string | null
  setCats: (newValue: number) => void
  setCatImageUrl: (url: string | null) => void
}

const state = {
  cats: 0,
  catImageUrl: null
}

export const catsStore = create<CatsState>((set) => ({
  ...state,
  setCats: (value: number) => set({ cats: value }),
  setCatImageUrl: (url: string | null) => set({ catImageUrl: url })
}))

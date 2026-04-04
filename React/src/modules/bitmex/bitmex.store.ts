import type { ITrade } from '@/types'
import { create } from 'zustand'

type BitmexState = {
  trade: ITrade | null
  setTrade: (newtrade: ITrade) => void
}

const state = {
  trade: null
}

export const bitmexStore = create<BitmexState>()((set) => ({
  ...state,
  setTrade: (newtrade: ITrade) => set({ trade: newtrade })
}))

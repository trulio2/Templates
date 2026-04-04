export const BITMEX_WEBSOCKET_URL = 'wss://ws.bitmex.com/realtime'

export interface ITrade {
  foreignNotional: number
  grossValue: number
  homeNotional: number
  pool: string
  price: number
  side: string
  size: number
  symbol: string
  tickDirection: string
  timestamp: string
  trdMatchID: string
  trdType: string
}

export interface INewTrade {
  data: [ITrade]
  table: string
}

export interface IBitmexService {
  getTrade(): ITrade | null
  setTrade(newTrade: ITrade): void
  subscribe(): void
}

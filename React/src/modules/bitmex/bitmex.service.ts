import { type IBitmexService, type INewTrade, type ITrade } from '@/types'
import { bitmexStore } from './bitmex.store'

class BitmexService implements IBitmexService {
  constructor(private socket: WebSocket) {}

  public getTrade(): ITrade | null {
    return bitmexStore((state) => state.trade)
  }

  public setTrade(newTrade: ITrade): void {
    const { setTrade } = bitmexStore.getState()

    setTrade(newTrade)
  }

  public subscribe(): void {
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({ op: 'subscribe', args: ['trade:XBTUSD'] })
      )

      this.socket.onmessage = (event) => {
        const newTrade: INewTrade = JSON.parse(event.data)

        if (newTrade.table === 'trade') {
          this.setTrade(newTrade.data[0])
        }
      }
    }
  }
}

export default BitmexService

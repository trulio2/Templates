import {
  AuthService,
  BitmexService,
  CatsRepository,
  CatsService,
  LocaleService,
  RootService,
  ThemeService
} from '@/modules'
import {
  BITMEX_WEBSOCKET_URL,
  type IAuthService,
  type ICatsRepository,
  REPOSITORIES,
  SERVICES
} from '@/types'

class IoC {
  private instances: { [key: string]: any } = {}
  private sockets: { [key: string]: WebSocket } = {}

  public getOrCreateInstance<T>(name: string): T {
    const instance = this.instances[name]

    if (instance) return instance

    let newInstance: any

    switch (name) {
      case SERVICES.AUTH:
        newInstance = new AuthService()
        break
      case SERVICES.BITMEX:
        newInstance = new BitmexService(
          this.getOrCreateSocket(BITMEX_WEBSOCKET_URL)
        )
        break
      case REPOSITORIES.CATS:
        newInstance = new CatsRepository()
        break
      case SERVICES.CATS:
        newInstance = new CatsService(
          this.getOrCreateInstance<IAuthService>(SERVICES.AUTH),
          this.getOrCreateInstance<ICatsRepository>(REPOSITORIES.CATS)
        )
        break
      case SERVICES.LOCALE:
        newInstance = new LocaleService()
        break
      case SERVICES.ROOT:
        newInstance = new RootService()
        break
      case SERVICES.THEME:
        newInstance = new ThemeService()
        break
      default:
        break
    }

    this.instances[name] = newInstance
    console.log('New instance created', name)

    return newInstance
  }

  public getOrCreateSocket(url: string): WebSocket {
    if (!this.sockets[url]) {
      this.sockets[url] = new WebSocket(url)
      console.log('New socket created', url)
    }

    return this.sockets[url]
  }

  public cleanUp(name: string): void {
    switch (name) {
      case SERVICES.BITMEX:
        const socket = this.sockets[BITMEX_WEBSOCKET_URL]
        if (socket) socket.close()

        delete this.instances[SERVICES.BITMEX]
        delete this.sockets[BITMEX_WEBSOCKET_URL]
        break

      case SERVICES.CATS:
        delete this.instances[SERVICES.CATS]
        delete this.instances[REPOSITORIES.CATS]
        break

      default:
        break
    }
  }
}

export default new IoC()

import { io, Socket } from 'socket.io-client'
import {
  AuthService,
  CatsService,
  LocaleService,
  ThemeService
} from '@/modules'
import { type IAuthService, SERVICES } from '@/types'

class IoC {
  private instances: { [key: string]: any } = {}
  private sockets: { [key: string]: Socket } = {}

  public getOrCreateInstance<T>(name: string): T {
    const instance = this.instances[name]

    if (instance) return instance

    let newInstance: any

    switch (name) {
      case SERVICES.AUTH:
        newInstance = new AuthService()
        break
      case SERVICES.CATS:
        newInstance = new CatsService(
          this.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
        )
        break
      case SERVICES.LOCALE:
        newInstance = new LocaleService()
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

  public getOrCreateSocket(url: string): Socket {
    if (!this.sockets[url]) {
      this.sockets[url] = io(url)
      console.log('New socket created', url)
    }

    return this.sockets[url]
  }
}

export default new IoC()

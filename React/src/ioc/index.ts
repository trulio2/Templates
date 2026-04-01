import { AuthService, CatsService } from '@/modules'
import { type IAuthService, SERVICES } from '@/types'

class IoC {
  private instances: { [key: string]: any } = {}

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
          this.getOrCreateInstance<IAuthService>('AuthService')
        )
        break
      default:
        break
    }

    this.instances[name] = newInstance
    console.log('New instance created', name)

    return newInstance
  }
}

export default new IoC()

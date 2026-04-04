import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'

export function init() {
  console.log('init')

  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

  const user = authService.getUser()

  console.log(user)
}

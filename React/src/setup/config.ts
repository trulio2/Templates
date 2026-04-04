import IoC from '@/ioc'
import { type IAuthService, SERVICES } from '@/types'

const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)

export function init() {
  console.log('init')

  const user = authService.getUser()

  console.log(user)
}

import './global'

import IoC from '@/ioc'
import { type IAuthService, type IRootService, SERVICES } from '@/types'

export async function init() {
  const authService = IoC.getOrCreateInstance<IAuthService>(SERVICES.AUTH)
  const rootService = IoC.getOrCreateInstance<IRootService>(SERVICES.ROOT)

  const user = authService.getUserData()

  if (user) {
    console.log(user)
  }

  rootService.setInitialized(true)
}

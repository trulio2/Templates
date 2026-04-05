import './global'

import IoC from '@/ioc'
import type { AuthService, RootService } from '@/modules'
import { SERVICES } from '@/types'

export async function init() {
  const authService = IoC.getOrCreateInstance<AuthService>(SERVICES.AUTH)
  const rootService = IoC.getOrCreateInstance<RootService>(SERVICES.ROOT)

  const user = authService.getUserData()

  if (user) {
    console.log(user)
  }

  rootService.setInitialized(true)
}

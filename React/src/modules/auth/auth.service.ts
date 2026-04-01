import { type IAuthService, type User } from '@/types'
import { authStore } from './auth.store'

class AuthService implements IAuthService {
  constructor() {}

  public getUser(): User | null {
    return authStore((state) => state.user)
  }

  public setUser(data: User): void {
    const { setUser } = authStore.getState()

    setUser(data)
  }

  public logout() {
    const { setUser } = authStore.getState()

    setUser(null)
  }
}

export default AuthService

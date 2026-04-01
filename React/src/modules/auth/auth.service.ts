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

  public login(username: string, password: string): boolean {
    if (username && password) {
      const user: User = {
        name: username,
        role: username === 'admin' ? 'admin' : 'user'
      }

      this.setUser(user)
      return true
    }

    return false
  }

  public logout() {
    const { setUser } = authStore.getState()

    setUser(null)
  }
}

export default AuthService

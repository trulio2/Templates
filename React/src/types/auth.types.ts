import type { User } from '@/types'

export interface IAuthService {
  getUser(): User | null
  getUserData(): User | null
  setUser(data: User): void
  login(username: string, password: string): boolean
  logout(): void
}

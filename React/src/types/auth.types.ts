import type { User } from '@/types'

export interface IAuthService {
  getUser(): User | null
  setUser(data: User): void
  logout(): void
}

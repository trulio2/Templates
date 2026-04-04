import { type IAuthService, type ICatsService } from '@/types'
import { catsStore } from './cats.store'

class CatsService implements ICatsService {
  constructor(private authService: IAuthService) {}

  public getCats(): number {
    return catsStore((state) => state.cats)
  }

  public addCat(): void {
    const { cats, setCats } = catsStore.getState()

    setCats(cats + 1)
  }

  public removeCat(): void {
    const { cats, setCats } = catsStore.getState()

    setCats(cats - 1)
  }

  public userName(): string {
    const user = this.authService.getUser()

    return user?.name || ''
  }
}

export default CatsService

import type { IAuthService, ICatsRepository, ICatsService } from '@/types'
import { catsStore } from './cats.store'

class CatsService implements ICatsService {
  constructor(
    private authService: IAuthService,
    private catsRepository: ICatsRepository
  ) {}

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

  public getCatImageUrl(): string | null {
    return catsStore((state) => state.catImageUrl)
  }

  public async fetchCatImage(): Promise<void> {
    const { setCatImageUrl } = catsStore.getState()

    try {
      const url = await this.catsRepository.fetchRandomCatImage()

      setCatImageUrl(url)
    } catch {
      setCatImageUrl(null)
    }
  }
}

export default CatsService

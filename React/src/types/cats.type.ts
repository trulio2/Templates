export interface ICatsService {
  getCats(): number
  addCat(): void
  removeCat(): void
  userName(): string
  getCatImageUrl(): string | null
  fetchCatImage(): Promise<void>
}

export interface ICatsRepository {
  fetchRandomCatImage(): Promise<string>
}

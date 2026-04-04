import axios from 'axios'
import { type ICatsRepository } from '@/types'

class CatsRepository implements ICatsRepository {
  private readonly baseUrl = 'https://api.thecatapi.com/v1'

  public async fetchRandomCatImage(): Promise<string> {
    const response = await axios.get<{ url: string }[]>(`${this.baseUrl}/images/search`)

    return response.data[0].url
  }
}

export default CatsRepository

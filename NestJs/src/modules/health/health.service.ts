import { Injectable } from '@nestjs/common'
import { HealthRepository } from './health.repository'

@Injectable()
export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  async checkHealth() {
    const postgres = await this.healthRepository.checkDatabase()
    const mongodb = await this.healthRepository.checkMongoDb()

    return {
      postgres,
      mongodb,
      service: 'up',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  }
}

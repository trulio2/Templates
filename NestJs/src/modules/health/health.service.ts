import { Injectable } from '@nestjs/common'
import { HealthRepository } from './health.repository'

@Injectable()
export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  async checkHealth() {
    const database = await this.healthRepository.checkDatabase()
    const mongodb = await this.healthRepository.checkMongoDb()

    return {
      database,
      mongodb,
      service: 'up',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  }
}

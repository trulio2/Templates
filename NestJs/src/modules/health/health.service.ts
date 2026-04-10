import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { dataSourceOptions } from '@/db/data-source'

@Injectable()
export class HealthService {
  async checkHealth() {
    const database = await this.checkDatabase()

    return {
      database,
      service: 'up',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  }

  private async checkDatabase() {
    const dataSource = new DataSource(dataSourceOptions)

    try {
      await dataSource.initialize()
      await dataSource.query('SELECT 1')
      await dataSource.destroy()

      return {
        status: 'up'
      }
    } catch (error) {
      if (dataSource.isInitialized) {
        await dataSource.destroy()
      }

      return {
        message:
          error instanceof Error ? error.message : 'Database check failed',
        status: 'down'
      }
    }
  }
}

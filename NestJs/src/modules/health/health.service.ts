import { Injectable } from '@nestjs/common'
import mongoose from 'mongoose'
import { DataSource } from 'typeorm'
import { dataSourceOptions } from '@/db/data-source'

@Injectable()
export class HealthService {
  async checkHealth() {
    const database = await this.checkDatabase()
    const mongodb = await this.checkMongoDb()

    return {
      database,
      mongodb,
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

  private async checkMongoDb() {
    try {
      const connection = mongoose.connection
      const db = connection.db

      if (connection.readyState !== 1 || !db) {
        return {
          database: connection.name,
          readyState: connection.readyState,
          status: 'down'
        }
      }

      await db.admin().command({ ping: 1 })

      return {
        database: connection.name,
        readyState: connection.readyState,
        status: 'up'
      }
    } catch (error) {
      return {
        message:
          error instanceof Error ? error.message : 'MongoDB check failed',
        status: 'down'
      }
    }
  }
}

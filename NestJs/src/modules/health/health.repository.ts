import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { DataSource } from 'typeorm'
import { dataSourceOptions } from '@/db/data-source'

@Injectable()
export class HealthRepository {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async checkDatabase() {
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

  async checkMongoDb() {
    try {
      const connection = this.connection
      const db = connection.db

      if (!db) {
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

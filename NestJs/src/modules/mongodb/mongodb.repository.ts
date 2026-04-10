import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'
import { CreateMongoDbRecordDto } from './create-mongodb-record.dto'
import { MongoDbRecord, MongoDbRecordDocument } from './mongodb-record.schema'

@Injectable()
export class MongoDbRepository {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(MongoDbRecord.name)
    private readonly mongoDbRecordModel: Model<MongoDbRecordDocument>
  ) {}

  create(createMongoDbRecordDto: CreateMongoDbRecordDto) {
    return this.mongoDbRecordModel.create(createMongoDbRecordDto)
  }

  findAll() {
    return this.mongoDbRecordModel.find().sort({ createdAt: -1 }).exec()
  }

  async checkHealth() {
    try {
      const nativeDb = this.connection.db

      if (!nativeDb) {
        return {
          readyState: this.connection.readyState,
          status: 'down'
        }
      }

      await nativeDb.admin().command({ ping: 1 })

      return {
        readyState: this.connection.readyState,
        status: 'up'
      }
    } catch (error) {
      return {
        message:
          error instanceof Error
            ? error.message
            : 'MongoDB health check failed',
        status: 'down'
      }
    }
  }
}

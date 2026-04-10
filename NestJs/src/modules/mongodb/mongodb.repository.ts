import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateMongoDbRecordDto } from './create-mongodb-record.dto'
import { MongoDbRecord, MongoDbRecordDocument } from './mongodb-record.schema'

@Injectable()
export class MongoDbRepository {
  constructor(
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
      const nativeDb = this.mongoDbRecordModel.db.db

      if (!nativeDb) {
        return {
          status: 'down'
        }
      }

      await nativeDb.admin().command({ ping: 1 })

      return {
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

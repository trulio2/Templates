import { Injectable } from '@nestjs/common'
import { CreateMongoDbRecordDto } from './create-mongodb-record.dto'
import { MongoDbRepository } from './mongodb.repository'

@Injectable()
export class MongoDbService {
  constructor(private readonly mongoDbRepository: MongoDbRepository) {}

  create(createMongoDbRecordDto: CreateMongoDbRecordDto) {
    return this.mongoDbRepository.create(createMongoDbRecordDto)
  }

  findAll() {
    return this.mongoDbRepository.findAll()
  }

  async checkHealth() {
    return this.mongoDbRepository.checkHealth()
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateMongoDbRecordDto } from './create-mongodb-record.dto'
import { MongoDbService } from './mongodb.service'

@Controller('mongodb')
export class MongoDbController {
  constructor(private readonly mongoDbService: MongoDbService) {}

  @Get('health')
  checkHealth() {
    return this.mongoDbService.checkHealth()
  }

  @Get('records')
  findAll() {
    return this.mongoDbService.findAll()
  }

  @Post('records')
  create(@Body() createMongoDbRecordDto: CreateMongoDbRecordDto) {
    return this.mongoDbService.create(createMongoDbRecordDto)
  }
}

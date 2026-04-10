import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoDbController } from './mongodb.controller'
import { MongoDbRecord, MongoDbRecordSchema } from './mongodb-record.schema'
import { MongoDbService } from './mongodb.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoDbRecord.name, schema: MongoDbRecordSchema }
    ])
  ],
  controllers: [MongoDbController],
  providers: [MongoDbService]
})
export class MongoDbModule {}

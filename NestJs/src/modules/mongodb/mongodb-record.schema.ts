import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MongoDbRecordDocument = HydratedDocument<MongoDbRecord>

@Schema({ timestamps: true, versionKey: false })
export class MongoDbRecord {
  @Prop({ required: true, trim: true })
  message!: string

  @Prop({ trim: true })
  source?: string
}

export const MongoDbRecordSchema = SchemaFactory.createForClass(MongoDbRecord)

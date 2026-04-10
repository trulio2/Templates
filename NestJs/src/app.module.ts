import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configValidationSchema } from '@/config.schema'
import { dataSourceOptions } from '@/db/data-source'
import {
  AuthModule,
  CatsModule,
  HealthModule,
  MongoDbModule,
  StreamsModule,
  UsersModule
} from '@/modules'

const DB_RETRY_ATTEMPTS = Number.MAX_SAFE_INTEGER
const DB_RETRY_DELAY_MS = 10000

@Module({
  imports: [
    AuthModule,
    CatsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbName: configService.getOrThrow<string>('MONGODB_DATABASE'),
        retryAttempts: DB_RETRY_ATTEMPTS,
        retryDelay: DB_RETRY_DELAY_MS,
        uri: configService.getOrThrow<string>('MONGODB_URI'),
        verboseRetryLog: false
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      formatError: (error) => {
        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: {
            code: error.extensions?.code
          }
        }
      }
    }),
    HealthModule,
    MongoDbModule,
    StreamsModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      retryAttempts: DB_RETRY_ATTEMPTS,
      retryDelay: DB_RETRY_DELAY_MS,
      verboseRetryLog: false
    }),
    UsersModule
  ]
})
export class AppModule {}

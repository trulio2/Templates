import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger()
  const port = Number(process.env.PORT ?? 3000)

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.enableCors()
  await app.listen(port)

  logger.verbose(`Application is running on port ${port}`)
}
bootstrap()

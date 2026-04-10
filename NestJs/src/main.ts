import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { RequestTimingInterceptor } from './interceptors'
import { JsonLogger } from './observability/json-logger'
import { startObservability } from './observability/observability'

async function bootstrap() {
  const port = Number(process.env.PORT ?? 3000)
  const logger = new JsonLogger()
  let observability: { shutdown: () => Promise<void> } | undefined

  startObservability()
    .then((runtime) => {
      observability = runtime
    })
    .catch((error: unknown) => {
      logger.error(error instanceof Error ? error : new Error(String(error)))
    })

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  app.useLogger(logger)
  app.useGlobalInterceptors(new RequestTimingInterceptor())
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

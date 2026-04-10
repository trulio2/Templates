import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { JsonLogger } from './observability/json-logger'
import { startObservability } from './observability/observability'
import { RequestTimingInterceptor } from './interceptors'

async function bootstrap() {
  const port = Number(process.env.PORT ?? 3000)
  const observability = await startObservability()
  const logger = new JsonLogger()
  let isShuttingDown = false

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
  app.enableShutdownHooks()
  await app.listen(port)

  const shutdown = async () => {
    if (isShuttingDown) return
    isShuttingDown = true

    await app.close()
    await observability.shutdown()
  }

  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)

  logger.verbose(`Application is running on port ${port}`)
}
bootstrap()

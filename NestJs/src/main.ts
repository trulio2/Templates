import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { JsonLogger } from './observability/json-logger'
import { startObservability } from './observability/observability'
import { RequestTimingInterceptor } from './interceptors'

async function bootstrap() {
  const port = Number(process.env.PORT ?? 3000)
  const logger = new JsonLogger()
  let isShuttingDown = false
  let app: Awaited<ReturnType<typeof NestFactory.create>> | undefined
  let observability: { shutdown: () => Promise<void> } | undefined

  const shutdown = async () => {
    if (isShuttingDown) return
    isShuttingDown = true

    await app?.close()
    await observability?.shutdown()
  }

  const exitOnSignal = () => {
    void shutdown().finally(() => {
      process.exit(0)
    })
  }

  process.once('SIGINT', exitOnSignal)
  process.once('SIGTERM', exitOnSignal)
  process.once('SIGUSR2', exitOnSignal)

  startObservability()
    .then((runtime) => {
      observability = runtime
    })
    .catch((error: unknown) => {
      logger.error(error instanceof Error ? error : new Error(String(error)))
    })

  app = await NestFactory.create(AppModule, {
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

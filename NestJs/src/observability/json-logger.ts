import { LoggerService } from '@nestjs/common'
import { context, trace } from '@opentelemetry/api'

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose'

const toMessage = (message: unknown) => {
  if (typeof message === 'string') return message

  if (message instanceof Error) {
    return {
      name: message.name,
      message: message.message,
      stack: message.stack
    }
  }

  return message
}

const getTraceContext = () => {
  const span = trace.getSpan(context.active())
  const spanContext = span?.spanContext()

  if (!spanContext) return undefined

  return {
    spanId: spanContext.spanId,
    traceId: spanContext.traceId
  }
}

export class JsonLogger implements LoggerService {
  log(message: unknown, contextLabel?: string) {
    this.write('log', message, contextLabel)
  }

  error(message: unknown, traceStack?: string, contextLabel?: string) {
    this.write('error', message, contextLabel, traceStack)
  }

  warn(message: unknown, contextLabel?: string) {
    this.write('warn', message, contextLabel)
  }

  debug(message: unknown, contextLabel?: string) {
    this.write('debug', message, contextLabel)
  }

  verbose(message: unknown, contextLabel?: string) {
    this.write('verbose', message, contextLabel)
  }

  private write(
    level: LogLevel,
    message: unknown,
    contextLabel?: string,
    traceStack?: string
  ) {
    const payload = {
      context: contextLabel,
      level,
      message: toMessage(message),
      pid: process.pid,
      service: process.env.OTEL_SERVICE_NAME ?? 'nest-js',
      timestamp: new Date().toISOString(),
      trace: getTraceContext(),
      traceStack
    }

    process.stdout.write(`${JSON.stringify(payload)}\n`)
  }
}

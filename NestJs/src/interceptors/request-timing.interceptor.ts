import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { context, metrics, trace } from '@opentelemetry/api'
import { performance } from 'node:perf_hooks'
import { Observable, finalize, tap } from 'rxjs'

type RequestKind = 'graphql' | 'http' | 'unknown'

type RequestMetadata = {
  kind: RequestKind
  label: string
  method: string
}

export class RequestTimingInterceptor implements NestInterceptor {
  private readonly requestDurationHistogram = metrics
    .getMeter('nest-js')
    .createHistogram('app_request_duration_ms', {
      description: 'Duration of inbound HTTP and GraphQL requests',
      unit: 'ms'
    })

  intercept(
    executionContext: ExecutionContext,
    handler: CallHandler
  ): Observable<any> {
    const startedAt = performance.now()
    const requestMetadata = this.getRequestMetadata(executionContext)
    const activeSpan = trace.getSpan(context.active())
    let hasError = false

    if (activeSpan) {
      activeSpan.updateName(requestMetadata.label)
    }

    return handler.handle().pipe(
      tap({
        error: () => {
          hasError = true
        }
      }),
      finalize(() => {
        this.requestDurationHistogram.record(performance.now() - startedAt, {
          kind: requestMetadata.kind,
          label: requestMetadata.label,
          method: requestMetadata.method,
          outcome: hasError ? 'error' : 'success'
        })
      })
    )
  }

  private getRequestMetadata(
    executionContext: ExecutionContext
  ): RequestMetadata {
    if (executionContext.getType<'graphql'>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(executionContext)
      const info = gqlContext.getInfo()
      const operationName = info.operation.name?.value ?? info.fieldName
      const operationType = info.operation.operation

      return {
        kind: 'graphql',
        label: `GraphQL ${operationType} ${operationName}`,
        method: operationType.toUpperCase()
      }
    }

    if (executionContext.getType<'http'>() === 'http') {
      const request = executionContext.switchToHttp().getRequest<{
        method?: string
        route?: { path?: string }
        url?: string
      }>()
      const method = request.method ?? 'GET'
      const route = request.route?.path ?? request.url ?? 'unknown'

      return {
        kind: 'http',
        label: `HTTP ${method} ${route}`,
        method
      }
    }

    return {
      kind: 'unknown',
      label: 'Request unknown',
      method: 'UNKNOWN'
    }
  }
}

import * as Sentry from '@sentry/node'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'

type ObservabilityRuntime = {
  shutdown: () => Promise<void>
}

const normalizeOtlpBaseUrl = (value: string | undefined) => {
  const url = value?.trim()
  if (!url) return undefined

  return url.replace(/\/$/, '')
}

const createOtlpUrl = (
  baseUrl: string | undefined,
  signalType: 'traces' | 'metrics'
) => {
  const normalized = normalizeOtlpBaseUrl(baseUrl)
  if (!normalized) return undefined

  return `${normalized}/v1/${signalType}`
}

export async function startObservability(): Promise<ObservabilityRuntime> {
  const otlpBaseUrl = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
  const sentryDsn = process.env.SENTRY_DSN

  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: process.env.NODE_ENV,
      integrations: []
    })
  }

  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
      url: createOtlpUrl(otlpBaseUrl, 'traces')
    }),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: createOtlpUrl(otlpBaseUrl, 'metrics')
      })
    }),
    instrumentations: [getNodeAutoInstrumentations()]
  })

  await sdk.start()

  return {
    shutdown: async () => {
      await sdk.shutdown()
    }
  }
}

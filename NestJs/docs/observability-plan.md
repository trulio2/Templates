# Observability Plan

## Goal

Ship a lean production observability stack for this NestJS app:

- OpenTelemetry for application instrumentation
- Prometheus for metrics collection
- Grafana for dashboards and alerting
- Loki for centralized logs
- Tempo for traces
- Sentry for exception reporting

## Rollout Order

1. Add OpenTelemetry bootstrap to the backend and export traces/metrics to the collector.
2. Standardize logs as JSON on stdout so Promtail can ship them to Loki.
3. Add Prometheus scrape targets and Grafana datasource provisioning.
4. Add baseline dashboards and alerts for latency, error rate, and saturation.
5. Add Sentry for uncaught exceptions and critical request failures.

## Service Flow

- NestJS backend sends OTLP traces and metrics to `otel-collector`.
- Collector forwards traces to Tempo.
- Collector exposes Prometheus scrape metrics.
- Backend logs go to stdout, Promtail ships them to Loki.
- Grafana reads from Prometheus, Loki, and Tempo.

## Backend Work

- Initialize OpenTelemetry before Nest boots.
- Export HTTP, GraphQL, and TypeORM spans.
- Emit structured JSON logs.
- Add a `/metrics` endpoint only if a direct Prometheus scrape is needed later.
- Wire `SENTRY_DSN` for exception capture.

## Operational Notes

- Keep all observability endpoints on the private compose network.
- Expose only Grafana, Prometheus, and the Nest app ports to the host during local development.
- Use the same OTEL env vars in local, staging, and production so the backend config stays portable.

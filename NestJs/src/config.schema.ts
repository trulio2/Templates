import * as Joi from '@hapi/joi'

export const configValidationSchema = Joi.object({
  DB_DATABASE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().uri().optional(),
  OTEL_SERVICE_NAME: Joi.string().default('nest-js').optional(),
  SENTRY_DSN: Joi.string().uri().allow('').optional(),
  PORT: Joi.number().default(3000)
})

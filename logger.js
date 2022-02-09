import { Logger } from '@glif/logger'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const SENTRY_ENV = process.env.NEXT_PUBLIC_SENTRY_ENV

export const logger = new Logger({
  sentryTraces: 0,
  sentryDsn: SENTRY_DSN,
  sentryEnabled: !!SENTRY_DSN,
  sentryEnv: SENTRY_ENV,
  packageName: '',
  packageVersion: ''
})

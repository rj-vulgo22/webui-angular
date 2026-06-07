import * as Sentry from '@sentry/react'

const env = (import.meta as any).env
const dsn = typeof env === 'object' && env !== null ? env.VITE_SENTRY_DSN : undefined
const release = typeof env === 'object' && env !== null ? env.VITE_SENTRY_RELEASE : undefined

export function initSentry() {
  if (!dsn) {
    console.warn('[Sentry] DSN não configurado. Pulando inicialização.')
    return
  }

  Sentry.init({
    dsn,
    release,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

export default Sentry

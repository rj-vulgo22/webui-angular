export function setupErrorConsole() {
  if (typeof window === 'undefined') return

  const origOnError = window.onerror
  window.onerror = (msg, source, line, col, error) => {
    console.error(
      `%c[GLOBAL ERROR] %s`,
      'color: #ef4444; font-weight: bold; font-size: 13px;',
      error?.stack || msg
    )
    origOnError?.call(window, msg, source, line, col, error)
  }

  const origOnReject = window.onunhandledrejection
  window.onunhandledrejection = (event) => {
    console.error(
      `%c[UNHANDLED REJECTION] %s`,
      'color: #f97316; font-weight: bold; font-size: 13px;',
      event.reason?.stack || event.reason
    )
    origOnReject?.call(window, event)
  }

  const origConsoleError = console.error
  console.error = (...args) => {
    origConsoleError.apply(console, args)
  }

  console.info(
    '%c[ERROR CONSOLE] Monitoramento de erros ativo',
    'color: #22c55e; font-weight: bold;'
  )
}

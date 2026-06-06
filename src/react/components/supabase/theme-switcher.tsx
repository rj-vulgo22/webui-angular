'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme-provider'
import { useMounted } from '../../hooks/use-mounted'

export function ThemeSwitcher() {
  const mounted = useMounted()
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <span className="inline-flex items-center justify-center rounded-md h-9 w-9 group">
        <Sun className="h-4 w-4" />
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-md h-9 w-9 hover:bg-muted transition-colors"
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  )
}

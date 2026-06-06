'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface RouterContextType {
  currentPath: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const getPathFromHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, '')
    return hash || '/'
  }, [])

  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? getPathFromHash() : '/'
  )

  const navigate = useCallback((path: string) => {
    window.location.hash = path
    setCurrentPath(path)
  }, [])

  useEffect(() => {
    const onHashChange = () => setCurrentPath(getPathFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [getPathFromHash])

  const value = useMemo(() => ({ currentPath, navigate }), [currentPath, navigate])

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter must be used within a RouterProvider')
  return context
}

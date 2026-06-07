'use client'

import { useState, lazy, Suspense, memo, useCallback } from 'react'
import { ThemeSwitcher } from './theme-switcher'
import { SidebarContent } from './sidebar-content'
import { CommandMenu } from './command-menu'

const MobileDrawer = lazy(() => import('./mobile-drawer'))

export const SupabaseSidebar = memo(function SupabaseSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileMenuOpen(false), [])
  const openMobile = useCallback(() => setMobileMenuOpen(true), [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-background justify-between flex items-center px-8 py-3 border-b lg:hidden">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={openMobile}
          className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-hidden transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-transparent border-strong hover:border-foreground-muted focus-visible:outline-border-strong text-xs px-2.5 py-1 h-[26px]"
        >
          <span className="inline-flex items-center justify-center shrink-0 [&_svg]:h-[14px] [&_svg]:w-[14px] text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </span>
        </button>
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </div>

      <Suspense fallback={null}>
        <MobileDrawer open={mobileMenuOpen} onClose={closeMobile} onSearch={() => setCommandOpen(true)} />
      </Suspense>

      <aside className="hidden shrink-0 lg:sticky lg:block lg:top-0 lg:h-screen lg:z-30 bg-200 lg:border-r lg:border-muted/50">
        <div className="h-full overflow-y-auto [scrollbar-width:none] overscroll-contain">
          <SidebarContent onNavigate={closeMobile} onClose={closeMobile} onSearch={() => setCommandOpen(true)} />
        </div>
      </aside>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
})

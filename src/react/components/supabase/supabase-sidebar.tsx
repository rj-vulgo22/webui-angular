'use client'

import { useState } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { useRouter } from '../../lib/supabase-router'
import { ThemeSwitcher } from './theme-switcher'
import { CommandMenu } from './command-menu'

interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  items?: NavItem[]
  new?: boolean
}

const navItems: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/introduction' },
      { title: 'Accessibility', href: '/accessibility' },
      { title: 'Color Usage', href: '/color-usage' },
      { title: 'Copywriting', href: '/copywriting' },
      { title: 'Icons', href: '/icons' },
      { title: 'Tailwind Classes', href: '/tailwind-classes' },
      { title: 'Quick Start', href: '/quickstart' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Blocks',
    items: [
      { title: 'Client', href: '/client' },
      { title: 'Password-Based Auth', href: '/password-based-auth' },
      { title: 'Social Auth', href: '/social-auth', new: true },
      { title: 'Dropzone', href: '/dropzone' },
      { title: 'Realtime Cursor', href: '/realtime-cursor' },
      { title: 'Realtime Monaco', href: '/realtime-monaco', new: true },
      { title: 'Realtime Flow', href: '/realtime-flow', new: true },
      { title: 'Current User Avatar', href: '/current-user-avatar' },
      { title: 'Realtime Avatar Stack', href: '/realtime-avatar-stack' },
      { title: 'Realtime Chat', href: '/realtime-chat' },
      { title: 'Infinite Query', href: '/infinite-query', new: true },
    ],
  },
  {
    title: 'AI Skills',
    items: [
      { title: 'Skills', href: '/skills', new: true },
    ],
  },
  {
    title: 'Platform',
    items: [
      { title: 'Platform Kit', href: '/platform-kit' },
    ],
  },
]

function NavLink({ item, currentPath, navigate }: { item: NavItem; currentPath: string; navigate: (p: string) => void }) {
  const isActive = item.href && currentPath === item.href
  return (
    <a
      className={
        'relative flex items-center justify-between h-6 text-sm transition-all px-6 ' +
        (isActive ? 'text-foreground bg-surface-200' : 'text-foreground-lighter hover:bg-surface-100 hover:text-foreground')
      }
      href={item.href || '#'}
      onClick={(e) => {
        if (item.href) {
          e.preventDefault()
          navigate(item.href)
        }
      }}
    >
      <div className={'transition absolute left-0 w-1 h-full bg-foreground ' + (isActive ? 'opacity-100' : 'opacity-0')} />
      {item.title}
      {item.new && (
        <span className="mr-2 inline-flex items-center justify-center self-center rounded-full whitespace-nowrap tracking-[0.07em] uppercase font-medium text-[9px] leading-[13px] px-[5.5px] py-[2px] bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-400">
          New
        </span>
      )}
    </a>
  )
}

function SidebarContent({ onNavigate, onClose, onSearch }: { onNavigate?: () => void; onClose?: () => void; onSearch?: () => void }) {
  const { navigate, currentPath } = useRouter()

  const handleNavigate = (path: string) => {
    navigate(path)
    onNavigate?.()
  }

  return (
    <nav className="flex flex-col h-full min-w-[220px]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <a href="/ui" onClick={(e) => { e.preventDefault(); handleNavigate('/') }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="109" height="113" viewBox="0 0 109 113" fill="none" className="w-6 h-6">
              <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0625L99.1935 40.0625C107.384 40.0625 111.952 49.5226 106.859 55.9372L63.7076 110.284Z" fill="url(#paint0_linear)" />
              <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0625L99.1935 40.0625C107.384 40.0625 111.952 49.5226 106.859 55.9372L63.7076 110.284Z" fill="url(#paint1_linear)" fillOpacity="0.2" />
              <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" />
              <defs>
                <linearGradient id="paint0_linear" x1="53.9738" y1="54.9738" x2="94.1635" y2="71.8293" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#249361" />
                  <stop offset="1" stopColor="#3ECF8E" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="36.1558" y1="30.5779" x2="54.4844" y2="65.0804" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>
        <a className="mb-4 block" href="/ui" onClick={(e) => { e.preventDefault(); handleNavigate('/') }}>
          <h1 className="text-sm font-medium">Supabase UI Library</h1>
        </a>
        <button
          type="button"
          onClick={() => onSearch?.()}
          className="cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 outline-hidden transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-strong focus-visible:outline-ring data-[state=open]:border-strong px-2.5 py-1 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 hover:border-foreground-muted hover:bg-surface-100"
          tabIndex={0}
        >
          <span className="truncate">
            <span className="hidden lg:inline-flex">Search UI Library...</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-muted-foreground">
              <span className="text-sm">⌘</span>K
            </kbd>
          </span>
        </button>
      </div>

      {navItems.map((section) => (
        <div key={section.title} className={section.title === 'AI Skills' ? 'pb-6 flex-1' : 'pb-6'}>
          <div className="font-mono uppercase text-xs text-foreground-lighter/75 mb-2 px-6 tracking-widest">
            {section.title}
          </div>
          {section.items && (
            section.items.length > 1 ? (
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink key={item.title} item={item} currentPath={currentPath} navigate={handleNavigate} />
                ))}
              </div>
            ) : (
              section.items.map((item) => (
                <NavLink key={item.title} item={item} currentPath={currentPath} navigate={handleNavigate} />
              ))
            )
          )}
        </div>
      ))}
    </nav>
  )
}

export function SupabaseSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const closeMobile = () => setMobileMenuOpen(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-background justify-between flex items-center px-8 py-3 border-b lg:hidden">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setMobileMenuOpen(true)}
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

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              key="mobile-backdrop"
              className="fixed inset-0 z-[55] bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeMobile}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.aside
              key="mobile-sidebar"
              className="fixed top-0 left-0 z-[60] h-screen w-full max-w-[288px] bg-200 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="h-full overflow-y-auto [scrollbar-width:none]">
                <SidebarContent onNavigate={closeMobile} onClose={closeMobile} onSearch={() => setCommandOpen(true)} />
              </div>
            </m.aside>
          )}
        </AnimatePresence>
      </LazyMotion>

      <aside className="hidden shrink-0 lg:sticky lg:block lg:top-0 lg:h-screen lg:z-30 bg-200 lg:border-r lg:border-muted/50">
        <div className="h-full overflow-y-auto [scrollbar-width:none]">
          <SidebarContent onNavigate={closeMobile} onClose={closeMobile} onSearch={() => setCommandOpen(true)} />
        </div>
      </aside>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
}

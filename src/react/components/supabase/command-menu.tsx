'use client'

import { CircleIcon, LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useRouter } from '../../lib/supabase-router'
import * as React from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command'

const navItems = [
  { label: 'Introduction', href: '/introduction' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Quick Start', href: '/quickstart' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Client', href: '/client' },
  { label: 'Password-Based Auth', href: '/password-based-auth' },
  { label: 'Social Auth', href: '/social-auth' },
  { label: 'Dropzone (File Upload)', href: '/dropzone' },
  { label: 'Realtime Cursor', href: '/realtime-cursor' },
  { label: 'Realtime Monaco', href: '/realtime-monaco' },
  { label: 'Realtime Flow', href: '/realtime-flow' },
  { label: 'Current User Avatar', href: '/current-user-avatar' },
  { label: 'Realtime Avatar Stack', href: '/realtime-avatar-stack' },
  { label: 'Realtime Chat', href: '/realtime-chat' },
  { label: 'Infinite Query', href: '/infinite-query' },
  { label: 'AI Skills', href: '/skills' },
  { label: 'Platform Kit', href: '/platform-kit' },
]

export function CommandMenu({ open: controlledOpen, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, setOpen])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const changeTheme = (theme: 'light' | 'dark' | 'system') => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'classic-dark' : 'light')
    localStorage.setItem('supabase-ui-theme', theme)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {navItems.map((navItem) => (
            <CommandItem
              key={navItem.href}
              value={navItem.label}
              onSelect={() => runCommand(() => router.navigate(navItem.href))}
            >
              <div className="mr-2 flex h-4 w-4 items-center justify-center">
                <CircleIcon className="h-3 w-3" strokeWidth={1} />
              </div>
              {navItem.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => changeTheme('light'))}>
            <SunIcon className="mr-2 h-4 w-4" strokeWidth={1} />
            Light
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => changeTheme('dark'))}>
            <MoonIcon className="mr-2 h-4 w-4" strokeWidth={1} />
            Dark
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => changeTheme('system'))}>
            <LaptopIcon className="mr-2 h-4 w-4" strokeWidth={1} />
            System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

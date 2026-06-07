'use client'

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { SidebarContent } from './sidebar-content'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  onSearch: () => void
}

export default function MobileDrawer({ open, onClose, onSearch }: MobileDrawerProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            key="mobile-backdrop"
            className="fixed inset-0 z-[55] bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <m.aside
            key="mobile-sidebar"
            className="fixed top-0 left-0 z-[60] h-screen w-full max-w-[288px] bg-200 lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="h-full overflow-y-auto [scrollbar-width:none] overscroll-contain">
              <SidebarContent onNavigate={onClose} onClose={onClose} onSearch={onSearch} />
            </div>
          </m.aside>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

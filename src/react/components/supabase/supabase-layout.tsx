'use client'

import { SupabaseSidebar } from './supabase-sidebar'
import { SiteFooter } from './site-footer'

interface SupabaseLayoutProps {
  children: React.ReactNode
}

export function SupabaseLayout({ children }: SupabaseLayoutProps) {
  return (
    <div className="pt-10">
      <main className="flex-1 max-w-site mx-auto w-full p-0">
        <div className="border-b">
          <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
            <SupabaseSidebar />
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col bg-background">
                {children}
                <SiteFooter />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

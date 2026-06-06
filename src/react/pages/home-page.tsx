'use client'

import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { CheckCircle2, ChevronRight, Database, Globe, Key, Shield, Upload, Users } from 'lucide-react'

const HorizontalGridLine = () => <div className="col-span-12 h-px bg-border/30" />

const products = [
  { icon: Database, title: 'Database', description: 'Every project is a full Postgres database with pgvector, pg_graphql, and more.', badge: 'Vector' },
  { icon: Key, title: 'Authentication', description: 'Built-in auth with Row Level Security, social logins, and multi-factor authentication.', badge: 'Auth' },
  { icon: Upload, title: 'Storage', description: 'Store and serve files with built-in CDN, image optimization, and access controls.', badge: 'S3' },
  { icon: Globe, title: 'Edge Functions', description: 'Run serverless TypeScript functions at the edge, globally distributed in <10ms.', badge: 'Deno' },
  { icon: Users, title: 'Realtime', description: 'Broadcast, presence, and Postgres Changes — build multiplayer experiences.', badge: 'WS' },
  { icon: Shield, title: 'Security', description: 'Row Level Security, SSL enforcement, network restrictions, and audit logs.', badge: 'RLS' },
]

export function HomePage() {
  return (
    <main className="relative lg:-ml-10">
      <div className="mx-auto w-full min-w-0 flex flex-col gap-16">
        <div className="relative z-10 h-full w-full overflow-y-auto">
          <div className="relative">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={`col-line-${i}`}
                className="absolute top-0 bottom-0 w-px bg-border/30 z-10 first:hidden last:hidden"
                style={{ left: `${(i / 12) * 100}%`, height: '100%' }}
              />
            ))}
            <div className="grid grid-cols-12 gap-0 relative z-20 pb-32">
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-8 pb-8">
                <div className="flex flex-col gap-8 justify-start pt-16 md:pt-32">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl text-foreground mb-3 font-medium tracking-tight">
                      UI Blocks for Supabase Projects
                    </h1>
                    <h2 className="text-lg text-foreground/60 mb-4">
                      A collection of React components and blocks built on the shadcn/ui library
                      that connect your front-end to your Supabase back-end via a single command.
                    </h2>
                    <div className="flex gap-3 mt-4">
                      <Button variant="secondary" size="lg">Get Started</Button>
                      <Button variant="outline" size="lg">Install Skills</Button>
                    </div>
                  </div>
                </div>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-16 pb-6 text-xs uppercase font-mono text-foreground/40 tracking-wider relative flex justify-between items-center">
                <span>File Upload</span>
                <span className="text-foreground/20 underline decoration-1 underline-offset-4">Go to block<ChevronRight className="inline h-3 w-3 ml-1" /></span>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 relative">
                <div className="-mt-4 -mb-12">
                  <div className="w-full h-auto rounded-lg overflow-hidden border">
                    <div className="flex min-h-[350px] w-full justify-center p-10 items-center bg-muted/30">
                      <div className="w-full max-w-sm border-2 border-dashed border-border rounded-lg p-8 text-center bg-card">
                        <div className="flex flex-col items-center gap-y-2">
                          <Upload size={20} className="text-foreground/60" />
                          <p className="text-sm">Upload files</p>
                          <p className="text-xs text-foreground/60">Drag and drop or <span className="underline cursor-pointer transition hover:text-foreground">select files</span> to upload</p>
                          <p className="text-xs text-foreground/40">Maximum file size: 5 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-16 pb-6 text-xs uppercase font-mono text-foreground/40 tracking-wider relative flex justify-between items-center">
                <span>Supabase Products</span>
                <span className="text-foreground/20">Platform</span>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => {
                    const Icon = product.icon
                    return (
                      <div key={product.title} className="group relative rounded-lg border bg-card p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 rounded-md bg-muted"><Icon className="h-5 w-5 text-foreground/60" /></div>
                          <Badge variant="outline" className="font-mono text-[10px]">{product.badge}</Badge>
                        </div>
                        <h3 className="font-medium mb-2">{product.title}</h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">{product.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-16 pb-6 text-xs uppercase font-mono text-foreground/40 tracking-wider relative flex justify-between items-center">
                <span>Realtime Chat</span>
                <span className="text-foreground/20 underline decoration-1 underline-offset-4">Go to block<ChevronRight className="inline h-3 w-3 ml-1" /></span>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 relative">
                <div className="-mt-4 grid md:flex rounded-lg overflow-hidden">
                  <div className="flex-1 border-r min-h-[300px] bg-muted/30 flex items-center justify-center text-sm text-foreground/40">Chat Preview A</div>
                  <div className="flex-1 min-h-[300px] bg-muted/30 flex items-center justify-center text-sm text-foreground/40">Chat Preview B</div>
                </div>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-16 pb-6 text-xs uppercase font-mono text-foreground/40 tracking-wider relative flex justify-between items-center">
                <span>Infinite Query Hook</span>
                <span className="text-foreground/20 underline decoration-1 underline-offset-4">Go to block<ChevronRight className="inline h-3 w-3 ml-1" /></span>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 relative">
                <div className="-mt-4">
                  <div className="w-full rounded-lg overflow-hidden border bg-muted/30 min-h-[200px] flex items-center justify-center text-sm text-foreground/40">Infinite Query Hook Demo</div>
                </div>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 pt-16 pb-12 text-xs uppercase font-mono text-foreground/40 tracking-wider relative flex justify-between items-center">
                <span>Dark Mode</span>
                <span className="text-foreground/20">data-theme="dark"</span>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 py-8">
                <div className="rounded-lg border p-8 bg-[#1c1c1c]">
                  <div className="flex flex-col items-center justify-center text-center gap-4">
                    <div className="rounded-full bg-[#3ECF8E]/10 p-3"><CheckCircle2 className="h-8 w-8 text-[#3ECF8E]" /></div>
                    <p className="text-lg font-medium text-white">Dark mode is fully supported</p>
                    <p className="text-sm text-white/60 max-w-md">Toggle between light and dark themes — all HSL CSS variables adapt automatically with smooth transitions.</p>
                    <Button variant="outline" className="mt-2 text-white border-white/20 hover:bg-white/10">Toggle Theme</Button>
                  </div>
                </div>
              </div>
              <HorizontalGridLine />
              <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8 py-12">
                <div className="flex flex-col items-center text-center gap-4">
                  <p className="text-sm text-foreground/40 font-mono">Built with shadcn/ui base-nova · Inter Variable · Supabase HSL Theme</p>
                  <p className="text-xs text-foreground/30">Inspired by radix-ui.com/themes and ui.shadcn.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

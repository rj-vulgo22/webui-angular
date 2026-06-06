'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'usage', title: 'Usage' },
  { id: 'props', title: 'Props' },
  { id: 'further-reading', title: 'Further reading' },
  { id: 'smoother-cursors', title: 'Smoother cursors' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/realtime-cursor-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/realtime-cursor-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/realtime-cursor-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/realtime-cursor-nextjs.json',
}

const fileTree: TreeNode[] = [
  { name: 'components', type: 'folder', open: true, children: [
    { name: 'cursor.tsx', type: 'file' },
    { name: 'realtime-cursors.tsx', type: 'file' },
  ]},
  { name: 'hooks', type: 'folder', open: true, children: [
    { name: 'use-realtime-cursors.ts', type: 'file' },
  ]},
  { name: 'lib', type: 'folder', open: true, children: [
    { name: 'supabase', type: 'folder', open: true, children: [
      { name: 'client.ts', type: 'file' },
      { name: 'middleware.ts', type: 'file' },
      { name: 'server.ts', type: 'file' },
    ]},
  ]},
]

const cursorCode = `import { MousePointer2 } from 'lucide-react'

import { cn } from '@/lib/utils'

export const Cursor = ({
  className,
  style,
  color,
  name,
}: {
  className?: string
  style?: React.CSSProperties
  color: string
  name: string
}) => {
  return (
    <div className={cn('pointer-events-none', className)} style={style}>
      <MousePointer2 color={color} fill={color} size={30} />

      <div
        className="mt-1 px-2 py-1 rounded-sm text-xs font-bold text-white text-center"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  )
}`

const usageCode = `'use client'

import { RealtimeCursors } from '@/components/realtime-cursors'

export default function Page() {
  return (
    <div className="w-full min-h-screen">
      <RealtimeCursors roomName="macrodata_refinement_office" username="Mark Scout" />
    </div>
  )
}`

export function RealtimeCursorDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Realtime Cursor</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Realtime Cursor</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Real-time cursor sharing for collaborative applications
              </span>
            </p>
          </div>
        </div>

        <div className="pb-12">
          <div className="mdx">
            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="installation">
              <SectionLink id="installation" /> Installation
            </h2>

            <PackageManagerTabs installCommands={INSTALL_COMMANDS} />

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="folder-structure">
              <SectionLink id="folder-structure" /> Folder structure
            </h2>

            <FileTreeSection fileTree={fileTree} note={<>This block includes the <a href="/client" className="underline decoration-1 underline-offset-4 hover:decoration-[#3ECF8E]">Supabase client</a>. If you already have one installed, you can skip overwriting it.</>} />

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {cursorCode.split('\n').map((line, i) => (
                    <div key={i}>
                      <span className="select-none text-muted-foreground/40 mr-4 inline-block w-8 text-right">{i + 1}</span>
                      <span>{line || ' '}</span>
                    </div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="introduction">
              <SectionLink id="introduction" /> Introduction
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The Realtime Cursors component lets users share their cursor position with others in the same room—perfect for real-time collaboration. It handles all the setup and boilerplate for you, so you can add it to your app with minimal effort.
            </p>

            <p className="font-heading mt-8 scroll-m-20 text-xl tracking-tight font-semibold text-foreground">
              Features
            </p>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Broadcast cursor position to other users in the same room</li>
              <li className="mt-2">Customizable cursor appearance</li>
              <li className="mt-2">Presence detection (automatically joins/leaves users)</li>
              <li className="mt-2">Low-latency updates using Supabase Realtime</li>
              <li className="mt-2">Room-based isolation for scoped collaboration</li>
            </ul>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The Realtime Cursor component is designed to be used in a room. It can be used to build real-time collaborative applications. Add the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<RealtimeCursors />'}</code> component to your page and it will render realtime cursors from other users in the room.
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {usageCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="props">
              <SectionLink id="props" /> Props
            </h2>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Prop</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Type</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">roomName</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Unique identifier for the shared room or session.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">username</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Name of the current user; used to track and label cursors.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/realtime/broadcast">
                  Realtime Broadcast
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/realtime/authorization">
                  Realtime authorization
                </a>
              </li>
            </ul>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="smoother-cursors">
              <SectionLink id="smoother-cursors" /> Smoother cursors
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              While our Realtime Cursor component aims to keep things simple and lightweight, you may want to add smoother cursor animations for a more polished experience. Libraries like{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://github.com/steveruizok/perfect-cursors">
                perfect-cursors
              </a>{' '}
              can be integrated to add sophisticated interpolation between cursor positions. This is especially useful when dealing with network latency, as it creates fluid cursor movements even when position updates are received at longer intervals (e.g., every 50-80ms). The library handles the complex math of creating natural-looking cursor paths while maintaining performance.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
            <div className="space-y-2">
              <p className="font-medium text-foreground/60">On This Page</p>
              <ul className="m-0 list-none">
                {sections.map((s) => (
                  <li key={s.id} className="mt-0 pt-2">
                    <a
                      href={'#' + s.id}
                      className="inline-block no-underline transition-colors hover:text-foreground text-foreground/60"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

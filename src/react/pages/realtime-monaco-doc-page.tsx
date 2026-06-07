'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'how-it-works-under-the-hood', title: 'How it works under the hood' },
  { id: 'usage', title: 'Usage' },
  { id: 'props', title: 'Props' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/realtime-monaco-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/realtime-monaco-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/realtime-monaco-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/realtime-monaco-nextjs.json',
}

const fileTree: TreeNode[] = [
  { name: 'components', type: 'folder', open: true, children: [
    { name: 'realtime-monaco.tsx', type: 'file' },
  ]},
  { name: 'hooks', type: 'folder', open: true, children: [
    { name: 'use-connect-on-mount.ts', type: 'file' },
  ]},
  { name: 'lib', type: 'folder', open: true, children: [
    { name: 'supabase', type: 'folder', open: true, children: [
      { name: 'client.ts', type: 'file' },
      { name: 'middleware.ts', type: 'file' },
      { name: 'server.ts', type: 'file' },
    ]},
  ]},
]

const monacoCode = `'use client'

import { Editor } from '@monaco-editor/react'
import { SupabasePersistenceOptions } from '@supabase-labs/y-supabase'
import { Awareness } from 'y-protocols/awareness.js'

import { useConnectOnMount } from '../hooks/use-connect-on-mount'

type RealtimeMonacoProps = {
  channel: string
  language?: string
  height?: string | number
  className?: string
  awareness?: boolean | Awareness
  persistence?: boolean | SupabasePersistenceOptions
  theme?: 'light' | 'dark'
}

const DEFAULT_HEIGHT = 550

const RealtimeMonaco = ({
  channel,
  language = 'javascript',
  height = DEFAULT_HEIGHT,
  awareness = true,
  persistence,
  theme,
  ...rest
}: RealtimeMonacoProps) => {
  const { connectOnMount } = useConnectOnMount({ channel, persistence, awareness })

  return (
    <Editor
      height={height}
      language={language}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      onMount={connectOnMount}
      {...rest}
    />
  )
}

export { RealtimeMonaco }`

const basicUsageCode = `import { RealtimeMonaco } from '@/components/realtime-monaco'

export default function MonacoPage() {
  return <RealtimeMonaco channel="realtime-monaco-demo" language="typescript" />
}`

const sqlCode = `create table yjs_documents (
  room text primary key,
  state text not null
);`

const persistenceUsageCode = `import { RealtimeMonaco } from '@/components/realtime-monaco'

export default function MonacoPage() {
  return <RealtimeMonaco channel="realtime-monaco-demo" language="typescript" persistence />
}`

const persistenceOptionsCode = `<RealtimeMonaco
  channel="realtime-monaco-demo"
  language="typescript"
  persistence={{
    table: 'yjs_documents',
    roomColumn: 'room',
    stateColumn: 'state',
    storeTimeout: 2000,
  }}
/>`

const noAwarenessCode = `<RealtimeMonaco channel="realtime-monaco-demo" awareness={false} />`

export function RealtimeMonacoDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Realtime Monaco</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Realtime Monaco</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Real-time Monaco editor for collaborative applications
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
                  {monacoCode.split('\n').map((line, i) => (
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
              The Realtime Monaco component provides a collaborative code editor powered by{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://microsoft.github.io/monaco-editor/">
                Monaco
              </a>{' '}
              and{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://yjs.dev/">
                Yjs
              </a>. It uses{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://github.com/supabase-community/y-supabase">
                @supabase-labs/y-supabase
              </a>{' '}
              under the hood to sync document state across clients through Supabase Realtime.
            </p>

            <p className="font-heading mt-8 scroll-m-20 text-xl tracking-tight font-semibold text-foreground">
              Features
            </p>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Real-time document synchronization via Supabase Realtime broadcast</li>
              <li className="mt-2">Cursor and selection sharing between collaborators (awareness)</li>
              <li className="mt-2">Optional persistence to Postgres so documents survive page reloads</li>
              <li className="mt-2">Supports all Monaco languages and themes</li>
              <li className="mt-2">Room-based isolation for scoped collaboration</li>
            </ul>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="how-it-works-under-the-hood">
              <SectionLink id="how-it-works-under-the-hood" /> How it works under the hood
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The component creates a{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://yjs.dev/">
                Yjs
              </a>{' '}
              document and connects it to a Supabase Realtime channel using <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">SupabaseProvider</code> from <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">@supabase-labs/y-supabase</code>. A <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MonacoBinding</code> from <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">y-monaco</code> bridges the Yjs document with the Monaco editor model, keeping them in sync.
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              When <strong>awareness</strong> is enabled, each user's cursor position and selection are broadcast to other clients in the same channel. Remote cursors are rendered with unique colors via dynamically injected CSS.
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              When <strong>persistence</strong> is enabled, the full Yjs document state is saved to a Postgres table so it can be restored when clients reconnect.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="basic-usage">
              <SectionLink id="basic-usage" /> Basic usage
            </h3>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {basicUsageCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="with-persistence">
              <SectionLink id="with-persistence" /> With persistence
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Enable persistence to save the editor content to your Supabase database. This requires a table to store the Yjs document state.
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              First, create the required table in your Supabase project:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {sqlCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Then pass <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">persistence</code> to the component:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {persistenceUsageCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              You can also pass a <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">SupabasePersistenceOptions</code> object:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {persistenceOptionsCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="without-awareness">
              <SectionLink id="without-awareness" /> Without awareness
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              By default, cursor and selection positions are shared between collaborators. To disable this:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {noAwarenessCode.split('\n').map((line, i) => (
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
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">channel</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Unique channel name used to sync editor content between collaborators in the same session.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">language?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Monaco <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://code.visualstudio.com/docs/languages/identifiers">language identifier</a> (e.g. <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">typescript</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">python</code>). Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">javascript</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">height?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string | number</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Height of the editor container. Accepts a pixel number or CSS string (e.g. <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'"100%"'}</code>). Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">550</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">className?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">CSS class applied to the editor wrapper element.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">awareness?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean | Awareness</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Enables cursor and selection sharing between users. Pass <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">false</code> to disable or a custom <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Awareness</code> instance. Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">true</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">persistence?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean | SupabasePersistenceOptions</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Persists editor content to Supabase so it survives page reloads. Pass <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">true</code> for defaults or an options object for fine-grained control.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">theme?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ "'light' | 'dark'" }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Color theme for the editor. Maps to Monaco's <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">light</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">vs-dark</code> themes.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="supabasepersistenceoptions">
              <SectionLink id="supabasepersistenceoptions" /> SupabasePersistenceOptions
            </h3>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Option</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Type</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Default</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">table</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ "'yjs_documents'" }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Name of the Postgres table used to store documents.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">schema</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ "'public'" }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Schema where the table is located.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">roomColumn</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ "'room'" }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Column used as the document identifier.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stateColumn</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ "'state'" }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Column used to store the binary Yjs state.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">storeTimeout</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">number</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">1000</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Debounce delay (ms) before persisting changes.</td>
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
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://github.com/supabase-community/y-supabase">
                  @supabase-labs/y-supabase
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://docs.yjs.dev/">
                  Yjs documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">On This Page</p>
              <ul className="m-0 list-none">
                {sections.map((s) => (
                  <li key={s.id} className="mt-0 pt-2">
                    <a
                      href={'#' + s.id}
                      className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
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

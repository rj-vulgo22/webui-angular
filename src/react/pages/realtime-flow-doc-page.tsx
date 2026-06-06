'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'how-it-works-under-the-hood', title: 'How it works under the hood' },
  { id: 'usage', title: 'Usage' },
  { id: 'realtimeflow-props', title: 'RealtimeFlow Props' },
  { id: 'userealtimeflow-options', title: 'useRealtimeFlow Options' },
  { id: 'userealtimeflow-return-value', title: 'useRealtimeFlow Return Value' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/realtime-flow-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/realtime-flow-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/realtime-flow-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/realtime-flow-nextjs.json',
}

const fileTree: TreeNode[] = [
  { name: 'components', type: 'folder', open: true, children: [
    { name: 'realtime-flow.tsx', type: 'file' },
  ]},
  { name: 'hooks', type: 'folder', open: true, children: [
    { name: 'use-realtime-flow.ts', type: 'file' },
  ]},
  { name: 'lib', type: 'folder', open: true, children: [
    { name: 'supabase', type: 'folder', open: true, children: [
      { name: 'client.ts', type: 'file' },
      { name: 'middleware.ts', type: 'file' },
      { name: 'server.ts', type: 'file' },
    ]},
  ]},
]

const flowCode = `'use client'

import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { SupabasePersistenceOptions } from '@supabase-labs/y-supabase'

import { RealtimeFlowOverlay } from './realtime-flow-overlay'
import { useRealtimeFlow } from '../hooks/use-realtime-flow'

type RealtimeFlowProps = {
  channel: string
  className?: string
  style?: React.CSSProperties
  persistence?: boolean | SupabasePersistenceOptions
  initialNodes?: Node[]
  initialEdges?: Edge[]
  nodeTypes?: NodeTypes
  edgeTypes?: EdgeTypes
  height?: string | number
}

const DEFAULT_HEIGHT = 550

const RealtimeFlowContent = ({
  channel,
  className,
  style,
  persistence,
  initialNodes,
  initialEdges,
  nodeTypes,
  edgeTypes,
  height = DEFAULT_HEIGHT,
}: RealtimeFlowProps) => {
  const { nodes, edges, synced, syncError, onNodesChange, onEdgesChange, onConnect } =
    useRealtimeFlow({
      channel,
      persistence,
      initialNodes,
      initialEdges,
    })

  return (
    <div style={{ height, position: 'relative', ...style }} className={className}>
      <ReactFlow
        nodes={synced ? nodes : []}
        edges={synced ? edges : []}
        onNodesChange={synced ? onNodesChange : undefined}
        onEdgesChange={synced ? onEdgesChange : undefined}
        onConnect={synced ? onConnect : undefined}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {!synced && !syncError && <RealtimeFlowOverlay status="syncing" />}
      {!synced && syncError && <RealtimeFlowOverlay status="error" message={syncError} />}
    </div>
  )
}

const RealtimeFlow = (props: RealtimeFlowProps) => (
  <ReactFlowProvider>
    <RealtimeFlowContent {...props} />
  </ReactFlowProvider>
)

export { RealtimeFlow }`

const basicUsageCode = `import { RealtimeFlow } from '@/components/realtime-flow'

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  { id: '2', position: { x: 250, y: 150 }, data: { label: 'Node B' } },
]

const edges = [{ id: 'e1-2', source: '1', target: '2' }]

export default function FlowPage() {
  return <RealtimeFlow channel="realtime-flow-demo" initialNodes={nodes} initialEdges={edges} />
}`

const sqlCode = `create table yjs_documents (
  room text primary key,
  state text not null
);`

const persistenceUsageCode = `import { RealtimeFlow } from '@/components/realtime-flow'

export default function FlowPage() {
  return (
    <RealtimeFlow
      channel="realtime-flow-demo"
      initialNodes={nodes}
      initialEdges={edges}
      persistence
    />
  )
}`

const persistenceOptionsCode = `import type { SupabasePersistenceOptions } from '@supabase-labs/y-supabase'

const persistenceOptions = {
  table: 'yjs_documents',
  roomColumn: 'room',
  stateColumn: 'state',
  storeTimeout: 2000,
} satisfies SupabasePersistenceOptions

export default function FlowPage() {
  return (
    <RealtimeFlow
      channel="realtime-flow-demo"
      initialNodes={nodes}
      initialEdges={edges}
      persistence={persistenceOptions}
    />
  )
}`

const hookCode = `import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  type Node,
  type Edge,
} from '@xyflow/react'
import { useRealtimeFlow } from '@/hooks/use-realtime-flow'

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  { id: '2', position: { x: 250, y: 150 }, data: { label: 'Node B' } },
]

export default function FlowPage() {
  const { nodes, edges, synced, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } =
    useRealtimeFlow({
      channel: 'my-flow',
      initialNodes,
    })

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={synced ? nodes : []}
        edges={synced ? edges : []}
        onNodesChange={synced ? onNodesChange : undefined}
        onEdgesChange={synced ? onEdgesChange : undefined}
        onConnect={synced ? onConnect : undefined}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  )
}`

const setNodesEdgesCode = `// Add a node
setNodes((prev) => [...prev, newNode])

// Update a node
setNodes((prev) => prev.map((n) => (n.id === '1' ? { ...n, data: { label: 'Updated' } } : n)))

// Remove a node and its connected edges
setNodes((prev) => prev.filter((n) => n.id !== '1'))
setEdges((prev) => prev.filter((e) => e.source !== '1' && e.target !== '1'))`

export function RealtimeFlowDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Realtime Flow</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Realtime Flow</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Real-time flow diagram editor for collaborative applications
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
                  {flowCode.split('\n').map((line, i) => (
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
              The Realtime Flow component provides a collaborative diagram editor powered by{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://reactflow.dev/">
                React Flow
              </a>{' '}
              and{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://yjs.dev/">
                Yjs
              </a>. It uses{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://github.com/supabase-community/y-supabase">
                @supabase-labs/y-supabase
              </a>{' '}
              under the hood to sync diagram state across clients through Supabase Realtime.
            </p>

            <p className="font-heading mt-8 scroll-m-20 text-xl tracking-tight font-semibold text-foreground">
              Features
            </p>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Real-time node and edge synchronization via Supabase Realtime broadcast</li>
              <li className="mt-2">Drag nodes, create connections, and delete elements collaboratively</li>
              <li className="mt-2">Optional persistence to Postgres so diagrams survive page reloads</li>
              <li className="mt-2">Supports custom node and edge types</li>
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
              document with two shared maps — one for nodes and one for edges — and connects it to a Supabase Realtime channel using <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">SupabaseProvider</code> from <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">@supabase-labs/y-supabase</code>. Each node and edge is stored by its ID in the respective <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Y.Map</code>, enabling per-element conflict resolution.
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              When a user drags a node, creates a connection, or deletes an element, the change is applied to the local React Flow state and simultaneously written to the Yjs document. Remote changes from other clients are observed and applied to the local state automatically.
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
              Enable persistence to save the diagram to your Supabase database. This requires a table to store the Yjs document state.
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

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="using-the-hook-for-full-control">
              <SectionLink id="using-the-hook-for-full-control" /> Using the hook for full control
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              If you need programmatic access to nodes and edges (e.g. adding nodes, custom node types with editable data), use the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">useRealtimeFlow</code> hook directly instead of the component:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {hookCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">setNodes</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">setEdges</code> accept a new array or an updater function, just like React's <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">useState</code>:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {setNodesEdgesCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="realtimeflow-props">
              <SectionLink id="realtimeflow-props" /> RealtimeFlow Props
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
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Unique channel name used to sync diagram state between collaborators in the same session.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">initialNodes?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Node[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Initial nodes to populate the diagram. Only used if no existing state is found after sync.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">initialEdges?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Edge[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Initial edges to populate the diagram. Only used if no existing state is found after sync.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">height?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string | number</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Height of the flow container. Accepts a pixel number or CSS string (e.g. <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'"100%"'}</code>). Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">550</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">className?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">CSS class applied to the flow wrapper element.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">style?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">React.CSSProperties</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Inline styles applied to the flow wrapper element.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">persistence?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean | SupabasePersistenceOptions</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Persists diagram state to Supabase so it survives page reloads. Pass <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">true</code> for defaults or an options object for fine-grained control.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">nodeTypes?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">NodeTypes</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Custom node type definitions for React Flow.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">edgeTypes?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">EdgeTypes</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Custom edge type definitions for React Flow.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="userealtimeflow-options">
              <SectionLink id="userealtimeflow-options" /> useRealtimeFlow Options
            </h2>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Option</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Type</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">channel</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Unique channel name used to sync diagram state between collaborators in the same session.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">initialNodes?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Node[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Initial nodes to populate the diagram. Only used if no existing state is found after sync.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">initialEdges?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Edge[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Initial edges to populate the diagram. Only used if no existing state is found after sync.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">awareness?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean | Awareness</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Enables presence tracking between users. Pass <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">false</code> to disable or a custom <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Awareness</code> instance. Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">true</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">persistence?</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean | SupabasePersistenceOptions</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Persists diagram state to Supabase so it survives page reloads. Pass <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">true</code> for defaults or an options object for fine-grained control.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="userealtimeflow-return-value">
              <SectionLink id="userealtimeflow-return-value" /> useRealtimeFlow Return Value
            </h2>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Property</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Type</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">nodes</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Node[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Current nodes array, kept in sync across all connected clients.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">edges</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Edge[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Current edges array, kept in sync across all connected clients.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">synced</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Whether the initial sync has completed. Render empty state until true.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">onNodesChange</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '(changes: NodeChange[]) => void' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Pass directly to React Flow's <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">onNodesChange</code> prop.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">onEdgesChange</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '(changes: EdgeChange[]) => void' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Pass directly to React Flow's <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">onEdgesChange</code> prop.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">onConnect</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '(connection: Connection) => void' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Pass directly to React Flow's <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">onConnect</code> prop.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">setNodes</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '(nodes: Node[] | (prev: Node[]) => Node[]) => void' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Update nodes programmatically. Changes are synced to all clients.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">setEdges</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '(edges: Edge[] | (prev: Edge[]) => Edge[]) => void' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Update edges programmatically. Changes are synced to all clients.</td>
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
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://reactflow.dev/">
                  React Flow documentation
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

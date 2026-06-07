'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export interface TreeNode {
  name: string
  type: 'folder' | 'file'
  open?: boolean
  active?: boolean
  children?: TreeNode[]
}

export function SectionLink({ id }: { id: string }) {
  return (
    <a
      className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2 subheading-anchor"
      aria-label="Link to section"
      href={'#' + id}
    >
      <span className="icon icon-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline h-4 w-4">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </span>
    </a>
  )
}

export function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-open text-muted-foreground">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

export function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file shrink-0">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

export function ChevronRightIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={'lucide lucide-chevron-right text-muted-foreground ' + (open ? 'rotate-90' : '')}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function FileTreeItem({ node, depth, activePath }: { node: TreeNode; depth: number; activePath?: string }) {
  const [open, setOpen] = useState(node.open ?? false)
  const isActive = node.type === 'file' && activePath !== undefined && node.name === activePath
  const paddingLeft = depth * 16 + 8

  if (node.type === 'folder') {
    return (
      <li>
        <div
          className="flex items-center gap-1.5 h-[28px] text-muted-foreground hover:bg-muted cursor-pointer"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => setOpen(!open)}
        >
          <ChevronRightIcon open={open} />
          <FolderIcon />
          <span className="truncate text-sm text-foreground/80">{node.name}</span>
        </div>
        {open && node.children && (
          <ul>
            {node.children.map((child, i) => (
              <FileTreeItem key={i} node={child} depth={depth + 1} activePath={activePath} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <div
        className={'flex items-center gap-1.5 h-[28px] cursor-pointer relative ' + (isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted')}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {isActive && <div className="absolute left-0 h-full w-0.5 bg-foreground" />}
        <FileIcon />
        <span className="truncate text-sm">{node.name}</span>
      </div>
    </li>
  )
}

export function PackageManagerTabs({ installCommands }: { installCommands: Record<string, string> }) {
  const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
  const [value, setValue] = useState<string>('npm')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('package-manager-copy-command') : null
    if (saved && PACKAGE_MANAGERS.includes(saved as typeof PACKAGE_MANAGERS[number])) {
      setValue(saved)
    }
  }, [])

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    if (typeof window !== 'undefined') {
      localStorage.setItem('package-manager-copy-command', newValue)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <div className="mt-4">
        <div className="w-full group relative rounded-lg bg-surface-200 dark:bg-surface-100 px-4 py-2 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-linear-to-l from-transparent via-[#bbb] dark:via-white to-transparent opacity-10 z-0"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatType: 'loop' }}
          />
          <div className="flex flex-col">
            <TabsList variant="line" className="gap-2 relative mb-2 z-10">
              {PACKAGE_MANAGERS.map((pm) => (
                <TabsTrigger key={pm} value={pm} className="text-xs data-active:after:opacity-100">{pm}</TabsTrigger>
              ))}
            </TabsList>
            {PACKAGE_MANAGERS.map((pm) => (
              <TabsContent key={pm} value={pm} className="m-0">
                <div className="flex items-center">
                  <div className="flex-1 font-mono text-sm text-foreground relative z-10">
                    <span className="mr-2 text-[#888] select-none">$</span>
                    {installCommands[pm]}
                  </div>
                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(installCommands[pm])}
                      className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-surface-100 dark:hover:bg-surface-200 transition-colors"
                    >
                      {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy h-4 w-4 text-muted-foreground">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </div>
      </div>
    </Tabs>
  )
}

export function CopyButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={'justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-hidden transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-border hover:border-foreground/30 focus-visible:outline-ring data-[state=open]:border-border data-[state=open]:outline-ring text-base md:text-sm leading-4 z-10 h-6 w-6 text-muted-foreground hover:bg-muted hover:text-foreground p-0 absolute right-4 top-4 ' + (className ?? '')}
      tabIndex={0}
    >
      <span className="truncate">
        <span className="sr-only">Copy</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy h-3 w-3">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </span>
    </button>
  )
}

export function EnvVarsBlock() {
  return (
    <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
      <pre className="px-4">
        <code>
          <div>NEXT_PUBLIC_SUPABASE_URL=</div>
          <div>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=</div>
        </code>
      </pre>
      <CopyButton />
    </div>
  )
}

export function FileTreeSection({ fileTree, activePath, note }: { fileTree: TreeNode[]; activePath?: string; note?: ReactNode }) {
  return (
    <div className="flex mt-4 border rounded-lg overflow-hidden h-auto not-prose">
      <div className="w-64 py-2 border-r bg-muted/30 overflow-y-auto shrink-0">
        {note && <div className="px-4 pb-2 text-xs text-muted-foreground font-medium">{note}</div>}
        <ul className="text-sm">
          {fileTree.map((node, i) => (
            <FileTreeItem key={i} node={node} depth={0} activePath={activePath} />
          ))}
        </ul>
      </div>
      <div className="group relative w-full max-w-[90vw] md:max-w-none overflow-auto">
        <pre className="p-4 w-full h-full max-w-none font-mono text-xs rounded-none border-none bg-muted/30" style={{ lineHeight: 1.4 }}>
          <code>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">1</span><span style={{ color: '#569cd6' }}>import</span> {'{'} Card, CardContent, CardHeader, CardTitle {'}'} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'@/components/ui/card'</span></div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">2</span></div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">3</span><span style={{ color: '#569cd6' }}>export</span> <span style={{ color: '#569cd6' }}>default</span> <span style={{ color: '#569cd6' }}>async</span> <span style={{ color: '#569cd6' }}>function</span> <span style={{ color: '#3ECF8E' }}>Page</span>({'{'} searchParams {'}'}: {'{'} searchParams: Promise&lt;{'{'} error: string {'}'}&gt; {'}'}) {'{'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">4</span>  <span style={{ color: '#569cd6' }}>const</span> params = <span style={{ color: '#569cd6' }}>await</span> searchParams</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">5</span></div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">6</span>  <span style={{ color: '#569cd6' }}>return</span> (</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">7</span>    {'<'}div className=<span style={{ color: '#ce9178' }}>"flex min-h-svh w-full items-center justify-center p-6 md:p-10"</span>{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">8</span>      {'<'}div className=<span style={{ color: '#ce9178' }}>"w-full max-w-sm"</span>{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">9</span>        {'<'}div className=<span style={{ color: '#ce9178' }}>"flex flex-col gap-6"</span>{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">10</span>          {'<'}Card{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">11</span>            {'<'}CardHeader{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">12</span>              {'<'}CardTitle className=<span style={{ color: '#ce9178' }}>"text-2xl"</span>{'>'}Sorry, something went wrong.{'<'}/CardTitle{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">13</span>            {'<'}/CardHeader{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">14</span>            {'<'}CardContent{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">15</span>              {'{'}params?.error ? (</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">16</span>                {'<'}p className=<span style={{ color: '#ce9178' }}>"text-sm text-muted-foreground"</span>{'>'}Code error: {'{'}params.error{'}'}{'<'}/p{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">17</span>              ) : (</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">18</span>                {'<'}p className=<span style={{ color: '#ce9178' }}>"text-sm text-muted-foreground"</span>{'>'}An unspecified error occurred.{'<'}/p{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">19</span>              {'}'})</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">20</span>            {'<'}/CardContent{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">21</span>          {'<'}/Card{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">22</span>        {'<'}/div{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">23</span>      {'<'}/div{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">24</span>    {'<'}/div{'>'}</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">25</span>  )</div>
            <div><span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">26</span>{'}'}</div>
          </code>
        </pre>
        <CopyButton />
      </div>
    </div>
  )
}

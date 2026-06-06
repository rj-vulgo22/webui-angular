'use client'

import { useState } from 'react'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'usage', title: 'Usage' },
  { id: 'further-reading', title: 'Further reading' },
]

const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add @supabase/supabase-client-nextjs',
  pnpm: 'pnpm dlx shadcn@latest add @supabase/supabase-client-nextjs',
  yarn: 'yarn dlx shadcn@latest add @supabase/supabase-client-nextjs',
  bun: 'bunx shadcn@latest add @supabase/supabase-client-nextjs',
}

function SectionLink({ id }: { id: string }) {
  return (
    <a
      className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2 subheading-anchor"
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

function PackageManagerTabs() {
  const [active, setActive] = useState<string>('npm')

  return (
    <div className="mt-4">
      <div className="group relative rounded-lg bg-muted px-4 py-2 overflow-hidden">
        <div className="flex flex-col">
          <div className="flex items-center border-b gap-2 relative mb-2 z-10">
            {PACKAGE_MANAGERS.map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setActive(pm)}
                className={
                  'inline-flex items-center justify-center whitespace-nowrap py-1.5 transition-all text-xs ' +
                  (active === pm
                    ? 'text-foreground border-foreground border-b-2'
                    : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent')
                }
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <div className="flex-1 font-mono text-sm text-foreground relative z-10">
              <span className="mr-2 text-[#888] select-none">$</span>
              {INSTALL_COMMANDS[active]}
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md h-10 w-10 hover:bg-muted transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy h-4 w-4">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FileTree() {
  return (
    <div className="flex mt-4 border rounded-lg overflow-hidden h-[652px] not-prose">
      <div className="w-64 py-2 border-r bg-muted/30 overflow-y-auto shrink-0">
        <ul className="text-sm">
          <li>
            <div className="flex items-center gap-1.5 h-[28px] px-4 text-foreground/60 hover:bg-muted cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground rotate-90"><path d="m9 18 6-6-6-6" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-open text-muted-foreground"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" /></svg>
              <span className="truncate text-sm text-foreground/80">lib</span>
            </div>
            <ul>
              <li>
                <div className="flex items-center gap-1.5 h-[28px] pl-9 text-foreground/60 hover:bg-muted cursor-pointer relative">
                  <div className="absolute left-[23px] h-full w-px bg-border" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground rotate-90"><path d="m9 18 6-6-6-6" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-open text-muted-foreground"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" /></svg>
                  <span className="truncate text-sm text-foreground/80">supabase</span>
                </div>
                <ul>
                  <li>
                    <div className="flex items-center gap-1.5 h-[28px] pl-[54px] bg-muted text-foreground cursor-pointer relative">
                      <div className="absolute left-[23px] h-full w-px bg-border" />
                      <div className="absolute left-[42px] h-full w-px bg-border" />
                      <div className="absolute left-0 h-full w-0.5 bg-foreground" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                      <span className="truncate text-sm">client.ts</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-1.5 h-[28px] pl-[54px] text-foreground/60 hover:bg-muted cursor-pointer relative">
                      <div className="absolute left-[23px] h-full w-px bg-border" />
                      <div className="absolute left-[42px] h-full w-px bg-border" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                      <span className="truncate text-sm">middleware.ts</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-1.5 h-[28px] pl-[54px] text-foreground/60 hover:bg-muted cursor-pointer relative">
                      <div className="absolute left-[23px] h-full w-px bg-border" />
                      <div className="absolute left-[42px] h-full w-px bg-border" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                      <span className="truncate text-sm">server.ts</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="group relative max-w-[90vw] md:max-w-none overflow-auto w-full">
        <pre className="p-4 w-full h-full max-w-none font-mono text-xs rounded-none border-none bg-muted/30" style={{ lineHeight: 1.4 }}>
          <code>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">1</span><span style={{ color: '#569cd6' }}>import</span> {'{'} createBrowserClient {'}'} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'@supabase/ssr'</span></div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">2</span></div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">3</span><span style={{ color: '#569cd6' }}>export</span> <span style={{ color: '#569cd6' }}>function</span> <span style={{ color: '#3ECF8E' }}>createClient</span>() {'{'}</div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">4</span>  <span style={{ color: '#569cd6' }}>return</span> createBrowserClient(</div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">5</span>    process.env.NEXT_PUBLIC_SUPABASE_URL!,</div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">6</span>    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!</div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">7</span>  )</div>
            <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">8</span>{'}'}</div>
          </code>
        </pre>
        <div className="absolute right-2 top-2">
          <button
            type="button"
            className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-hidden transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-muted hover:bg-muted border-border hover:border-foreground/30 focus-visible:outline-ring data-[state=open]:border-border data-[state=open]:outline-ring text-xs py-1 h-[26px] px-1.5"
            tabIndex={0}
          >
            <span className="inline-flex items-center justify-center shrink-0 [&_svg]:h-[14px] [&_svg]:w-[14px] text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function ClientDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Next.js</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Supabase Client Libraries</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Supabase Client Libraries</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Supabase client for Next.js
              </span>
            </p>
          </div>
        </div>

        <div className="pb-12">
          <div className="mdx">
            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="installation">
              <SectionLink id="installation" /> Installation
            </h2>

            <PackageManagerTabs />

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="folder-structure">
              <SectionLink id="folder-structure" /> Folder structure
            </h2>

            <FileTree />

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              This block installs a Supabase client for connecting your Next.js project to Supabase. It's designed for use with the App Router and fully supports server-side rendering (SSR).
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              If you've already set up your Supabase client—either using the{' '}
              <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">npx create-next-app -e with-supabase</code>{' '}
              template or another method—you can continue using your existing setup.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="getting-started">
              <SectionLink id="getting-started" /> Getting started
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              After installing the block, you'll have the following environment variables in your{' '}
              <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">.env.local</code>{' '}
              file:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  <div>NEXT_PUBLIC_SUPABASE_URL=</div>
                  <div>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=</div>
                </code>
              </pre>
              <button
                type="button"
                className="justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-hidden transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-border hover:border-foreground/30 focus-visible:outline-ring data-[state=open]:border-border data-[state=open]:outline-ring text-base md:text-sm leading-4 z-10 h-6 w-6 text-muted-foreground hover:bg-muted hover:text-foreground p-0 absolute right-4 top-4"
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
            </div>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  If you're using supabase.com, you can find these values in the{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs">
                    Connect modal
                  </a>{' '}
                  under App Frameworks or in your project's{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/settings/api">
                    API settings
                  </a>.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  If you're using a local instance of Supabase, you can find these values by running{' '}
                  <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">supabase start</code>{' '}
                  or{' '}
                  <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">supabase status</code>{' '}
                  (if you already have it running).
                </p>
              </li>
            </ul>

            <div role="alert" className="relative w-full text-sm rounded-lg border p-4 bg-muted/25 border-border text-foreground mt-4">
              <div className="text-sm text-foreground/70 font-normal">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  This Supabase client is built for SSR with the Next.js App Router. If you're building a React SPA, use the{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="/ui/docs/react-router/client">
                    React SPA client
                  </a>{' '}
                  instead.
                </p>
              </div>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/api/rest/generating-types">
                  Generating TypeScript types for your client
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
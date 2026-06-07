'use client'

const sections = [
  { id: 'principles', title: 'Principles' },
  { id: 'tints', title: 'Tints' },
  { id: 'ui-icons', title: 'UI icons' },
  { id: 'custom-icons', title: 'Custom icons' },
  { id: 'svg-design-guidelines', title: 'SVG design guidelines' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
]

function SectionLink({ id }: { id: string }) {
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

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative max-w-[90vw] md:max-w-none overflow-auto w-full my-6">
      <pre className="p-4 w-full h-full max-w-none font-mono text-xs rounded-lg border bg-muted/30" style={{ lineHeight: 1.4 }}>
        <code>
          {children}
        </code>
      </pre>
    </div>
  )
}

function Kw({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#569cd6' }}>{children}</span>
}

function Fn({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#3ECF8E' }}>{children}</span>
}

function Str({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#ce9178' }}>{children}</span>
}

function Cm({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#6a9955' }}>{children}</span>
}

function Pr({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#9cdcfe' }}>{children}</span>
}

function Pu({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#d4d4d4' }}>{children}</span>
}

const customIcons = [
  'REST-api', '_example-template', 'analytics-bucket', 'api-docs', 'auth', 'axiom',
  'big-query', 'box-plus', 'bucket-plus', 'chatgpt', 'claude', 'database',
  'datadog', 'edge-functions', 'files-bucket', 'grafana', 'graphql', 'home',
  'insert-code', 'integrations', 'last9', 'logs', 'otlp', 'postgres',
  'realtime', 'replace-code', 'reports', 'sentry', 'settings', 'sql-editor',
  'storage', 'table-editor', 'user', 'vector-bucket',
]

export function IconsDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-foreground">Icons</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Icons</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Icons make actions and navigation across Supabase easier.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="principles">
              <SectionLink id="principles" /> Principles
            </h2>
            <ol className="my-6 ml-6 list-decimal text-foreground/70">
              <li className="mt-2"><strong>Paired</strong>: Icons should accompany text, as they aren't often obvious enough on their own.</li>
              <li className="mt-2"><strong>Clear</strong>: Icons should be legible at small sizes and unembellished. Let the text do the heavy lifting.</li>
              <li className="mt-2"><strong>Consistent</strong>: Use the same icons for similar actions throughout Supabase. This makes the app easier to use.</li>
            </ol>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="tints">
              <SectionLink id="tints" /> Tints
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Use classes just like you would for <a className="underline decoration-1 underline-offset-4 hover:decoration-primary" href="/color-usage#text">text</a> to tint icons. For example:
            </p>

            <CodeBlock>
              <div>{'<'}<Fn>BucketAdd</Fn> <Pr>className</Pr>=<Str>{'"text-foreground-muted"'}</Str> {'/>'}</div>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Just like text, don't tint icons with <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">text-destructive</code> for destructive actions. There should be a confirmation dialog right after which can handle the destructive styling.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="ui-icons">
              <SectionLink id="ui-icons" /> UI icons
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We rely on <a className="underline decoration-1 underline-offset-4 hover:decoration-primary" href="https://lucide.dev/icons/">Lucide</a> for any standard UI icon needs.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="custom-icons">
              <SectionLink id="custom-icons" /> Custom icons
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Create and use custom icons when Lucide doesn't have the icon you need. Tap on an icon below to copy the JSX, SVG, or import path.
            </p>

            <div className="grid grid-cols-2 gap-2 my-6">
              {customIcons.map((name) => (
                <button
                  key={name}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-lg border bg-background p-3 text-xs text-muted-foreground hover:border-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                  title={`Click to copy ${name}`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <span className="text-[10px] leading-tight text-center break-all">{name}</span>
                </button>
              ))}
            </div>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="usage">
              <SectionLink id="usage" /> Usage
            </h3>

            <CodeBlock>
              <div><Cm>{'/*'} Import {'*/'}</Cm></div>
              <div><Kw>import</Kw> {'{'} <Fn>BucketAdd</Fn>, <Fn>InsertCode</Fn>, <Fn>ReplaceCode</Fn> {'}'} <Kw>from</Kw> <Str>{'icons'}</Str></div>
              <div> </div>
              <div><Fn>function</Fn> <Fn>app</Fn>() {'{'}</div>
              <div>  <Kw>return</Kw> (</div>
              <div>    {'<>'}</div>
              <div>      {'<'}<Fn>ReplaceCode</Fn> <Pr>className</Pr>=<Str>{'"text-light"'}</Str> <Pr>strokeWidth</Pr>={'{'}1{'}'} <Pr>size</Pr>={'{'}16{'}'} {'/>'}</div>
              <div>      {'<'}<Fn>InsertCode</Fn> <Pr>className</Pr>=<Str>{'"text-light"'}</Str> <Pr>strokeWidth</Pr>={'{'}1{'}'} <Pr>size</Pr>={'{'}16{'}'} {'/>'}</div>
              <div>      {'<'}<Fn>BucketAdd</Fn> <Pr>size</Pr>={'{'}24{'}'} <Pr>className</Pr>=<Str>{'"text-foreground-muted"'}</Str> {'/>'}</div>
              <div>    {'</>'}</div>
              <div>  )</div>
              <div>{'}'}</div>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              <strong>Default props</strong>: All icons default to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">size={'{'}24{'}'}</code>. Stroke and fill defaults come from the source SVG's root attributes (e.g. <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-width="1"</code> on the root <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<svg>'}</code> becomes the component's default <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">strokeWidth</code>). You can override those defaults at the call site, but any <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">fill</code>, or <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-width</code> set on individual child paths will still win.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="adding-new-custom-icons">
              <SectionLink id="adding-new-custom-icons" /> Adding new custom icons
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Follow these steps to add a new custom icon to the Supabase icon library.
            </p>
            <ol className="my-6 ml-6 list-decimal text-foreground/70">
              <li className="mt-2">
                <strong>Create SVG file</strong>: Add your SVG file to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">packages/icons/src/raw-icons/</code> with a kebab-case name (e.g., <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">my-new-icon.svg</code>). Make sure it follows these requirements:
                <ul className="my-4 ml-6 list-disc text-foreground/70">
                  <li className="mt-2">Exported at 24×24px with <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">viewBox="0 0 24 24"</code></li>
                  <li className="mt-2">Uses <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke="currentColor"</code> for strokes (no hardcoded colors)</li>
                  <li className="mt-2">Uses <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-width="1.5"</code> (deviate based on optical weight if necessary)</li>
                  <li className="mt-2">Uses <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">fill="none"</code> for fills (no hardcoded colors)</li>
                  <li className="mt-2">Icon content is optically centered and around 18×18px within the 24×24 frame</li>
                  <li className="mt-2">Any unnecessary elements like <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<clipPath>'}</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<defs>'}</code>, and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<g>'}</code> wrappers have been removed</li>
                  <li className="mt-2">SVG structure is as simple as possible with just <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<path>'}</code> elements</li>
                </ul>
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  For <strong>fill-only icons</strong> (e.g. logos that use shapes instead of strokes), add <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke="none"</code> to the root <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<svg>'}</code> element. The build will propagate this so the component never renders an unwanted stroke.
                </p>
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Prefer putting shared styling like <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">fill</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-width</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-linecap</code>, and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-linejoin</code> on the root <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<svg>'}</code>. The build propagates those root attributes as the component's defaults, and also converts them to camel-case for React compatibility (e.g. <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">strokeWidth</code>). If you put those attributes on individual child paths instead, they become fixed path-level styling and will override props passed to the component.
                </p>
              </li>
              <li className="mt-2">
                <strong>Build the component</strong>: Run <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">npm run build:icons</code> from inside the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">packages/icons</code> directory
              </li>
              <li className="mt-2">
                <strong>Use the icon</strong>: Import and use like any other icon:
              </li>
            </ol>

            <CodeBlock>
              <div><Kw>import</Kw> {'{'} <Fn>MyNewIcon</Fn> {'}'} <Kw>from</Kw> <Str>{'icons'}</Str></div>
            </CodeBlock>

            <CodeBlock>
              <div>{'<'}<Fn>MyNewIcon</Fn> <Pr>size</Pr>={'{'}16{'}'} <Pr>strokeWidth</Pr>={'{'}1{'}'} {'/>'}</div>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The icon name is automatically made available in camel-case, determined by the kebab-case input SVG. For example, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">my-new-icon.svg</code> will become available as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MyNewIcon</code>.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="svg-design-guidelines">
              <SectionLink id="svg-design-guidelines" /> SVG design guidelines
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Icons should:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Always be exported 24×24px</li>
              <li className="mt-2">Have an icon inside that frame that's around 18×18px(ish)</li>
              <li className="mt-2">Use clean, simple paths without unnecessary wrapper elements</li>
            </ul>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight">
              Bad example <span className="text-destructive">❌</span>
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Notice the hardcoded colors, unnecessary backgrounds, and complex structure:
            </p>

            <CodeBlock>
              <div>{'<'}<Kw>svg</Kw> <Pr>width</Pr>=<Str>"24"</Str> <Pr>height</Pr>=<Str>"24"</Str> <Pr>viewBox</Pr>=<Str>"0 0 24 24"</Str> <Pr>fill</Pr>=<Str>"none"</Str> <Pr>xmlns</Pr>=<Str>"http://www.w3.org/2000/svg"</Str>{'>'}</div>
               <div>  {'<'}<Kw>rect</Kw> <Pr>width</Pr>=<Str>"24"</Str> <Pr>height</Pr>=<Str>"24"</Str> <Pr>fill</Pr>=<Str>"#1E1E1E"</Str> {'/>'} <Cm>{'<!-- ❌ Hardcoded color -->'}</Cm></div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M..."</Str> <Pr>fill</Pr>=<Str>"#404040"</Str> {'/>'} <Cm>{'<!-- ❌ Hardcoded color -->'}</Cm></div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M..."</Str> <Pr>stroke</Pr>=<Str>"#EDEDED"</Str> <Pr>stroke-linecap</Pr>=<Str>"round"</Str> {'/>'} <Cm>{'<!-- ❌ Hardcoded color -->'}</Cm></div>
              <div>{'<'}/<Kw>svg</Kw>{'>'}</div>
            </CodeBlock>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight">
              Good example (stroke icon) <span className="text-primary">✅</span>
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Clean structure with <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">currentColor</code> and proper attributes:
            </p>

            <CodeBlock>
              <div>{'<'}<Kw>svg</Kw> <Pr>width</Pr>=<Str>"24"</Str> <Pr>height</Pr>=<Str>"24"</Str> <Pr>viewBox</Pr>=<Str>"0 0 24 24"</Str> <Pr>xmlns</Pr>=<Str>"http://www.w3.org/2000/svg"</Str> <Pr>fill</Pr>=<Str>"none"</Str> <Pr>stroke</Pr>=<Str>"currentColor"</Str> <Pr>stroke-width</Pr>=<Str>"1.5"</Str> <Pr>stroke-linecap</Pr>=<Str>"round"</Str> <Pr>stroke-linejoin</Pr>=<Str>"round"</Str>{'>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M6 7C6 4.2 8.2 2 11 2H13C15.8 2 18 4.2 18 7"</Str> {'/>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M4.5 11H19.5"</Str> {'/>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M6 11L6.8 20C6.9 21.1 7.9 22 9 22H12"</Str> {'/>'}</div>
              <div>{'<'}/<Kw>svg</Kw>{'>'}</div>
            </CodeBlock>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight">
              Good example (fill-only icon / logo) <span className="text-primary">✅</span>
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Note <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke="none"</code> on the root to prevent unwanted strokes, and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">fill="currentColor"</code> on each path:
            </p>

            <CodeBlock>
              <div>{'<'}<Kw>svg</Kw> <Pr>width</Pr>=<Str>"24"</Str> <Pr>height</Pr>=<Str>"24"</Str> <Pr>viewBox</Pr>=<Str>"0 0 24 24"</Str> <Pr>fill</Pr>=<Str>"none"</Str> <Pr>stroke</Pr>=<Str>"none"</Str> <Pr>xmlns</Pr>=<Str>"http://www.w3.org/2000/svg"</Str>{'>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M..."</Str> <Pr>fill</Pr>=<Str>"currentColor"</Str> {'/>'}</div>
              <div>{'<'}/<Kw>svg</Kw>{'>'}</div>
            </CodeBlock>

            <CodeBlock>
              <div>{'<'}<Kw>svg</Kw> <Pr>width</Pr>=<Str>"24"</Str> <Pr>height</Pr>=<Str>"24"</Str> <Pr>viewBox</Pr>=<Str>"0 0 24 24"</Str> <Pr>xmlns</Pr>=<Str>"http://www.w3.org/2000/svg"</Str>{'>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M6 7C6 4.2 8.2 2 11 2H13C15.8 2 18 4.2 18 7"</Str> {'/>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M4.5 11H19.5"</Str> {'/>'}</div>
              <div>  {'<'}<Kw>path</Kw> <Pr>d</Pr>=<Str>"M6 11L6.8 20C6.9 21.1 7.9 22 9 22H12"</Str> {'/>'}</div>
              <div>{'<'}/<Kw>svg</Kw>{'>'}</div>
            </CodeBlock>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="troubleshooting">
              <SectionLink id="troubleshooting" /> Troubleshooting
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              If your SVG specifies <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">stroke-width</code> attributes on individual child paths, they will override the component's <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">strokeWidth</code> prop. Keep shared stroke attributes on the root <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<svg>'}</code> and remove them from individual paths if you want consumers to control stroke weight.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t py-8">
          <a
            href="/copywriting"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/copywriting'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>
              <span className="block text-xs">Previous</span>
              <span className="block font-medium">Copywriting</span>
            </span>
          </a>
          <a
            href="/tailwind-classes"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/tailwind-classes'
            }}
          >
            <span>
              <span className="block text-xs">Next</span>
              <span className="block font-medium">Tailwind Classes</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
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

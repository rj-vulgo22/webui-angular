'use client'

import { type ReactNode } from 'react'
import { Link } from 'lucide-react'

const sections = [
  { id: 'text', title: 'Text' },
  { id: 'background', title: 'Background' },
  { id: 'border', title: 'Border' },
  { id: 'other-colors', title: 'Other Colors' },
  { id: 'color-palette', title: 'Color palette' },
]

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

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="group relative max-w-[90vw] md:max-w-none overflow-auto w-full my-6">
      <pre className="p-4 w-full h-full max-w-none font-mono text-xs rounded-lg border bg-muted/30" style={{ lineHeight: 1.4 }}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Kw({ children }: { children: ReactNode }) {
  return <span style={{ color: '#569cd6' }}>{children}</span>
}

function Fn({ children }: { children: ReactNode }) {
  return <span style={{ color: '#3ECF8E' }}>{children}</span>
}

function Str({ children }: { children: ReactNode }) {
  return <span style={{ color: '#ce9178' }}>{children}</span>
}

function Cm({ children }: { children: ReactNode }) {
  return <span style={{ color: '#6a9955' }}>{children}</span>
}

type SwatchGroup = { label: string; colors: { name: string; bg?: string; text?: string; border?: string; label?: string }[] }

function TextSwatches({ groups }: { groups: SwatchGroup }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-6">
      {groups.colors.map((c) => (
        <div key={c.name} className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium" style={c.text ? { color: c.text } : {}}>{c.label || c.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{c.name}</p>
        </div>
      ))}
    </div>
  )
}

function BgSwatches({ groups }: { groups: SwatchGroup }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-6">
      {groups.colors.map((c) => (
        <div key={c.name} className="rounded-lg border overflow-hidden">
          <div className="h-12" style={{ backgroundColor: c.bg || 'var(--background)' }} />
          <div className="p-2 text-center">
            <p className="text-xs font-medium">{c.name}</p>
            {c.label && <p className="text-[10px] text-muted-foreground">{c.label}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function BorderSwatches({ groups }: { groups: SwatchGroup }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-6">
      {groups.colors.map((c) => (
        <div key={c.name} className="rounded-lg border overflow-hidden">
          <div className="h-10 m-3 rounded border-2" style={{ borderColor: c.border || 'var(--border)' }} />
          <div className="p-2 text-center border-t">
            <p className="text-xs font-medium">{c.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ColorUsageDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Color Usage</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Color usage</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Colors system breakdown with best practices.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The shorthand utility classes below simplify our full color palette by providing sensible, contrast-checked defaults. Use them whenever possible to ensure accessible text colors and balanced background fills.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="text">
              <SectionLink id="text" /> Text
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Use accent text colors (e.g. text-destructive, text-warning) sparingly to avoid visual overload.
            </p>

            <TextSwatches groups={{
              label: 'Text',
              colors: [
                { name: 'text', text: 'var(--foreground)', label: 'Postgres' },
                { name: 'text-light', text: '#6b7280', label: 'Postgres' },
                { name: 'text-lighter', text: '#9ca3af', label: 'Postgres' },
                { name: 'text-muted', text: '#9ca3af', label: 'Postgres' },
                { name: 'text-contrast', text: '#fff', label: 'Postgres', bg: '#111' },
                { name: 'text-destructive', text: '#ef4444', label: 'Postgres' },
                { name: 'text-warning', text: '#f59e0b', label: 'Postgres' },
                { name: 'text-brand', text: '#3ECF8E', label: 'Postgres' },
              ]
            }} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="background">
              <SectionLink id="background" /> Background
            </h2>

            <BgSwatches groups={{
              label: 'Background',
              colors: [
                { name: 'bg-200', bg: '#e5e7eb' },
                { name: 'bg', bg: '#f9fafb' },
                { name: 'bg-alternative-200', bg: '#d1d5db' },
                { name: 'bg-alternative', bg: '#e5e7eb' },
                { name: 'bg-selection', bg: '#bfdbfe' },
                { name: 'bg-control', bg: '#fff' },
                { name: 'bg-surface-75', bg: '#f3f4f6' },
                { name: 'bg-surface-100', bg: '#fff' },
                { name: 'bg-surface-200', bg: '#f9fafb' },
                { name: 'bg-surface-300', bg: '#f3f4f6' },
                { name: 'bg-surface-400', bg: '#e5e7eb' },
                { name: 'bg-overlay', bg: '#f9fafb' },
                { name: 'bg-overlay-hover', bg: '#f3f4f6' },
                { name: 'bg-muted', bg: '#f3f4f6' },
                { name: 'bg-button', bg: '#111' },
                { name: 'bg-dialog', bg: '#fff' },
                { name: 'bg-dash-sidebar', bg: '#111' },
                { name: 'bg-dash-canvas', bg: '#f3f4f6' },
              ]
            }} />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="app-backgrounds">
              <SectionLink id="app-backgrounds" /> App backgrounds
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We use backgrounds in 2 different ways. In the ./www and ./docs sites, we use a darker background, so we have an extra background color we can use
            </p>

            <CodeBlock>
              <div>{'/*'}{' '}<Cm>./www background color</Cm></div>
              <div>{' * '}<Cm>./docs background color</Cm></div>
              <div>{' */'}</div>
              <div>{'<'}<Kw>body</Kw> <Kw>className</Kw>=<Str>{'"bg"'}</Str>{'>'}{'{'}children{'}'}<Kw>{'<'}/body</Kw>{'>'}</div>
              <div> </div>
              <div>{'/*'}{' '}<Cm>./studio background color</Cm></div>
              <div>{'<'}<Kw>body</Kw> <Kw>className</Kw>=<Str>{'"bg-studio"'}</Str>{'>'}{'{'}children{'}'}<Kw>{'<'}/body</Kw>{'>'}</div>
            </CodeBlock>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="backgrounds-and-surfaces">
              <SectionLink id="backgrounds-and-surfaces" /> Backgrounds and Surfaces
            </h3>

            <h4 className="font-heading mt-4 scroll-m-20 text-base tracking-tight">{'`./apps/www`'} + {'`./apps/docs`'}</h4>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We use surfaces in 2 different ways. In the ./www and ./docs sites, we use a darker background, so we have an extra surface color we can use
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70 italic text-muted-foreground">Loading...</p>

            <h4 className="font-heading mt-4 scroll-m-20 text-base tracking-tight">{'`./apps/studio`'}</h4>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              For the studio (dashboard) we can use <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-surface-100</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-surface-200</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-surface-300</code>
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70 italic text-muted-foreground">Loading...</p>

            <h4 className="font-heading mt-4 scroll-m-20 text-base tracking-tight">Data grid and frame space</h4>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Data grids use an alternative background color for empty space to add depth to the layout. The background of the empty space is the same background as used in <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">./apps/docs</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">./apps/www</code> - although; the color has been mapped to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-alternative</code> so it works well across different themes.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70 italic text-muted-foreground">Loading...</p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Dealing with large areas of empty space in data display should also be catered for. You can use the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-200</code> or <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg</code> class to fill the space.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="overlays">
              <SectionLink id="overlays" /> Overlays
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We use the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">./bg-overlay</code> background color for overlays. This is not to be confused with <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Dialogs</code>, they require to use the same app background color as the site.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="border">
              <SectionLink id="border" /> Border
            </h2>

            <BorderSwatches groups={{
              label: 'Border',
              colors: [
                { name: 'border', border: '#e5e7eb' },
                { name: 'border-muted', border: '#f3f4f6' },
                { name: 'border-secondary', border: '#d1d5db' },
                { name: 'border-overlay', border: '#e5e7eb' },
                { name: 'border-control', border: '#d1d5db' },
                { name: 'border-alternative', border: '#9ca3af' },
                { name: 'border-strong', border: '#9ca3af' },
                { name: 'border-stronger', border: '#6b7280' },
                { name: 'border-button', border: '#6b7280' },
                { name: 'border-button-hover', border: '#374151' },
              ]
            }} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="other-colors">
              <SectionLink id="other-colors" /> Other Colors
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              These can also be accessed with <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">foreground</code>. Like <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">text-foreground-light</code>.
            </p>

            <BgSwatches groups={{
              label: 'Other Colors',
              colors: [
                { name: 'bg-destructive-200', bg: '#fecaca' },
                { name: 'bg-destructive-300', bg: '#fca5a5' },
                { name: 'bg-destructive-400', bg: '#f87171' },
                { name: 'bg-destructive-500', bg: '#ef4444' },
                { name: 'bg-destructive-600', bg: '#dc2626' },
                { name: 'bg-destructive', bg: '#ef4444' },
                { name: 'bg-warning-200', bg: '#fde68a' },
                { name: 'bg-warning-300', bg: '#fcd34d' },
                { name: 'bg-warning-400', bg: '#fbbf24' },
                { name: 'bg-warning-500', bg: '#f59e0b' },
                { name: 'bg-warning-600', bg: '#d97706' },
                { name: 'bg-warning', bg: '#f59e0b' },
                { name: 'bg-brand-200', bg: '#a7f3d0' },
                { name: 'bg-brand-300', bg: '#6ee7b7' },
                { name: 'bg-brand-400', bg: '#34d399' },
                { name: 'bg-brand-500', bg: '#10b981' },
                { name: 'bg-brand-600', bg: '#059669' },
                { name: 'bg-brand', bg: '#3ECF8E' },
                { name: 'bg-brand-link', bg: '#3ECF8E' },
                { name: 'bg-_secondary-200', bg: '#e0e7ff' },
                { name: 'bg-_secondary-400', bg: '#818cf8' },
                { name: 'bg-_secondary', bg: '#6366f1' },
                { name: 'bg-code_block-1', bg: '#1e293b' },
                { name: 'bg-code_block-2', bg: '#1e3a5f' },
                { name: 'bg-code_block-3', bg: '#312e81' },
                { name: 'bg-code_block-4', bg: '#374151' },
                { name: 'bg-code_block-5', bg: '#1e1b4b' },
              ]
            }} />

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="color-palette">
              <SectionLink id="color-palette" /> Color palette
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Every Radix scale exposed via <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">--colors-{'{'}name{'}{'}1..12{'}'}</code>. Click a swatch to copy the CSS variable reference. The colors are taken from <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">@radix-ui/colors</code> v0.1.9 except the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Brand</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Scale</code> colors.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Brand</code> colors issue of not being uniform across the whole scale is known, they need to be refactored. The <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">brand-200</code> variable in the dark themes is also bad.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 my-6">
              {[
                { name: 'Amber', colors: ['#fffbeb','#fef3c7','#fde68a','#fcd34d','#fbbf24','#f59e0b','#d97706','#b45309','#92400e','#78350f','#451a03','#1c0d00'] },
                { name: 'Blue', colors: ['#eff6ff','#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a','#172554','#0f172a'] },
                { name: 'Brand', colors: ['#ecfdf5','#d1fae5','#a7f3d0','#6ee7b7','#34d399','#10b981','#059669','#047857','#065f46','#064e3b','#022c22','#011a11'] },
                { name: 'Crimson', colors: ['#fff1f2','#ffe4e6','#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#be123c','#9f1239','#881337','#4c0519','#2c0010'] },
                { name: 'Gold', colors: ['#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12','#422006','#241400'] },
                { name: 'Gray', colors: ['#f9fafb','#f3f4f6','#e5e7eb','#d1d5db','#9ca3af','#6b7280','#4b5563','#374151','#1f2937','#111827','#0f172a','#030712'] },
                { name: 'Green', colors: ['#f0fdf4','#dcfce7','#bbf7d0','#86efac','#4ade80','#22c55e','#16a34a','#15803d','#166534','#14532d','#052e16','#021a0b'] },
                { name: 'Indigo', colors: ['#eef2ff','#e0e7ff','#c7d2fe','#a5b4fc','#818cf8','#6366f1','#4f46e5','#4338ca','#3730a3','#312e81','#1e1b4b','#131240'] },
                { name: 'Orange', colors: ['#fff7ed','#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#ea580c','#c2410c','#9a3412','#7c2d12','#431407','#210900'] },
                { name: 'Pink', colors: ['#fdf2f8','#fce7f3','#fbcfe8','#f9a8d4','#f472b6','#ec4899','#db2777','#be185d','#9d174d','#831843','#500724','#2c0014'] },
                { name: 'Purple', colors: ['#faf5ff','#f3e8ff','#e9d5ff','#d8b4fe','#c084fc','#a855f7','#9333ea','#7e22ce','#6b21a8','#581c87','#3b0764','#1f0044'] },
                { name: 'Red', colors: ['#fef2f2','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d','#450a0a','#290000'] },
                { name: 'Scale', colors: ['#f9fafb','#f3f4f6','#e5e7eb','#d1d5db','#9ca3af','#6b7280','#4b5563','#374151','#1f2937','#111827','#0f172a','#030712'] },
                { name: 'Slate', colors: ['#f8fafc','#f1f5f9','#e2e8f0','#cbd5e1','#94a3b8','#64748b','#475569','#334155','#1e293b','#0f172a','#0b1120','#020513'] },
                { name: 'Tomato', colors: ['#fff5f5','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d','#450a0a','#2c0000'] },
                { name: 'Violet', colors: ['#f5f3ff','#ede9fe','#ddd6fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#5b21b6','#4c1d95','#2e1065','#180542'] },
                { name: 'Yellow', colors: ['#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12','#422006','#241400'] },
              ].map((scale) => (
                <div key={scale.name} className="rounded-lg border overflow-hidden">
                  <div className="p-2 text-center border-b bg-muted/30">
                    <p className="text-xs font-medium">{scale.name}</p>
                  </div>
                  <div className="flex flex-col">
                    {scale.colors.map((hex, i) => (
                      <div key={i} className="flex items-center gap-1 px-2 py-0.5 hover:bg-muted/20">
                        <div className="w-4 h-4 rounded shrink-0 border" style={{ backgroundColor: hex }} />
                        <span className="text-[10px] text-muted-foreground">{i + 1}00</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-12 mb-8 border-t pt-8">
          <a
            href="/accessibility"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/accessibility'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>
              <span className="block text-xs">Previous</span>
              <span className="block font-medium">Accessibility</span>
            </span>
          </a>
          <a
            href="/copywriting"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/copywriting'
            }}
          >
            <span>
              <span className="block text-xs">Next</span>
              <span className="block font-medium">Copywriting</span>
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

'use client'

const sections = [
  { id: 'primitives', title: 'Primitives' },
  { id: 'shorthands', title: 'Shorthands' },
  { id: 'mixing-colors', title: 'Mixing colors' },
  { id: 'opacity-support', title: 'Opacity support' },
  { id: 'usage', title: 'Usage' },
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

function Pr({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#9cdcfe' }}>{children}</span>
}

function Cm({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#6a9955' }}>{children}</span>
}

export function TailwindClassesDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-foreground">Tailwind Classes</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Tailwind Classes</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Theming support for Tailwind classes.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Supabase uses Tailwind classes that in turn use CSS properties. This is to support the concept of theming, so that:
            </p>
            <ol className="my-6 ml-6 list-decimal text-foreground/70">
              <li className="mt-2">We can update themes from one place.</li>
              <li className="mt-2">We can offer custom or additional themes in the future.</li>
            </ol>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="primitives">
              <SectionLink id="primitives" /> Primitives
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We define primitive color values using these tokens:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">background</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">foreground</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">border</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">brand</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">warning</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">destructive</code></li>
            </ul>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              These values are exported from Figma as a .json file and transformed into Tailwind utilities through some scripts under <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">packages/ui/internals/tokens</code>.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Any of these colors are available on any Tailwind utility that accepts color. For example:
            </p>

            <CodeBlock>
              <div><Cm>{'//'} this uses the default foreground color for this theme</Cm></div>
              <div>{'<'}<Kw>span</Kw> <Pr>className</Pr>=<Str>{'"text-foreground"'}</Str>{'>'}{'{'}'{'}'}<Kw>{'<'}/span</Kw>{'>'}</div>
              <div> </div>
              <div><Cm>{'//'} this uses the 'light' foreground color for this theme (one notch 'softer' than the default)</Cm></div>
              <div>{'<'}<Kw>span</Kw> <Pr>className</Pr>=<Str>{'"text-foreground-light"'}</Str>{'>'}{'{'}'{'}'}<Kw>{'<'}/span</Kw>{'>'}</div>
              <div> </div>
              <div><Cm>{'//'} this uses the default warning color for this theme</Cm></div>
              <div>{'<'}<Kw>span</Kw> <Pr>className</Pr>=<Str>{'"text-warning"'}</Str>{'>'}{'{'}'{'}'}<Kw>{'<'}/span</Kw>{'>'}</div>
              <div> </div>
              <div><Cm>{'//'} this uses the '500' warning color</Cm></div>
              <div>{'<'}<Kw>span</Kw> <Pr>className</Pr>=<Str>{'"text-warning-500"'}</Str>{'>'}{'{'}'{'}'}<Kw>{'<'}/span</Kw>{'>'}</div>
            </CodeBlock>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="shorthands">
              <SectionLink id="shorthands" /> Shorthands
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We support shorthand classes for <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">background</code>, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">foreground</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">border</code>. For example:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">text-muted</code> is the same as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">text-foreground-muted</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-surface</code> is the same as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-background-surface-100</code></li>
              <li className="mt-2"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">border-strong</code> is the same as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">border-border-strong</code></li>
            </ul>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              This will stop you from needing to 'double type' the same utility name.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              You might notice we use <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">foreground</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">background</code> as prefixes, this is only because it is a Design Token standard, where as Tailwind uses <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">text</code>.
            </p>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="mixing-colors">
              <SectionLink id="mixing-colors" /> Mixing colors
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Even with shorthands, remember you can use any color. For example, <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">foreground-light</code> can also be applied on borders and backgrounds as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">border-foreground-light</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg-foreground-light</code>, if needed. Similarly, background and border primitives can be used on other Tailwind utilities.
            </p>

            <CodeBlock>
              <div><Cm>{'//'} use the text light color for some text</Cm></div>
              <div>{'<'}<Kw>span</Kw> <Pr>className</Pr>=<Str>{'"text-light"'}</Str>{'>'}{'{'}'{'}'}<Kw>{'<'}/span</Kw>{'>'}</div>
              <div> </div>
              <div><Cm>{'//'} we can use the same color for a background</Cm></div>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"bg-foreground-light"'}</Str>{'>'}</div>
              <div>    {'<'}<Kw>span</Kw>{'>'}I have the same background color as the above example{'<'}/<Kw>span</Kw>{'>'}</div>
              <div>{'<'}/<Kw>div</Kw>{'>'}</div>
            </CodeBlock>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="opacity-support">
              <SectionLink id="opacity-support" /> Opacity support
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              All colors are generated using Tailwind opacity, like <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">hsl(--background-default) / var(--tw-bg-opacity)</code>. This means all the color options in our themes can support opacity rules. For example:
            </p>

            <CodeBlock>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"flex gap-3"'}</Str>{'>'}</div>
              <div>  {'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"w-4 h-4 rounded-full bg-surface-300"'}</Str> {'/>'}</div>
              <div>  {'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"w-4 h-4 rounded-full bg-surface-300/90"'}</Str> {'/>'}</div>
              <div>  {'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"w-4 h-4 rounded-full bg-surface-300/80"'}</Str> {'/>'}</div>
              <div>  {'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"w-4 h-4 rounded-full bg-surface-300/75"'}</Str> {'/>'}</div>
              <div>  {'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"w-4 h-4 rounded-full bg-surface-300/50"'}</Str> {'/>'}</div>
              <div>{'<'}/<Kw>div</Kw>{'>'}</div>
            </CodeBlock>

            <div className="flex gap-3 my-6">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(var(--bg-surface-300))' }} />
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(var(--bg-surface-300) / 0.9)' }} />
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(var(--bg-surface-300) / 0.8)' }} />
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(var(--bg-surface-300) / 0.75)' }} />
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(var(--bg-surface-300) / 0.5)' }} />
            </div>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The following Tailwind classes are a combination of Tailwind utilities and our primitives.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Note that the shade of the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">DEFAULT</code> value on each scale pattern is variable. Sometimes it is fixed at a particular shade (such as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">500</code> or <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">600</code>), but only when contrast is sufficient.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="foreground-text">
              <SectionLink id="foreground-text" /> Foreground (Text)
            </h3>

            <div className="my-6 overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Value</th>
                    <th className="px-4 py-2 text-left font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>foreground-{'{'}DEFAULT{'}'}</code></td>
                    <td className="px-4 py-2">Default text (<strong>DEFAULT</strong> is optional)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>foreground-light</code></td>
                    <td className="px-4 py-2">Light text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>foreground-lighter</code></td>
                    <td className="px-4 py-2">Lighter text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>foreground-muted</code></td>
                    <td className="px-4 py-2">Muted text</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"text-foreground"'}</Str>{'>'}/<Kw>div</Kw>{'>'}</div>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"text-foreground-light"'}</Str>{'>'}/<Kw>div</Kw>{'>'}</div>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"text-foreground-lighter"'}</Str>{'>'}/<Kw>div</Kw>{'>'}</div>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"text-foreground-muted"'}</Str>{'>'}/<Kw>div</Kw>{'>'}</div>
              <div>{'<'}<Kw>div</Kw> <Pr>className</Pr>=<Str>{'"bg-foreground-light"'}</Str>{'>'}/<Kw>div</Kw>{'>'}</div>
            </CodeBlock>

            <hr className="my-6 border-t" />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="background">
              <SectionLink id="background" /> Background
            </h3>

            <div className="my-6 overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Value</th>
                    <th className="px-4 py-2 text-left font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-{'{'}DEFAULT{'}'}</code></td>
                    <td className="px-4 py-2">Main body background (<strong>DEFAULT</strong> is optional)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-surface-100</code></td>
                    <td className="px-4 py-2">Panels and surfaces on the same level of the main background</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-surface-200</code></td>
                    <td className="px-4 py-2">Surfaces that overlap the main content (ex. dropdowns)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-surface-300</code></td>
                    <td className="px-4 py-2">Surfaces that are stacked above background-surface-200</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-alternative</code></td>
                    <td className="px-4 py-2">Alternative background (inverted)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-overlay</code></td>
                    <td className="px-4 py-2">Overlays, Dropdowns, Popovers</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-control</code></td>
                    <td className="px-4 py-2">Inputs, Radios, Checkboxes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>background-button-{'{'}DEFAULT{'}'}</code></td>
                    <td className="px-4 py-2">Button default</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">background</code> part can be omitted when used on the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">bg</code> Tailwind utility.
            </p>

            <CodeBlock>
              <div><Kw>bg</Kw>-surface-100</div>
              <div><Kw>bg</Kw>-overlay</div>
              <div><Kw>bg</Kw>-alternative</div>
              <div><Kw>text</Kw>-background-surface-100</div>
            </CodeBlock>

            <hr className="my-6 border-t" />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="border">
              <SectionLink id="border" /> Border
            </h3>

            <div className="my-6 overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Value</th>
                    <th className="px-4 py-2 text-left font-medium">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-{'{'}DEFAULT{'}'}</code></td>
                    <td className="px-4 py-2">Default border (<strong>DEFAULT</strong> is optional)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-secondary</code></td>
                    <td className="px-4 py-2">Secondary border</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-alternative</code></td>
                    <td className="px-4 py-2">Alternative border (inverted)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-overlay</code></td>
                    <td className="px-4 py-2">Overlays, Dropdowns, Popovers</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-control</code></td>
                    <td className="px-4 py-2">Inputs, Radios, Checkboxes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-strong</code></td>
                    <td className="px-4 py-2">Hover, Focus</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-stronger</code></td>
                    <td className="px-4 py-2">Highlighted border</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-button-{'{'}DEFAULT{'}'}</code></td>
                    <td className="px-4 py-2">Button default border</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-mono text-xs"><code>border-button-hover</code></td>
                    <td className="px-4 py-2">Button default border hover</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock>
              <div><Kw>border</Kw>-overlay</div>
              <div><Kw>border</Kw>-alternative</div>
              <div><Kw>text</Kw>-border-control</div>
            </CodeBlock>

            <hr className="my-6 border-t" />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="brand">
              <SectionLink id="brand" /> Brand
            </h3>

            <div className="flex flex-wrap gap-2 my-6">
              {['200', '300', '400', '500', 'DEFAULT', '600', 'button'].map((v) => (
                <span key={v} className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-mono" style={{ backgroundColor: v === 'DEFAULT' ? 'hsl(var(--bg-brand))' : v === 'button' ? 'hsl(var(--bg-brand))' : 'hsl(var(--bg-surface-200))', borderColor: v === 'DEFAULT' ? 'hsl(var(--bg-brand))' : 'hsl(var(--bg-surface-300))' }}>
                  {v}
                </span>
              ))}
            </div>

            <hr className="my-6 border-t" />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="destructive">
              <SectionLink id="destructive" /> Destructive
            </h3>

            <div className="flex flex-wrap gap-2 my-6">
              {['200', '300', '400', '500', 'DEFAULT', '600'].map((v) => (
                <span key={v} className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-mono" style={{ backgroundColor: 'hsl(var(--bg-surface-200))', borderColor: 'hsl(var(--bg-surface-300))' }}>
                  {v}
                </span>
              ))}
            </div>

            <hr className="my-6 border-t" />

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="warning">
              <SectionLink id="warning" /> Warning
            </h3>

            <div className="flex flex-wrap gap-2 my-6">
              {['200', '300', '400', '500', 'DEFAULT', '600'].map((v) => (
                <span key={v} className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-mono" style={{ backgroundColor: 'hsl(var(--bg-surface-200))', borderColor: 'hsl(var(--bg-surface-300))' }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t py-8">
          <a
            href="/icons"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/icons'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>
              <span className="block text-xs">Previous</span>
              <span className="block font-medium">Icons</span>
            </span>
          </a>
          <a
            href="/theming"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/theming'
            }}
          >
            <span>
              <span className="block text-xs">Next</span>
              <span className="block font-medium">Theming</span>
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

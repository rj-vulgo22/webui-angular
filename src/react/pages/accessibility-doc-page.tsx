'use client'

import { type ReactNode } from 'react'
import { Link } from 'lucide-react'

const sections = [
  { id: 'checklist', title: 'Checklist' },
  { id: 'focus-management', title: 'Focus management' },
  { id: 'radio-groups', title: 'Radio groups' },
  { id: 'jumping-ahead', title: 'Jumping ahead' },
  { id: 'screen-readers', title: 'Screen readers' },
  { id: 'imagery', title: 'Imagery' },
  { id: 'scaffolding', title: 'Scaffolding' },
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

function CodeBlock({ children }: { children: ReactNode }) {
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

function CodeLine({ num, children }: { num?: number; children?: ReactNode }) {
  return (
    <div>
      {num !== undefined && (
        <span className="text-muted-foreground mr-3 text-center inline-block min-w-[44px] select-none">{num}</span>
      )}
      {children || '\u00A0'}
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

export function AccessibilityDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Accessibility</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Accessibility</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Make Supabase work for everyone.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Accessibility is about making an interface work for as many people as possible across as many circumstances as possible. All of us lean on affordances that accessible experiences provide:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Keyboard navigation</li>
              <li className="mt-2">Legible and resizable elements</li>
              <li className="mt-2">Large tap targets</li>
              <li className="mt-2">Clear and simple language</li>
            </ul>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="checklist">
              <SectionLink id="checklist" /> Checklist
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              About to push some code? At a minimum, check your work against this list:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Are interactive page elements <a href="#focus-management" className="underline decoration-1 underline-offset-4 hover:decoration-primary">keyboard-focusable</a>?</li>
              <li className="mt-2">Are all elements announcable by a <a href="#screen-readers" className="underline decoration-1 underline-offset-4 hover:decoration-primary">screen reader</a>?</li>
              <li className="mt-2">Are textual elements legible and scalable?</li>
              <li className="mt-2">Can I use this on a smaller and/or older device?</li>
            </ul>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="focus-management">
              <SectionLink id="focus-management" /> Focus management
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              All interactive page elements should be reachable by keyboard. Given the below inconsistency between devices and browsers, add <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">tabIndex= {'{'}0{'}'}</code> to all buttons, links, and non-text inputs, ideally at the component level. Consider tying the state of <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">tabIndex</code> to the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">disabled</code> state of a component, if applicable.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Chromium-based browsers and Firefox handle this automatically via the Tab key. Safari, by default, requires the Option key to also be held down. Enabling <em>Keyboard navigation</em> on macOS Settings <a className="underline decoration-1 underline-offset-4 hover:decoration-primary" href="https://mayank.co/blog/safari-focus/#keyboard-navigation">removes this requirement</a> but makes links non-tabbable as a result.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Interactive page elements should also provide visual feedback upon selection via a <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">focus-visible</code> state. We use consistent focus styles such as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">inset-focus</code> so users recognize this state instantly.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              <a className="underline decoration-1 underline-offset-4 hover:decoration-primary" href="/introduction">Button</a> has all of the above built-in. Bespoke interactive elements however, such as the below interactive <a className="underline decoration-1 underline-offset-4 hover:decoration-primary" href="/introduction">Table Row</a>, require these props to be added manually:
            </p>

            <CodeBlock>
              <CodeLine num={1}>{'<'}<Kw>TableRow</Kw></CodeLine>
              <CodeLine num={2}>  <Kw>key</Kw>=<Str>{'{id}'}</Str></CodeLine>
              <CodeLine num={3}>  <Kw>className</Kw>=<Str>{'"relative cursor-pointer h-16 inset-focus"'}</Str></CodeLine>
              <CodeLine num={4}>  <Kw>onClick</Kw>={'{'}event ={'>'} {'{'}</CodeLine>
              <CodeLine num={5}>    <Kw>if</Kw> (event.currentTarget !== event.target) <Kw>return</Kw></CodeLine>
              <CodeLine num={6}>    <Fn>handleBucketNavigation</Fn>(bucket.id, event)</CodeLine>
              <CodeLine num={7}>  {'}'}{'}'}</CodeLine>
              <CodeLine num={8}>  <Kw>onKeyDown</Kw>={'{'}event ={'>'} {'{'}</CodeLine>
              <CodeLine num={9}>    <Kw>if</Kw> (event.currentTarget !== event.target) <Kw>return</Kw></CodeLine>
              <CodeLine num={10}>    <Kw>if</Kw> (event.key === <Str>{'"Enter"'}</Str> || event.key === <Str>{'" "'}</Str>) {'{'}</CodeLine>
              <CodeLine num={11}>      event.<Fn>preventDefault</Fn>()</CodeLine>
              <CodeLine num={12}>      <Fn>handleBucketNavigation</Fn>(bucket.id, event)</CodeLine>
              <CodeLine num={13}>    {'}'}{'}'}</CodeLine>
              <CodeLine num={14}>  {'}'}{'}'}</CodeLine>
              <CodeLine num={15}>  <Kw>tabIndex</Kw>={'{'}0{'}'}</CodeLine>
              <CodeLine num={16}>{'>'}</CodeLine>
              <CodeLine num={17}>  {'<'}<Kw>TableCell</Kw>{'>'}{'{'}name{'}'}<Kw>{'<'}/TableCell</Kw>{'>'}</CodeLine>
              <CodeLine num={18}><Kw>{'<'}/TableRow</Kw>{'>'}</CodeLine>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Consider also affordances like <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">ctrl</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">meta</code> key support for opening in a new tab. Anything that you can do with a mouse input should be replicable by keyboard.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              See the examples within <a className="underline decoration-1 underline-offset-4 hover:decoration-primary" href="/introduction">Table</a> for more.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="radio-groups">
              <SectionLink id="radio-groups" /> Radio groups
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Single-select option groups such as <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<'}input type=<Str>{'"radio"'}</Str>{'/>'}</code> should behave as a single control. Only the first item of radio groups should become focused with the Tab key. The next Tab should move focus from the group to the next focusable control.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Individual options inside of a group can be reached by arrow keys (&uarr; &darr; &larr; &rarr;). Space is the canonical key to activate radio options, with Enter being a secondary affordance.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="jumping-ahead">
              <SectionLink id="jumping-ahead" /> Jumping ahead
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Some keyboard-navigable content may be contain hundreds or thousands of items. Help users jump to specific content with the following mitigation strategies:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Search and filtering</li>
              <li className="mt-2">Pagination or virtualization</li>
              <li className="mt-2">{'"Jump to"'} shortcuts to skip ahead</li>
            </ul>

            <h2 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="screen-readers">
              <SectionLink id="screen-readers" /> Screen readers
            </h2>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Textual elements are supported out-of-the-box by screen readers.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="imagery">
              <SectionLink id="imagery" /> Imagery
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Images should have their contents described with an <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">alt</code> attribute. Write an objective description of the content rather than its context. For example:
            </p>

            <CodeBlock>
              <CodeLine>{'<'}<Cm>{'// Correct: painting a picture with words'}</Cm></CodeLine>
              <CodeLine>{'<'}<Kw>img</Kw> <Kw>src</Kw>=<Str>{'"beagle.png"'}</Str> <Kw>alt</Kw>=<Str>{'"A tricolor beagle galloping through a grassy field, ears in the air"'}</Str> <Kw>/</Kw>{'>'}</CodeLine>
              <CodeLine />
              <CodeLine>{'<'}<Cm>{'// Incorrect: Unhelpful context'}</Cm></CodeLine>
              <CodeLine>{'<'}<Kw>img</Kw> <Kw>src</Kw>=<Str>{'"beagle.png"'}</Str> <Kw>alt</Kw>=<Str>{'"Our logo"'}</Str> <Kw>/</Kw>{'>'}</CodeLine>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Icons and other visual elements that aren't strictly images should use the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">aria-label</code> attribute. For example:
            </p>

            <CodeBlock>
              <CodeLine>{'<'}<Kw>BucketTableCell</Kw>{'>'}</CodeLine>
              <CodeLine>  {'<'}<Kw>BucketIcon</Kw> <Kw>aria-label</Kw>=<Str>{'"bucket icon"'}</Str> <Kw>size</Kw>={'{'}16{'}'} <Kw>/</Kw>{'>'}</CodeLine>
              <CodeLine><Kw>{'<'}/BucketTableCell</Kw>{'>'}</CodeLine>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Visual elements that are <em>purely</em> visual aids may be removed from the accessibility tree via the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">aria-hidden</code> attribute. For example:
            </p>

            <CodeBlock>
              <CodeLine>{'<'}<Kw>BucketTableCell</Kw>{'>'}</CodeLine>
              <CodeLine>  {'<'}<Kw>ChevronRight</Kw> <Kw>aria-hidden</Kw>={'{'}true{'}'} <Kw>size</Kw>={'{'}14{'}'} <Kw>/</Kw>{'>'}</CodeLine>
              <CodeLine><Kw>{'<'}/BucketTableCell</Kw>{'>'}</CodeLine>
            </CodeBlock>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Never use <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">aria-hidden={'{'}true{'}'}</code> on focusable elements, since these are critical pieces of functionality.
            </p>

            <h3 className="font-heading mt-6 scroll-m-20 text-lg tracking-tight" id="scaffolding">
              <SectionLink id="scaffolding" /> Scaffolding
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Some scaffolding elements only make sense visually, in the context of surrounding visual content. For example: a table column for actions may not have a visual <em>Actions</em> label because its purpose is obvious (by nearby contents) to a sighted person. For everyone else's sake, this column should be titled with <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">sr-only</code> text:
            </p>

            <CodeBlock>
              <CodeLine>{'<'}<Kw>TableHead</Kw>{'>'}</CodeLine>
              <CodeLine>  {'<'}<Kw>span</Kw> <Kw>className</Kw>=<Str>{'"sr-only"'}</Str>{'>'}<Kw>Actions</Kw><Kw>{'<'}/span</Kw>{'>'}</CodeLine>
              <CodeLine><Kw>{'<'}/TableHead</Kw>{'>'}</CodeLine>
            </CodeBlock>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-12 mb-8 border-t pt-8">
          <a
            href="/introduction"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/introduction'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>
              <span className="block text-xs">Previous</span>
              <span className="block font-medium">Introduction</span>
            </span>
          </a>
          <a
            href="/color-usage"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
            onClick={(e) => {
              e.preventDefault()
              window.location.hash = '/color-usage'
            }}
          >
            <span>
              <span className="block text-xs">Next</span>
              <span className="block font-medium">Color Usage</span>
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

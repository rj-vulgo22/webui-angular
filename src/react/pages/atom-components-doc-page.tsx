'use client'

export function AtomComponentsDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <nav className="mb-4 flex items-center space-x-1 text-sm text-foreground-lighter" aria-label="Breadcrumb">
          <a className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-foreground transition-colors" href="#/introduction">
            Docs
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground-muted/50">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-foreground-muted">Atom components</span>
        </nav>

        <div className="space-y-2 mb-5">
          <h1 className="scroll-m-20 text-4xl tracking-tight">Atom components</h1>
          <p className="text-lg text-foreground-light">
            <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
              Fundamental building blocks of user interfaces, based on shadcn/ui components.
            </span>
          </p>
        </div>

        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border-muted h-px w-full mb-6"></div>

        <div className="pb-12">
          <div className="mdx">
            <p className="leading-7 not-first:mt-6 text-foreground-light">
              Atom components are the fundamental building blocks of our design system. These are primitive, single-purpose components that serve as the foundation for building more complex interfaces. Unlike fragment components (pre-built composite components) or UI patterns (guidelines for structuring sections), atom components are the smallest reusable units that can be composed together.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground-light">
              These components are based on{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-brand hover:decoration-2" href="https://ui.shadcn.com">
                shadcn/ui
              </a>{' '}
              and live in the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">ui</code> package, making them shareable across all Supabase applications. They provide consistent styling, accessibility, and behavior for common interface elements like buttons, inputs, cards, dialogs, and form controls.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground-light">
              Atom components are imported from the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">ui</code> package and can be used directly or combined to create fragment components and implement UI patterns. They form the base layer of our component architecture, ensuring visual and functional consistency across the entire design system.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-muted pt-6 mt-6">
          <a
            href="#/introduction"
            className="group inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>
              <span className="block text-xs text-foreground-muted">Previous</span>
              <span className="block text-sm group-hover:text-foreground transition-colors">Introduction</span>
            </span>
          </a>
          <a
            href="#/components/accordion"
            className="group inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors text-right"
          >
            <span>
              <span className="block text-xs text-foreground-muted">Next</span>
              <span className="block text-sm group-hover:text-foreground transition-colors">Accordion</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'

interface FaqItem {
  question: React.ReactNode
  answer: React.ReactNode
}

const faqItems: FaqItem[] = [
  {
    question: 'How does it work?',
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          You run a command in a new or existing project that looks something like this:
        </p>
        <div className="border rounded-md py-1 px-2 bg-muted flex items-center gap-2 mt-4">
          <p>
            <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">npx shadcn@latest add http://supabase.com/ui/r/password-based-auth-nextjs.json</code>
          </p>
          <button
            type="button"
            className="justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-hidden transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-transparent border-border hover:border-foreground/30 focus-visible:outline-ring data-[state=open]:border-border data-[state=open]:outline-border text-base md:text-sm leading-4 relative z-10 h-6 w-6 text-muted-foreground hover:bg-muted hover:text-foreground p-0 shrink-0"
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
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          This will add all of the files to your project and install the dependencies. After you've run the command, you can start using the components. In the case of Auth, you should be up and running with user sign in/sign up with just this one command.
        </p>
      </div>
    ),
  },
  {
    question: 'Will it overwrite existing files?',
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          No. If you run a command in an existing project, it will not overwrite your existing files. If there conflicting files, you will be asked what you want to do (leave them or overwrite them). If you run it in a new project, it will just add the new files to your project.
        </p>
      </div>
    ),
  },
  {
    question: "I've already started a project, what should I do?",
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          You can still use these components, even if you've already started your project! The commands won't overwrite your existing files, but you should still be careful with the changes to makes sure you understand what's been added. You should commit your changes into Git before running these commands so you'll be able to see a clean diff of the changes.
        </p>
      </div>
    ),
  },
  {
    question: "I've already installed shadcn/ui, what should I do?",
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          You're off to a great start! You can now run an add command to add the desired component to your project.
        </p>
      </div>
    ),
  },
  {
    question: (
      <p className="leading-7 not-first:mt-6 text-foreground/70">
        I already started with{' '}
        <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">npx create-next-app -e with-supabase</code>{' '}
        what should I do now?
      </p>
    ),
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          Our Next.js quickstart is a great starting point for building a full app with Supabase and Next.js. If you've already started with this template, you can just add the components in this library to your project.
        </p>
      </div>
    ),
  },
  {
    question: (
      <p className="leading-7 not-first:mt-6 text-foreground/70">
        Do I need to install one of the framework quickstarts before using this library?
      </p>
    ),
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          No. You don't need to start with one of our framework quickstarts.
        </p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          If you already have an existing project, you can just add the components in this library to your project. If you're starting from scratch, you should use one of the shadcn/ui setup guides for your framework of choice via the Quickstart page.
        </p>
      </div>
    ),
  },
  {
    question: 'I used an AI builder to build an app, what should I do?',
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          If your app is already built, you can use any of the commands to drop components into your project. Your app likely already has a Supabase client set up, so you can just continue using that if it's working well for you.
        </p>
      </div>
    ),
  },
  {
    question: 'Why is this library React-only?',
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">Several reasons.</p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          First, we use React ourselves and know the ecosystem really well. That makes this ui library easy for us to build and maintain.
        </p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          Second, this library is really just stitching together a bunch of existing shadcn/ui and internal components into Supabase-specific workflows. It's not technically a brand new, from the ground up ui library—it's using an established tool in shadcn/ui.
        </p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          Last, it's a way for us to better distribute components that we already had out there in different places (our docs and guides, different framework quickstarts, etc)
        </p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          TL;DR: shadcn/ui + our internal React experience make this easy to do well. Doing it for other ecosystems would be much more challenging.
        </p>
      </div>
    ),
  },
  {
    question: 'Any plans for other, non-React frameworks?',
    answer: (
      <div className="pb-4 pt-0">
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          Not at the moment, but we're not ruling it out.
        </p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          Our expertise is predominantly in React—that's the ecosystem in which we think we can provide the highest quality tools for our users. But we've heard from lots of people in the Vue and Svelte communities in particular, and agree something like this would be really beneficial for them.
        </p>
        <p className="leading-7 not-first:mt-6 text-foreground/70">
          This isn't a situation like &ldquo;we will never do it&rdquo;, but instead more of a &ldquo;we don't want to reinvent the wheel&rdquo;. If the right opportunity comes up for supporting Vue, Svelte, etc like this, we're very open to supporting it.
        </p>
      </div>
    ),
  },
]

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="border-b">
            <h2 className="flex">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex flex-1 gap-2 items-center justify-between py-4 font-medium transition-all hover:underline text-left text-foreground"
              >
                {item.question}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={'lucide lucide-chevron-down h-4 w-4 shrink-0 transition-transform duration-200 ' + (isOpen ? 'rotate-180' : '')}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h2>
            {isOpen && (
              <div className="overflow-hidden text-sm transition-all data-[state=open]:animate-accordion-down">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function FaqDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">FAQ</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">FAQ</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Frequently asked questions
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </div>

      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12"></div>
        </div>
      </div>
    </main>
  )
}
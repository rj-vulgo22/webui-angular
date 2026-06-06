'use client'

import { Link } from 'lucide-react'

const sections = [
  { id: 'extensible-components', title: 'Extensible components' },
  { id: 'composable-components', title: 'Composable components' },
  { id: 'supabase-clients', title: 'Supabase clients' },
  { id: 'scaffolding-for-hard-problems', title: 'Scaffolding for hard problems' },
]

function SectionLink({ id }: { id: string }) {
  return (
    <a
      className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2"
      aria-label="Link to section"
      href={'#' + id}
    >
      <Link className="inline h-4 w-4" />
    </a>
  )
}

export function IntroductionDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-foreground/40">Introduction</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Introduction</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                A flexible, open-source, React-based UI component library built on shadcn/ui, designed to simplify Supabase-powered projects with pre-built Auth, Storage, and Realtime features.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col -space-y-px"></div>

        <div className="pb-12">
          <div className="mdx">
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Our Supabase UI component library is a set of components built on top of the shadcn/ui registry system. It's designed to make building new or existing Supabase-powered projects faster and easier by providing pre-built solutions for common but challenging features—such as authentication, file uploads, and real-time updates.
            </p>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Our Supabase UI library aims to solve these issues with:
            </p>
            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Extensible components</strong>: Modify and extend simple primitives as needed.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Composable Components</strong>: Modular structure that makes components easy to integrate and combine.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Supabase Clients</strong>: Interact with Supabase however you choose.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Scaffolding for Hard Problems</strong>: Pre-built solutions for challenging features like sign-in/sign-up flows, file uploads, and real-time data sync.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>New or existing projects</strong>: Designed to work with brand new projects or to fit easily into existing ones.
                </p>
              </li>
            </ul>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="extensible-components">
              <SectionLink id="extensible-components" /> Extensible components
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Our components are designed to be easily extensible. You can modify the code to fit your needs and use it as a starting point for your own components. You can change any of the code to fit your needs and use it as a starting point for your own components. The important part is that the code is designed to make the hard parts easy, and leave the easy parts for you.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="composable-components">
              <SectionLink id="composable-components" /> Composable components
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Our components are designed to be easily composable. You can combine them to create new components that are tailored to your needs. If you want to change the design or behavior of a component, you can easily do so in your own codebase.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="supabase-clients">
              <SectionLink id="supabase-clients" /> Supabase clients
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The Supabase clients are the backbone of your apps. They are designed to be easily integrated with your existing Supabase project. We provide both client-side and server-side clients for several major frameworks, and the code is designed to be easily integrated with your existing codebase.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="scaffolding-for-hard-problems">
              <SectionLink id="scaffolding-for-hard-problems" /> Scaffolding for hard problems
            </h3>
            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Setting up something like Auth should be easy, so we've done the hard work for you. Our components are designed to be easily integrated with your new or existing Supabase projects. Installing them drops the files into place so you can get the hard parts out of the way quickly.
            </p>
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

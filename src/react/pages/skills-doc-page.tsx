'use client'

import { useState } from 'react'
import { SectionLink, CopyButton } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'learn-more', title: 'Learn more' },
]

const skillsInstallCode = `npx skills add supabase/agent-skills`

const postgresSkillCode = `npx skills add supabase/agent-skills --skill supabase-postgres-best-practices`

const claudeCode = `/plugin marketplace add supabase/agent-skills
/plugin install supabase@supabase-agent-skills`

export function SkillsDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Skills</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Skills</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Agent Skills for Supabase — procedural knowledge and context that AI agents can load on demand
              </span>
            </p>
          </div>
        </div>

        <p className="leading-7 text-foreground/70 mb-8">
          Agent Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently. Skills give agents access to procedural knowledge and Supabase-specific context they can load on demand, so they can do real work reliably.
        </p>

        <p className="leading-7 text-foreground/70 mb-8">
          Skills work with 18+ AI agents including Claude Code, GitHub Copilot, Cursor, Cline, and many others.
        </p>

        <div className="pb-12">
          <div className="mdx">
            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="installation">
              <SectionLink id="installation" /> Installation
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Run these commands in the root of your project — skills are installed per-project, similar to how you'd add a config file or dev dependency. Once installed, your AI agent will automatically pick them up the next time it runs.
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Install all Supabase skills using the skills CLI:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {skillsInstallCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              This installs the full set of Supabase skills — the right choice for most projects. If you're doing a lot of database work, also add the Postgres-specific skill:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {postgresSkillCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">supabase-postgres-best-practices</code> skill covers Postgres performance optimization, query design, and schema best practices. It's used automatically when writing, reviewing, or optimizing queries and database configurations.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="claude-code">
              <SectionLink id="claude-code" /> Claude Code
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              You can also install the skills as Claude Code plugins:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {claudeCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="learn-more">
              <SectionLink id="learn-more" /> Learn more
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              For the full list of available skills, installation options, and usage guidance, see the{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2" href="https://supabase.com/docs/guides/getting-started/ai-skills">
                Agent Skills documentation
              </a>.
            </p>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2" href="https://github.com/supabase/agent-skills">
                  Agent Skills Repository
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2" href="https://agentskills.io/home">
                  Agent Skills Documentation
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

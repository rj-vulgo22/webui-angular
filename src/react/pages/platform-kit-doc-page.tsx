'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, CopyButton } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'who-is-it-for', title: 'Who is it for' },
  { id: 'usage', title: 'Usage' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'security', title: 'Security' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/platform-kit-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/platform-kit-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/platform-kit-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/platform-kit-nextjs.json',
}

const routeCode = `import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import createClient from 'openapi-fetch'

import type { paths } from '@/platform/platform-kit-nextjs/lib/management-api-schema'
import { listTablesSql } from '@/platform/platform-kit-nextjs/lib/pg-meta'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const client = createClient<paths>({
  baseUrl: 'https://api.supabase.com',
  headers: {
    Authorization: \`Bearer \${process.env.SUPABASE_MANAGEMENT_API_TOKEN}\`,
  },
})

// Function to get database schema
async function getDbSchema(projectRef: string) {
  const token = process.env.SUPABASE_MANAGEMENT_API_TOKEN
  if (!token) {
    throw new Error('Supabase Management API token is not configured.')
  }

  const sql = listTablesSql()

  const { data, error } = await client.POST('/v1/projects/{ref}/database/query', {
    params: {
      path: {
        ref: projectRef,
      },
    },
    body: {
      query: sql,
      read_only: true,
    },
  })

  if (error) {
    throw error
  }

  return data as any
}

function formatSchemaForPrompt(schema: any) {
  let schemaString = ''
  if (schema && Array.isArray(schema)) {
    schema.forEach((table: any) => {
      const columnInfo = table.columns.map((c: any) => \`\${c.name} (\${c.data_type})\`)
      schemaString += \`Table "\${table.name}" has columns: \${columnInfo.join(', ')}.\\n\`
    })
  }
  return schemaString
}

export async function POST(request: Request) {
  try {
    const { prompt, projectRef } = await request.json()

    if (!prompt) {
      return NextResponse.json({ message: 'Prompt is required.' }, { status: 400 })
    }
    if (!projectRef) {
      return NextResponse.json({ message: 'projectRef is required.' }, { status: 400 })
    }

    // Implement your permission check here (e.g. check if the user is a member of the project)
    // In this example, everyone can access all projects
    const userHasPermissionForProject = Boolean(projectRef)

    if (!userHasPermissionForProject) {
      return NextResponse.json(
        { message: 'You do not have permission to access this project.' },
        { status: 403 }
      )
    }

    // 1. Get database schema
    const schema = await getDbSchema(projectRef)
    const formattedSchema = formatSchemaForPrompt(schema)

    // 2. Create a prompt for OpenAI
    const systemPrompt = \`You are an expert SQL assistant. Given the following database schema, write a SQL query that answers the user's question. Return only the SQL query, do not include any explanations or markdown.\\n\\nSchema:\\n\${formattedSchema}\`

    // 3. Call OpenAI to generate SQL using responses.create (plain text output)
    const response = await openai.responses.create({
      model: 'gpt-4.1',
      instructions: systemPrompt, // Use systemPrompt as instructions
      input: prompt, // User's question
    })

    const sql = response.output_text

    if (!sql) {
      return NextResponse.json(
        { message: 'Could not generate SQL from the prompt.' },
        { status: 500 }
      )
    }

    // 4. Return the generated SQL
    return NextResponse.json({ sql })
  } catch (error: any) {
    console.error('AI SQL generation error:', error)
    const errorMessage = error.message || 'An unexpected error occurred.'
    const status = error.response?.status || 500
    return NextResponse.json({ message: errorMessage }, { status })
  }
}`

const usageCode = `import { useState } from 'react'

import SupabaseManagerDialog from '@/components/supabase-manager'
import { Button } from '@/components/ui/button'
import { useMobile } from '@/hooks/use-mobile'

export default function Example() {
  const [open, setOpen] = useState(false)
  const projectRef = 'your-project-ref' // Replace with your actual project ref
  const isMobile = useMobile()

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Supabase Manager</Button>
      <SupabaseManagerDialog
        projectRef={projectRef}
        open={open}
        onOpenChange={setOpen}
        isMobile={isMobile}
      />
    </>
  )
}`

const envVarsCode = `SUPABASE_MANAGEMENT_API_TOKEN=your-personal-access-token
NEXT_PUBLIC_ENABLE_AI_QUERIES=true
OPENAI_API_KEY=your-openai-api-key`

const toasterCode = `import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`

export function PlatformKitDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Platform Kit</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Platform Kit</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                The easiest way to build platforms on top of Supabase
              </span>
            </p>
          </div>
        </div>

        <div className="pb-12">
          <div className="mdx">
            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="installation">
              <SectionLink id="installation" /> Installation
            </h2>

            <PackageManagerTabs installCommands={INSTALL_COMMANDS} />

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="folder-structure">
              <SectionLink id="folder-structure" /> Folder structure
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              This block is larger than most because it includes many components and hooks for the full platform management experience.
            </p>

            <div className="flex mt-4 border rounded-lg overflow-hidden h-auto not-prose">
              <div className="w-64 py-2 border-r bg-muted/30 overflow-y-auto shrink-0">
                <ul className="text-sm">
                  <li>
                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                      <span>app</span>
                    </div>
                    <ul>
                      <li>
                        <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '24px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                          <span>api</span>
                        </div>
                        <ul>
                          <li>
                            <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '40px' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                              <span>ai</span>
                            </div>
                            <ul>
                              <li>
                                <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '56px' }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                  <span>sql</span>
                                </div>
                                <ul>
                                  <li>
                                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '72px' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                      <span>route.ts</span>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '40px' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                              <span>supabase-proxy</span>
                            </div>
                            <ul>
                              <li>
                                <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '56px' }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                  <span>{'[...path]'}</span>
                                </div>
                                <ul>
                                  <li>
                                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '72px' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                      <span>route.ts</span>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                      <span>registry</span>
                    </div>
                    <ul>
                      <li>
                        <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '24px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                          <span>default</span>
                        </div>
                        <ul>
                          <li>
                            <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '40px' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                              <span>platform</span>
                            </div>
                            <ul>
                              <li>
                                <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '56px' }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                  <span>platform-kit-nextjs</span>
                                </div>
                                <ul>
                                  <li>
                                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '72px' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                      <span>components</span>
                                    </div>
                                    <ul>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>dynamic-form.tsx</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>logo-supabase.tsx</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>results-table.tsx</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>sql-editor.tsx</span></div></li>
                                      <li>
                                        <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                          <span>supabase-manager</span>
                                        </div>
                                        <ul>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>auth.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>database.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>index.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>logs.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>secrets.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>storage.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>suggestions.tsx</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>users.tsx</span></div></li>
                                        </ul>
                                      </li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>users-growth-chart.tsx</span></div></li>
                                    </ul>
                                  </li>
                                  <li>
                                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '72px' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                      <span>hooks</span>
                                    </div>
                                    <ul>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-auth.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-logs.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-run-query.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-secrets.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-storage.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-suggestions.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-tables.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>use-user-counts.ts</span></div></li>
                                    </ul>
                                  </li>
                                  <li>
                                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '72px' }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                      <span>lib</span>
                                    </div>
                                    <ul>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>logs.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>management-api-schema.d.ts</span></div></li>
                                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>management-api.ts</span></div></li>
                                      <li>
                                        <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                          <span>pg-meta</span>
                                        </div>
                                        <ul>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>index.ts</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>sql.ts</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>types.ts</span></div></li>
                                        </ul>
                                      </li>
                                      <li>
                                        <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '88px' }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                                          <span>schemas</span>
                                        </div>
                                        <ul>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>auth.ts</span></div></li>
                                          <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '104px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>secrets.ts</span></div></li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
                      <span>contexts</span>
                    </div>
                    <ul>
                      <li><div className="flex items-center gap-1.5 px-4 py-1.5" style={{ paddingLeft: '24px' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-foreground/30"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg><span>SheetNavigationContext.tsx</span></div></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="group relative w-full max-w-[90vw] md:max-w-none overflow-auto">
                <pre className="p-4 w-full h-full max-w-none font-mono text-xs rounded-none border-none bg-muted/30" style={{ lineHeight: 1.4 }}>
                  <code>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">1</span><span style={{ color: '#569cd6' }}>import</span> {'{'} NextResponse {'}'} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'next/server'</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">2</span><span style={{ color: '#569cd6' }}>import</span> OpenAI <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'openai'</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">3</span><span style={{ color: '#569cd6' }}>import</span> createClient <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'openapi-fetch'</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">4</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">5</span><span style={{ color: '#569cd6' }}>import</span> <span style={{ color: '#569cd6' }}>type</span> {'{'} paths {'}'} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'@/platform/platform-kit-nextjs/lib/management-api-schema'</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">6</span><span style={{ color: '#569cd6' }}>import</span> {'{'} listTablesSql {'}'} <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: 'hsl(var(--brand-link), 1)' }}>'@/platform/platform-kit-nextjs/lib/pg-meta'</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">7</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">8</span><span style={{ color: '#569cd6' }}>const</span> openai = <span style={{ color: '#569cd6' }}>new</span> OpenAI({'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">9</span>  apiKey: process.env.OPENAI_API_KEY,</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">10</span>{'}'})</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">11</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">12</span><span style={{ color: '#569cd6' }}>const</span> client = createClient{'<'}paths{'>'}({'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">13</span>  baseUrl: <span style={{ color: '#ce9178' }}>'https://api.supabase.com'</span>,</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">14</span>  headers: {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">15</span>    Authorization: <span style={{ color: '#ce9178' }}>{'`Bearer ${process.env.SUPABASE_MANAGEMENT_API_TOKEN}`'}</span>,</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">16</span>  {'}'},</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">17</span>{'}'})</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">18</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">19</span><span style={{ color: '#57a64a' }}>// Function to get database schema</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">20</span><span style={{ color: '#569cd6' }}>async</span> <span style={{ color: '#569cd6' }}>function</span> <span style={{ color: '#3ECF8E' }}>getDbSchema</span>(projectRef: string) {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">21</span>  <span style={{ color: '#569cd6' }}>const</span> token = process.env.SUPABASE_MANAGEMENT_API_TOKEN</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">22</span>  <span style={{ color: '#569cd6' }}>if</span> (!token) {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">23</span>    <span style={{ color: '#569cd6' }}>throw</span> <span style={{ color: '#569cd6' }}>new</span> Error(<span style={{ color: '#ce9178' }}>'Supabase Management API token is not configured.'</span>)</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">24</span>  {'}'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">25</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">26</span>  <span style={{ color: '#569cd6' }}>const</span> sql = listTablesSql()</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">27</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">28</span>  <span style={{ color: '#569cd6' }}>const</span> {'{'} data, error {'}'} = <span style={{ color: '#569cd6' }}>await</span> client.POST(<span style={{ color: '#ce9178' }}>'{'/v1/projects/{ref}/database/query'}'</span>, {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">29</span>    params: {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">30</span>      path: {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">31</span>        ref: projectRef,</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">32</span>      {'}'},</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">33</span>    {'}'},</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">34</span>    body: {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">35</span>      query: sql,</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">36</span>      read_only: <span style={{ color: '#569cd6' }}>true</span>,</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">37</span>    {'}'},</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">38</span>  {'}'})</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">39</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">40</span>  <span style={{ color: '#569cd6' }}>if</span> (error) {'{'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">41</span>    <span style={{ color: '#569cd6' }}>throw</span> error</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">42</span>  {'}'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">43</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">44</span>  <span style={{ color: '#569cd6' }}>return</span> data <span style={{ color: '#569cd6' }}>as</span> any</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">45</span>{'}'}</div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">46</span></div>
                    <div><span className="text-[#888] mr-3 text-center inline-block min-w-[44px] select-none">47</span><span style={{ color: '#57a64a' }}>// ... (truncated for display)</span></div>
                  </code>
                </pre>
                <CopyButton />
              </div>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="introduction">
              <SectionLink id="introduction" /> Introduction
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The Platform Kit is a collection of customizable API's, hooks and components you can use to provide an embedded Supabase experience within your own platform. It comes in the form of a single dialog that enables the management of database, authentication, storage, users, secrets, logs, and performance monitoring.
            </p>

            <p className="font-heading mt-8 scroll-m-20 text-xl tracking-tight font-semibold text-foreground">
              Features
            </p>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Database, Auth, Storage, User, Secrets, Logs, and Performance management</li>
              <li className="mt-2">Responsive dialog/drawer interface (desktop &amp; mobile)</li>
              <li className="mt-2">API proxy for Management API</li>
              <li className="mt-2">AI-powered SQL generation (optional)</li>
              <li className="mt-2">Customize to your liking</li>
            </ul>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="who-is-it-for">
              <SectionLink id="who-is-it-for" /> Who is it for
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Anyone who is providing Postgres databases to their users.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Embed the manager dialog in your app and manage its state:
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {usageCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="quick-start">
              <SectionLink id="quick-start" /> Quick Start
            </h2>

            <ol className="my-6 ml-6 list-decimal text-foreground/70">
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Set up environment variables:</strong> in your <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">.env.local</code> file:
                </p>
                <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
                  <pre className="px-4">
                    <code>
                      {envVarsCode.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </code>
                  </pre>
                  <CopyButton />
                </div>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Add project-level authentication checks</strong> in your API proxy at <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">app/api/supabase-proxy/[...path]/route.ts</code> as well as your ai/sql route at <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">app/api/ai/sql/route.ts</code> to ensure only authorized users can access their own project resources.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  <strong>Add a Toaster for notifications:</strong>
                  Place the following component at the root of your app (e.g., in your <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">layout.tsx</code> or <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">App.tsx</code>) to enable toast notifications:
                </p>
                <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
                  <pre className="px-4">
                    <code>
                      {toasterCode.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </code>
                  </pre>
                  <CopyButton />
                </div>
              </li>
            </ol>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              That's it! The default setup uses your Supabase personal access token for the Management API.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="security">
              <SectionLink id="security" /> Security
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">Never expose your Management API token to the client</li>
              <li className="mt-2">Always implement authentication and permission checks in your proxy</li>
            </ul>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/reference/api/introduction">
                  Supabase Management API
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

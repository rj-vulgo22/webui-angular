'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, EnvVarsBlock, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'usage', title: 'Usage' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/password-based-auth-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/password-based-auth-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/password-based-auth-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/password-based-auth-nextjs.json',
}

const fileTree: TreeNode[] = [
  { name: 'app', type: 'folder', open: true, children: [
    { name: 'auth', type: 'folder', open: true, children: [
      { name: 'confirm', type: 'folder', open: true, children: [
        { name: 'route.ts', type: 'file', active: true },
      ]},
      { name: 'error', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'forgot-password', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'login', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'sign-up-success', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'sign-up', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'update-password', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
    ]},
    { name: 'protected', type: 'folder', children: [
      { name: 'page.tsx', type: 'file' },
    ]},
  ]},
  { name: 'components', type: 'folder', open: true, children: [
    { name: 'forgot-password-form.tsx', type: 'file' },
    { name: 'login-form.tsx', type: 'file' },
    { name: 'logout-button.tsx', type: 'file' },
    { name: 'sign-up-form.tsx', type: 'file' },
    { name: 'update-password-form.tsx', type: 'file' },
  ]},
  { name: 'middleware.ts', type: 'file' },
  { name: 'lib', type: 'folder', open: true, children: [
    { name: 'supabase', type: 'folder', open: true, children: [
      { name: 'client.ts', type: 'file' },
      { name: 'middleware.ts', type: 'file' },
      { name: 'server.ts', type: 'file' },
    ]},
  ]},
]

const codeBlocks = {
  signupEmail: `<h2>Confirm your email address</h2>
 
<p>Follow the link below to confirm this email address and finish signing up.</p>
<p>
  <a
    href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}"
    >Confirm email address</a
  >
</p>`,
  resetPasswordEmail: `<h2>Reset your password</h2>
 
<p>We received a request to reset your password. Follow the link below to choose a new one.</p>
<p>
  <a
    href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next={{ .RedirectTo }}"
    >Reset password</a
  >
</p>`,
}

export function PasswordBasedAuthDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-foreground/40">Password-based Authentication</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Password-based Authentication</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Password-based authentication block for Next.js
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

            <FileTreeSection fileTree={fileTree} activePath="route.ts" note={<>This block includes the <a href="/client" className="underline decoration-1 underline-offset-4 hover:decoration-[#3ECF8E]">Supabase client</a>. If you already have one installed, you can skip overwriting it.</>} />

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Once you install the block in your Next.js project, you'll get all the necessary pages and components to set up a password-based authentication flow.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="getting-started">
              <SectionLink id="getting-started" /> Getting started
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              After installing the block, you'll have the following environment variables in your{' '}
              <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">.env.local</code>{' '}
              file:
            </p>

            <EnvVarsBlock />

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

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="adding-email-templates">
              <SectionLink id="adding-email-templates" /> Adding email templates
            </h3>

            <ol className="my-6 ml-6 list-decimal text-foreground/70">
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Add an{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/auth/templates">
                    email template for sign-up
                  </a>{' '}
                  to the Supabase project. Your signup email template should contain at least the following HTML:
                </p>
                <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
                  <pre className="px-4">
                    <code>
                      {codeBlocks.signupEmail.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </code>
                  </pre>
                  <CopyButton />
                </div>
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  For detailed instructions on how to configure your email templates, including the use of variables like{' '}
                  <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'{{ .SiteURL }}'}</code>,
                  <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'{{ .TokenHash }}'}</code>, and{' '}
                  <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'{{ .RedirectTo }}'}</code>, refer to our{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/auth-email-templates">
                    Email Templates guide
                  </a>.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Add an{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/auth/templates">
                    email template for reset password
                  </a>{' '}
                  to the Supabase project. Your reset password email template should contain at least the following HTML:
                </p>
                <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
                  <pre className="px-4">
                    <code>
                      {codeBlocks.resetPasswordEmail.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </code>
                  </pre>
                  <CopyButton />
                </div>
              </li>
            </ol>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="setting-up-routes-and-redirect-urls">
              <SectionLink id="setting-up-routes-and-redirect-urls" /> Setting up routes and redirect URLs
            </h3>

            <ol className="my-6 ml-6 list-decimal text-foreground/70">
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Set the site URL in the{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/auth/url-configuration">
                    URL Configuration
                  </a>{' '}
                  settings in the Supabase Dashboard.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Set up the Next.js route that users will visit to reset or update their password. Go to the{' '}
                  <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/auth/url-configuration">
                    URL Configuration
                  </a>{' '}
                  settings and add the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">forgot-password</code> route to the list of Redirect URLs. It should look something like: <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">http://example.com/auth/forgot-password</code>.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Update the redirect paths in <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">login-form.tsx</code> and <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">update-password-form.tsx</code> components to point to the logged-in routes in your app. Our examples use <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/protected</code>, but you can set this to whatever fits your app.
                </p>
              </li>
            </ol>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              You can use this block with the Pages router by moving the routes from the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">app</code> folder into the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">pages</code> folder and renaming them. Example instead of <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">app/sign-up/page.tsx</code>, you'd create a <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">pages/sign-up.tsx</code> file.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=pkce">
                  Password-based authentication (PKCE flow)
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/debugging/error-codes">
                  Authentication error codes
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/auth-email-templates">
                  Email templates
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/local-development/customizing-email-templates">
                  Email templates for local development
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/auth-smtp">
                  Custom SMTP
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

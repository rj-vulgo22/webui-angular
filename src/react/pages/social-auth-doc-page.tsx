'use client'

import { SectionLink, PackageManagerTabs, FileTreeSection, EnvVarsBlock, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'usage', title: 'Usage' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/social-auth-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/social-auth-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/social-auth-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/social-auth-nextjs.json',
}

const fileTree: TreeNode[] = [
  { name: 'app', type: 'folder', open: true, children: [
    { name: 'auth', type: 'folder', open: true, children: [
      { name: 'error', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'login', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
      ]},
      { name: 'oauth', type: 'folder', children: [
        { name: 'route.ts', type: 'file', active: true },
      ]},
    ]},
    { name: 'protected', type: 'folder', children: [
      { name: 'page.tsx', type: 'file' },
    ]},
  ]},
  { name: 'components', type: 'folder', open: true, children: [
    { name: 'login-form.tsx', type: 'file' },
    { name: 'logout-button.tsx', type: 'file' },
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

export function SocialAuthDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-foreground/60">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-foreground/60">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Social Authentication</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Social Authentication</h1>
            <p className="text-base lg:text-lg text-foreground/60">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Social authentication block for Next.js
              </span>
            </p>
          </div>
        </div>

        <p className="leading-7 text-foreground/70 mb-8">
          The block is using Github provider by default, but can be easily switched by changing a single parameter.
        </p>

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
              Once you install the block in your Next.js project, you'll get all the necessary pages and components to set up a social authentication flow.
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

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="setting-up-third-party-providers">
              <SectionLink id="setting-up-third-party-providers" /> Setting up third party providers
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              We support a wide variety of social providers that you can use to integrate with your application. The full list is available{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/social-login">
                here
              </a>. This block uses the PKCE flow with GitHub as the provider. To switch providers, just update the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">provider</code> field in the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">supabase.auth.signInWithOAuth</code> call. Enable the provider you want to use under{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/auth/providers">
                Auth Providers
              </a>{' '}
              in the Supabase Dashboard and add the necessary credentials.
            </p>

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
                  Update the redirect paths in <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">login-form.tsx</code> to point to your app's logged-in routes. Our examples use <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/protected</code>, but you can set this to whatever fits your app.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Visit <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">http://your-site-url/auth/login</code> to see this component in action.
                </p>
              </li>
            </ol>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              You can use this block with the Pages router by simply moving the routes from the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">app</code> folder into the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">pages</code> folder and renaming them. Example instead of <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">app/login/page.tsx</code>, you'd create a <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">pages/login.tsx</code> file.
            </p>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="combining-social-auth-with-password-based-auth">
              <SectionLink id="combining-social-auth-with-password-based-auth" /> Combining social auth with password-based auth
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              If you want to combine this block with the password-based auth, you need to:
            </p>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Copy the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">handleSocialLogin</code> function into the password-based <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">login-form.tsx</code> component and bind it to a &quot;Login with ...&quot; button.
                </p>
              </li>
              <li className="mt-2">
                <p className="leading-7 not-first:mt-6 text-foreground/70">
                  Copy the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">@/app/auth/oauth/route.ts</code> in your app under the same route.
                </p>
              </li>
            </ul>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/social-login">
                  Social login
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/auth/debugging/error-codes">
                  Authentication error codes
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

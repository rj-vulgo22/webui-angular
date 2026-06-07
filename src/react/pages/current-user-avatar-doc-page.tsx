'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'usage', title: 'Usage' },
  { id: 'props', title: 'Props' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/current-user-avatar-nextjs.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/current-user-avatar-nextjs.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/current-user-avatar-nextjs.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/current-user-avatar-nextjs.json',
}

const fileTree: TreeNode[] = [
  { name: 'components', type: 'folder', open: true, children: [
    { name: 'current-user-avatar.tsx', type: 'file' },
  ]},
  { name: 'hooks', type: 'folder', open: true, children: [
    { name: 'use-current-user-image.ts', type: 'file' },
    { name: 'use-current-user-name.ts', type: 'file' },
  ]},
  { name: 'lib', type: 'folder', open: true, children: [
    { name: 'supabase', type: 'folder', open: true, children: [
      { name: 'client.ts', type: 'file' },
      { name: 'middleware.ts', type: 'file' },
      { name: 'server.ts', type: 'file' },
    ]},
  ]},
]

const avatarCode = `'use client'

import { useCurrentUserImage } from '@/hooks/use-current-user-image'
import { useCurrentUserName } from '@/hooks/use-current-user-name'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const CurrentUserAvatar = () => {
  const profileImage = useCurrentUserImage()
  const name = useCurrentUserName()
  const initials = name
    ?.split(' ')
    ?.map((word) => word[0])
    ?.join('')
    ?.toUpperCase()

  return (
    <Avatar>
      {profileImage && <AvatarImage src={profileImage} alt={initials} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}`

const usageCode = `'use client'

import { CurrentUserAvatar } from '@/components/current-user-avatar'

const CurrentUserAvatarDemo = () => {
  return (
    <Header className="flex items-center justify-between">
      <h1>Lumon Industries</h1>
      <CurrentUserAvatar />
    </Header>
  )
}

export default CurrentUserAvatarDemo`

export function CurrentUserAvatarDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Current User Avatar</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Current User Avatar</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                Supabase Auth-aware avatar
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

            <FileTreeSection fileTree={fileTree} note={<>This block includes the <a href="/client" className="underline decoration-1 underline-offset-4 hover:decoration-primary">Supabase client</a>. If you already have one installed, you can skip overwriting it.</>} />

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {avatarCode.split('\n').map((line, i) => (
                    <div key={i}>
                      <span className="select-none text-muted-foreground/40 mr-4 inline-block w-8 text-right">{i + 1}</span>
                      <span>{line || ' '}</span>
                    </div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="introduction">
              <SectionLink id="introduction" /> Introduction
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">CurrentUserAvatar</code> component connects to Supabase Auth to fetch the user data and show an avatar. It uses the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">user_metadata</code> property which gets populated automatically by Supabase Auth if the user logged in via a provider. If the user doesn't have a profile image, it renders their initials. If the user is logged out, it renders a <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">?</code> as a fallback, which you can change.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">CurrentUserAvatar</code> component is designed to be used anywhere in your app. Add the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<CurrentUserAvatar />'}</code> component to your page and it will render the avatar of the current user, with a fallback.
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

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="props">
              <SectionLink id="props" /> Props
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              This component doesn't accept any props. If you wish to change the fallback, you can do so by changing the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">CurrentUserAvatar</code> component directly.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2" href="https://supabase.com/docs/guides/auth/users">
                  Auth users
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

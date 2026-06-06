'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider, useRouter } from '../lib/supabase-router'
import { SupabaseLayout } from '../components/supabase/supabase-layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
import { HomePage } from './home-page'
import { IntroductionDocPage } from './introduction-doc-page'
import { QuickStartDocPage } from './quickstart-doc-page'
import { FaqDocPage } from './faq-doc-page'
import { ClientDocPage } from './client-doc-page'
import { PasswordBasedAuthDocPage } from './password-based-auth-doc-page'
import { SocialAuthDocPage } from './social-auth-doc-page'
import { DropzoneDocPage } from './dropzone-doc-page'
import { RealtimeCursorDocPage } from './realtime-cursor-doc-page'
import { RealtimeMonacoDocPage } from './realtime-monaco-doc-page'
import { RealtimeFlowDocPage } from './realtime-flow-doc-page'
import { CurrentUserAvatarDocPage } from './current-user-avatar-doc-page'
import { RealtimeAvatarStackDocPage } from './realtime-avatar-stack-doc-page'
import { RealtimeChatDocPage } from './realtime-chat-doc-page'
import { InfiniteQueryDocPage } from './infinite-query-doc-page'
import { SkillsDocPage } from './skills-doc-page'
import { PlatformKitDocPage } from './platform-kit-doc-page'

function ErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-lg font-semibold text-foreground">Algo deu errado</h2>
        <p className="text-sm text-muted-foreground">{error instanceof Error ? error.message : 'Erro inesperado'}</p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}

function PageRouter() {
  const { currentPath } = useRouter()

  switch (currentPath) {
    case '/quickstart':
      return <QuickStartDocPage />
    case '/faq':
      return <FaqDocPage />
    case '/client':
      return <ClientDocPage />
    case '/password-based-auth':
      return <PasswordBasedAuthDocPage />
    case '/social-auth':
      return <SocialAuthDocPage />
    case '/dropzone':
      return <DropzoneDocPage />
    case '/realtime-cursor':
      return <RealtimeCursorDocPage />
    case '/realtime-monaco':
      return <RealtimeMonacoDocPage />
    case '/realtime-flow':
      return <RealtimeFlowDocPage />
    case '/current-user-avatar':
      return <CurrentUserAvatarDocPage />
    case '/realtime-avatar-stack':
      return <RealtimeAvatarStackDocPage />
    case '/realtime-chat':
      return <RealtimeChatDocPage />
    case '/infinite-query':
      return <InfiniteQueryDocPage />
    case '/skills':
      return <SkillsDocPage />
    case '/platform-kit':
      return <PlatformKitDocPage />
    default:
      return <IntroductionDocPage />
  }
}

export function IntroductionPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          <SupabaseLayout>
            <PageRouter />
          </SupabaseLayout>
        </ErrorBoundary>
      </RouterProvider>
    </QueryClientProvider>
  )
}

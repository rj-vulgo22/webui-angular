'use client'

import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { initSentry } from '../lib/sentry'
import { setupErrorConsole } from '../lib/error-console'
import { RouterProvider, useRouter } from '../lib/supabase-router'
import { SupabaseLayout } from '../components/supabase/supabase-layout'

initSentry()
setupErrorConsole()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

const QuickStartDocPage = lazy(() => import('./quickstart-doc-page').then(m => ({ default: m.QuickStartDocPage })))
const FaqDocPage = lazy(() => import('./faq-doc-page').then(m => ({ default: m.FaqDocPage })))
const ClientDocPage = lazy(() => import('./client-doc-page').then(m => ({ default: m.ClientDocPage })))
const PasswordBasedAuthDocPage = lazy(() => import('./password-based-auth-doc-page').then(m => ({ default: m.PasswordBasedAuthDocPage })))
const SocialAuthDocPage = lazy(() => import('./social-auth-doc-page').then(m => ({ default: m.SocialAuthDocPage })))
const DropzoneDocPage = lazy(() => import('./dropzone-doc-page').then(m => ({ default: m.DropzoneDocPage })))
const RealtimeCursorDocPage = lazy(() => import('./realtime-cursor-doc-page').then(m => ({ default: m.RealtimeCursorDocPage })))
const RealtimeMonacoDocPage = lazy(() => import('./realtime-monaco-doc-page').then(m => ({ default: m.RealtimeMonacoDocPage })))
const RealtimeFlowDocPage = lazy(() => import('./realtime-flow-doc-page').then(m => ({ default: m.RealtimeFlowDocPage })))
const CurrentUserAvatarDocPage = lazy(() => import('./current-user-avatar-doc-page').then(m => ({ default: m.CurrentUserAvatarDocPage })))
const RealtimeAvatarStackDocPage = lazy(() => import('./realtime-avatar-stack-doc-page').then(m => ({ default: m.RealtimeAvatarStackDocPage })))
const RealtimeChatDocPage = lazy(() => import('./realtime-chat-doc-page').then(m => ({ default: m.RealtimeChatDocPage })))
const InfiniteQueryDocPage = lazy(() => import('./infinite-query-doc-page').then(m => ({ default: m.InfiniteQueryDocPage })))
const SkillsDocPage = lazy(() => import('./skills-doc-page').then(m => ({ default: m.SkillsDocPage })))
const PlatformKitDocPage = lazy(() => import('./platform-kit-doc-page').then(m => ({ default: m.PlatformKitDocPage })))
const IntroductionDocPage = lazy(() => import('./introduction-doc-page').then(m => ({ default: m.IntroductionDocPage })))

function PageFallback() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="shimmering-loader h-4 w-48 rounded" />
        </div>
      </div>
    </main>
  )
}

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

  return (
    <Suspense fallback={<PageFallback />}>
      {(() => {
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
      })()}
    </Suspense>
  )
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

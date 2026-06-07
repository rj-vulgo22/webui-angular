'use client'

import { useState } from 'react'
import { SectionLink, PackageManagerTabs, FileTreeSection, CopyButton, type TreeNode } from '../components/supabase/doc-page-components'

const sections = [
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Folder structure' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'adding-types', title: 'Adding types' },
  { id: 'props', title: 'Props' },
  { id: 'return-type', title: 'Return type' },
  { id: 'type-safety', title: 'Type safety' },
  { id: 'usage', title: 'Usage' },
  { id: 'reusable-components', title: 'Reusable components' },
  { id: 'further-reading', title: 'Further reading' },
]

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json',
  pnpm: 'pnpm dlx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json',
  yarn: 'yarn dlx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json',
  bun: 'bunx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json',
}

const fileTree: TreeNode[] = [
  { name: 'hooks', type: 'folder', open: true, children: [
    { name: 'use-infinite-query.ts', type: 'file' },
  ]},
]

const infiniteQueryCode = `'use client'

import { PostgrestQueryBuilder, type PostgrestClientOptions } from '@supabase/postgrest-js'
import { type SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'

import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// The following types are used to make the hook type-safe. It extracts the database type from the supabase client.
type SupabaseClientType = typeof supabase

// Utility type to check if the type is any
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N

// Extracts the database type from the supabase client. If the supabase client doesn't have a type, it will fallback properly.
type Database =
  SupabaseClientType extends SupabaseClient<infer U>
    ? IfAny<
        U,
        {
          public: {
            Tables: Record<string, any>
            Views: Record<string, any>
            Functions: Record<string, any>
          }
        },
        U
      >
    : {
        public: {
          Tables: Record<string, any>
          Views: Record<string, any>
          Functions: Record<string, any>
        }
      }

// Change this to the database schema you want to use
type DatabaseSchema = Database['public']

// Extracts the table names from the database type
type SupabaseTableName = keyof DatabaseSchema['Tables']

// Extracts the table definition from the database type
type SupabaseTableData<T extends SupabaseTableName> = DatabaseSchema['Tables'][T]['Row']

// Default client options for PostgrestQueryBuilder
type DefaultClientOptions = PostgrestClientOptions

type SupabaseSelectBuilder<T extends SupabaseTableName> = ReturnType<
  PostgrestQueryBuilder<
    DefaultClientOptions,
    DatabaseSchema,
    DatabaseSchema['Tables'][T],
    T
  >['select']
>

// A function that modifies the query. Can be used to sort, filter, etc. If .range is used, it will be overwritten.
type SupabaseQueryHandler<T extends SupabaseTableName> = (
  query: SupabaseSelectBuilder<T>
) => SupabaseSelectBuilder<T>

interface UseInfiniteQueryProps<T extends SupabaseTableName, Query extends string = '*'> {
  // The table name to query
  tableName: T
  // The columns to select, defaults to \`*\`
  columns?: string
  // The number of items to fetch per page, defaults to \`20\`
  pageSize?: number
  // A function that modifies the query. Can be used to sort, filter, etc. If .range is used, it will be overwritten.
  trailingQuery?: SupabaseQueryHandler<T>
  // Optional key that identifies the current trailing query shape (e.g. filters/sort/search).
  // When this changes, the internal store is recreated so stale paginated rows are discarded.
  trailingQueryKey?: unknown
}

interface StoreState<TData> {
  data: TData[]
  count: number
  isSuccess: boolean
  isLoading: boolean
  isFetching: boolean
  error: Error | null
  hasInitialFetch: boolean
}

type Listener = () => void

interface StoreProps<T extends SupabaseTableName> {
  tableName: T
  columns?: string
  pageSize?: number
  getTrailingQuery: () => SupabaseQueryHandler<T> | undefined
}

function createStore<TData extends SupabaseTableData<T>, T extends SupabaseTableName>(
  props: StoreProps<T>
) {
  const { tableName, columns = '*', pageSize = 20, getTrailingQuery } = props

  let state: StoreState<TData> = {
    data: [],
    count: 0,
    isSuccess: false,
    isLoading: false,
    isFetching: false,
    error: null,
    hasInitialFetch: false,
  }

  const listeners = new Set<Listener>()

  const notify = () => {
    listeners.forEach((listener) => listener())
  }

  const setState = (newState: Partial<StoreState<TData>>) => {
    state = { ...state, ...newState }
    notify()
  }

  const fetchPage = async (skip: number) => {
    if (state.hasInitialFetch && (state.isFetching || state.count <= state.data.length)) return

    setState({ isFetching: true })

    let query = supabase
      .from(tableName)
      .select(columns, { count: 'exact' }) as unknown as SupabaseSelectBuilder<T>

    const trailingQuery = getTrailingQuery()
    if (trailingQuery) {
      query = trailingQuery(query)
    }
    const { data: newData, count, error } = await query.range(skip, skip + pageSize - 1)

    if (error) {
      console.error('An unexpected error occurred:', error)
      setState({ error })
    } else {
      setState({
        data: [...state.data, ...(newData as TData[])],
        count: count || 0,
        isSuccess: true,
        error: null,
      })
    }
    setState({ isFetching: false })
  }

  const fetchNextPage = async () => {
    if (state.isFetching) return
    await fetchPage(state.data.length)
  }

  const initialize = async () => {
    setState({ isLoading: true, isSuccess: false, data: [] })
    await fetchNextPage()
    setState({ isLoading: false, hasInitialFetch: true })
  }

  return {
    getState: () => state,
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    fetchNextPage,
    initialize,
  }
}

// Empty initial state to avoid hydration errors.
const initialState: any = {
  data: [],
  count: 0,
  isSuccess: false,
  isLoading: false,
  isFetching: false,
  error: null,
  hasInitialFetch: false,
}

function useInfiniteQuery<
  TData extends SupabaseTableData<T>,
  T extends SupabaseTableName = SupabaseTableName,
>(props: UseInfiniteQueryProps<T>) {
  const tableName = props.tableName
  const columns = props.columns ?? '*'
  const pageSize = props.pageSize ?? 20
  const trailingQuery = props.trailingQuery
  const trailingQueryKey = props.trailingQueryKey
  const trailingQueryRef = useRef(trailingQuery)

  trailingQueryRef.current = trailingQuery

  const store = useMemo(
    () =>
      createStore<TData, T>({
        tableName,
        columns,
        pageSize,
        getTrailingQuery: () => trailingQueryRef.current,
      }),
    [tableName, columns, pageSize, trailingQueryKey]
  )

  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState(),
    () => initialState as StoreState<TData>
  )

  useEffect(() => {
    if (!state.hasInitialFetch && typeof window !== 'undefined') {
      store.initialize()
    }
  }, [state.hasInitialFetch, store])

  return {
    data: state.data,
    count: state.count,
    isSuccess: state.isSuccess,
    isLoading: state.isLoading,
    isFetching: state.isFetching,
    error: state.error,
    hasMore: state.count > state.data.length,
    fetchNextPage: store.fetchNextPage,
  }
}

export {
  useInfiniteQuery,
  type SupabaseQueryHandler,
  type SupabaseTableData,
  type SupabaseTableName,
  type UseInfiniteQueryProps,
}`

const withSortingCode = `const { data, fetchNextPage } = useInfiniteQuery({
  tableName: 'products',
  columns: '*',
  pageSize: 10,
  trailingQuery: (query) => query.order('created_at', { ascending: false }),
})

return (
  <div>
    {data.map((item) => (
      <ProductCard key={item.id} product={item} />
    ))}
    <Button onClick={fetchNextPage}>Load more products</Button>
  </div>
)`

const withFilteringCode = `const params = useSearchParams()
const searchQuery = params.get('q')

const { data, isLoading, isFetching, fetchNextPage, count, isSuccess } = useInfiniteQuery({
  tableName: 'products',
  columns: '*',
  pageSize: 10,
  trailingQuery: (query) => {
    if (searchQuery && searchQuery.length > 0) {
      query = query.ilike('name', \`%\${searchQuery}%\`)
    }
    return query
  },
})

return (
  <div>
    {data.map((item) => (
      <ProductCard key={item.id} product={item} />
    ))}
    <Button onClick={fetchNextPage}>Load more products</Button>
  </div>
)`

const infiniteListCode = `'use client'

import * as React from 'react'

import {
  SupabaseQueryHandler,
  SupabaseTableData,
  SupabaseTableName,
  useInfiniteQuery,
} from '@/hooks/use-infinite-query'
import { cn } from '@/lib/utils'

interface InfiniteListProps<TableName extends SupabaseTableName> {
  tableName: TableName
  columns?: string
  pageSize?: number
  trailingQuery?: SupabaseQueryHandler<TableName>
  renderItem: (item: SupabaseTableData<TableName>, index: number) => React.ReactNode
  className?: string
  renderNoResults?: () => React.ReactNode
  renderEndMessage?: () => React.ReactNode
  renderSkeleton?: (count: number) => React.ReactNode
}

const DefaultNoResults = () => (
  <div className="text-center text-muted-foreground py-10">No results.</div>
)

const DefaultEndMessage = () => (
  <div className="text-center text-muted-foreground py-4 text-sm">You&apos;ve reached the end.</div>
)

const defaultSkeleton = (count: number) => (
  <div className="flex flex-col gap-2 px-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="h-4 w-full bg-muted animate-pulse" />
    ))}
  </div>
)

export function InfiniteList<TableName extends SupabaseTableName>({
  tableName,
  columns = '*',
  pageSize = 20,
  trailingQuery,
  renderItem,
  className,
  renderNoResults = DefaultNoResults,
  renderEndMessage = DefaultEndMessage,
  renderSkeleton = defaultSkeleton,
}: InfiniteListProps<TableName>) {
  const { data, isFetching, hasMore, fetchNextPage, isSuccess } = useInfiniteQuery({
    tableName,
    columns,
    pageSize,
    trailingQuery,
  })

  // Ref for the scrolling container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Intersection observer logic - target the last rendered *item* or a dedicated sentinel
  const loadMoreSentinelRef = React.useRef<HTMLDivElement>(null)
  const observer = React.useRef<IntersectionObserver | null>(null)

  React.useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchNextPage()
        }
      },
      {
        root: scrollContainerRef.current, // Use the scroll container for scroll detection
        threshold: 0.1, // Trigger when 10% of the target is visible
        rootMargin: '0px 0px 100px 0px', // Trigger loading a bit before reaching the end
      }
    )

    if (loadMoreSentinelRef.current) {
      observer.current.observe(loadMoreSentinelRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [isFetching, hasMore, fetchNextPage])

  return (
    <div ref={scrollContainerRef} className={cn('relative h-full overflow-auto', className)}>
      <div>
        {isSuccess && data.length === 0 && renderNoResults()}

        {data.map((item, index) => renderItem(item, index))}

        {isFetching && renderSkeleton && renderSkeleton(pageSize)}

        <div ref={loadMoreSentinelRef} style={{ height: '1px' }} />

        {!hasMore && data.length > 0 && renderEndMessage()}
      </div>
    </div>
  )
}`

const demoCode = `'use client'

import { InfiniteList } from './infinite-component'
import { Checkbox } from '@/components/ui/checkbox'
import { SupabaseQueryHandler } from '@/hooks/use-infinite-query'
import { Database } from '@/lib/supabase.types'

type TodoTask = Database['public']['Tables']['todos']['Row']

// Define how each item should be rendered
const renderTodoItem = (todo: TodoTask) => {
  return (
    <div
      key={todo.id}
      className="border-b py-3 px-4 hover:bg-muted flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Checkbox defaultChecked={todo.is_complete ?? false} />
        <div>
          <span className="font-medium text-sm text-foreground">{todo.task}</span>
          <div className="text-sm text-muted-foreground">
            {new Date(todo.inserted_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

const orderByInsertedAt: SupabaseQueryHandler<'todos'> = (query) => {
  return query.order('inserted_at', { ascending: false })
}

export const InfiniteListDemo = () => {
  return (
    <div className="bg-background h-[600px]">
      <InfiniteList
        tableName="todos"
        renderItem={renderTodoItem}
        pageSize={3}
        trailingQuery={orderByInsertedAt}
      />
    </div>
  )
}`

export function InfiniteQueryDocPage() {
  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <div className="text-muted-foreground">Infinite Query Hook</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-2xl lg:text-4xl tracking-tight">Infinite Query Hook</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                React hook for infinite lists, fetching data from Supabase.
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

            <FileTreeSection fileTree={fileTree} />

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {infiniteQueryCode.split('\n').map((line, i) => (
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
              The Infinite Query Hook provides a single React hook which will make it easier to load data progressively from your Supabase database. It handles data fetching and pagination state, It is meant to be used with infinite lists or tables. The hook is fully typed, provided you have generated and setup your database types.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="adding-types">
              <SectionLink id="adding-types" /> Adding types
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Before using this hook, we <strong>highly</strong> recommend you setup database types in your project. This will make the hook fully-typesafe. More info about generating Typescript types from database schema{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/api/rest/generating-types">
                here
              </a>.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="props">
              <SectionLink id="props" /> Props
            </h2>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Prop</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Type</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">tableName</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><strong>Required.</strong> The name of the Supabase table to fetch data from.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">columns</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">string</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Columns to select from the table. Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ "'*'" }</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">pageSize</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">number</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Number of items to fetch per page. Defaults to <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">20</code>.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">trailingQuery</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '(query: SupabaseSelectBuilder) => SupabaseSelectBuilder' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Function to apply filters or sorting to the Supabase query.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="return-type">
              <SectionLink id="return-type" /> Return type
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              data, count, isSuccess, isLoading, isFetching, error, hasMore, fetchNextPage
            </p>

            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Prop</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Type</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">data</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">TableData[]</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">An array of fetched items.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">count</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">number</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Number of total items in the database. It takes <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">trailingQuery</code> into consideration.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">isSuccess</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">It's true if the last API call succeeded.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">isLoading</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">It's true only for the initial fetch.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">isFetching</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">It's true for the initial and all incremental fetches.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">error</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">any</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">The error from the last fetch.</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">hasMore</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">boolean</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Whether the query has finished fetching all items from the database</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">fetchNextPage</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"><code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{ '() => void' }</code></td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Sends a new request for the next items</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="type-safety">
              <SectionLink id="type-safety" /> Type safety
            </h2>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The hook will use the typed defined on your Supabase client if they're setup ({' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/reference/javascript/typescript-support">
                more info
              </a>).
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The hook also supports an custom defined result type by using <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">useInfiniteQuery&lt;T&gt;</code>. For example, if you have a custom type for <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">Product</code>, you can use it like this <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">useInfiniteQuery&lt;Product&gt;</code>.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="usage">
              <SectionLink id="usage" /> Usage
            </h2>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="with-sorting">
              <SectionLink id="with-sorting" /> With sorting
            </h3>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {withSortingCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="with-filtering-on-search-params">
              <SectionLink id="with-filtering-on-search-params" /> With filtering on search params
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              This example will filter based on a search param like <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">example.com/?q=hello</code>.
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {withFilteringCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="reusable-components">
              <SectionLink id="reusable-components" /> Reusable components
            </h2>

            <h3 className="font-heading mt-8 scroll-m-20 text-xl tracking-tight" id="infinite-list-fetches-as-you-scroll">
              <SectionLink id="infinite-list-fetches-as-you-scroll" /> Infinite list (fetches as you scroll)
            </h3>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The following component abstracts the hook into a component. It includes few utility components for no results and end of the list.
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {infiniteListCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Use the <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">InfiniteList</code> component with the{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/dashboard/project/_/sql/quickstarts">
                Todo List
              </a>{' '}
              quickstart.
            </p>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              Add <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{'<InfiniteListDemo />'}</code> to a page to see it in action. Ensure the{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://ui.shadcn.com/docs/components/checkbox">
                Checkbox
              </a>{' '}
              component from shadcn/ui is installed, and{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/api/rest/generating-types">
                regenerate/download
              </a>{' '}
              types after running the quickstart.
            </p>

            <div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative">
              <pre className="px-4">
                <code>
                  {demoCode.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </code>
              </pre>
              <CopyButton />
            </div>

            <p className="leading-7 not-first:mt-6 text-foreground/70">
              The Todo List table has Row Level Security (RLS) enabled by default. Feel free disable it temporarily while testing. With RLS enabled, you will get an{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/troubleshooting/why-is-my-select-returning-an-empty-data-array-and-i-have-data-in-the-table-xvOPgx">
                empty array
              </a>{' '}
              of results by default.{' '}
              <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/guides/database/postgres/row-level-security">
                Read more
              </a>{' '}
              about RLS.
            </p>

            <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0" id="further-reading">
              <SectionLink id="further-reading" /> Further reading
            </h2>

            <ul className="my-6 ml-6 list-disc text-foreground/70">
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/reference/javascript/typescript-support">
                  Generating Typescript types from the database
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/reference/javascript/select">
                  Supabase Database API
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://supabase.com/docs/reference/javascript/select#pagination">
                  Supabase Pagination
                </a>
              </li>
              <li className="mt-2">
                <a className="text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-[#3ECF8E] hover:decoration-2" href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">
                  Intersection Observer API
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

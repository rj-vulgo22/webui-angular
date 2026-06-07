import {w,b as b$1,k,m as m$1}from'./chunk-ClJ_kcWH.js';import {Y,C}from'./main-4IPYUJEE.js';var e=Y(C(),1);var d=[{id:"installation",title:"Installation"},{id:"folder-structure",title:"Folder structure"},{id:"introduction",title:"Introduction"},{id:"adding-types",title:"Adding types"},{id:"props",title:"Props"},{id:"return-type",title:"Return type"},{id:"type-safety",title:"Type safety"},{id:"usage",title:"Usage"},{id:"reusable-components",title:"Reusable components"},{id:"further-reading",title:"Further reading"}],c={npm:"npx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json",pnpm:"pnpm dlx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json",yarn:"yarn dlx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json",bun:"bunx shadcn@latest add https://supabase.com/ui/r/infinite-query-hook.json"},m=[{name:"hooks",type:"folder",open:true,children:[{name:"use-infinite-query.ts",type:"file"}]}],u=`'use client'

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
}`,h=`const { data, fetchNextPage } = useInfiniteQuery({
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
)`,p=`const params = useSearchParams()
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
)`,g=`'use client'

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
}`,f=`'use client'

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
}`;function b(){return (0, e.jsxs)("main",{className:"relative lg:gap-10 xl:grid xl:grid-cols-[1fr_200px] px-8 md:px-16 py-20",children:[(0, e.jsxs)("div",{className:"mx-auto w-full min-w-0 max-w-4xl",children:[(0, e.jsxs)("div",{className:"mb-4 flex items-center space-x-1 text-sm text-muted-foreground",children:[(0, e.jsx)("div",{className:"overflow-hidden text-ellipsis whitespace-nowrap",children:"Docs"}),(0, e.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"h-4 w-4 text-muted-foreground",children:(0, e.jsx)("path",{d:"m9 18 6-6-6-6"})}),(0, e.jsx)("div",{className:"text-muted-foreground",children:"Infinite Query Hook"})]}),(0, e.jsx)("div",{className:"flex flex-col lg:flex-row lg:items-end justify-between mb-5",children:(0, e.jsxs)("div",{className:"space-y-2",children:[(0, e.jsx)("h1",{className:"scroll-m-20 text-2xl lg:text-4xl tracking-tight",children:"Infinite Query Hook"}),(0, e.jsx)("p",{className:"text-base lg:text-lg text-muted-foreground",children:(0, e.jsx)("span",{style:{display:"inline-block",verticalAlign:"top",textDecoration:"inherit",textWrap:"balance"},children:"React hook for infinite lists, fetching data from Supabase."})})]})}),(0, e.jsx)("div",{className:"pb-12",children:(0, e.jsxs)("div",{className:"mdx",children:[(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"installation",children:[(0, e.jsx)(w,{id:"installation"})," Installation"]}),(0, e.jsx)(b$1,{installCommands:c}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"folder-structure",children:[(0, e.jsx)(w,{id:"folder-structure"})," Folder structure"]}),(0, e.jsx)(k,{fileTree:m}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:u.split(`
`).map((r,a)=>(0, e.jsxs)("div",{children:[(0, e.jsx)("span",{className:"select-none text-muted-foreground/40 mr-4 inline-block w-8 text-right",children:a+1}),(0, e.jsx)("span",{children:r||" "})]},a))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"introduction",children:[(0, e.jsx)(w,{id:"introduction"})," Introduction"]}),(0, e.jsx)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:"The Infinite Query Hook provides a single React hook which will make it easier to load data progressively from your Supabase database. It handles data fetching and pagination state, It is meant to be used with infinite lists or tables. The hook is fully typed, provided you have generated and setup your database types."}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"adding-types",children:[(0, e.jsx)(w,{id:"adding-types"})," Adding types"]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["Before using this hook, we ",(0, e.jsx)("strong",{children:"highly"})," recommend you setup database types in your project. This will make the hook fully-typesafe. More info about generating Typescript types from database schema"," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/api/rest/generating-types",children:"here"}),"."]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"props",children:[(0, e.jsx)(w,{id:"props"})," Props"]}),(0, e.jsx)("div",{className:"my-6 w-full overflow-y-auto",children:(0, e.jsxs)("table",{className:"w-full",children:[(0, e.jsx)("thead",{children:(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Prop"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Type"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Description"})]})}),(0, e.jsxs)("tbody",{children:[(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"tableName"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"string"})}),(0, e.jsxs)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:[(0, e.jsx)("strong",{children:"Required."})," The name of the Supabase table to fetch data from."]})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"columns"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"string"})}),(0, e.jsxs)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:["Columns to select from the table. Defaults to ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"'*'"}),"."]})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"pageSize"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"number"})}),(0, e.jsxs)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:["Number of items to fetch per page. Defaults to ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"20"}),"."]})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"trailingQuery"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"(query: SupabaseSelectBuilder) => SupabaseSelectBuilder"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"Function to apply filters or sorting to the Supabase query."})]})]})]})}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"return-type",children:[(0, e.jsx)(w,{id:"return-type"})," Return type"]}),(0, e.jsx)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:"data, count, isSuccess, isLoading, isFetching, error, hasMore, fetchNextPage"}),(0, e.jsx)("div",{className:"my-6 w-full overflow-y-auto",children:(0, e.jsxs)("table",{className:"w-full",children:[(0, e.jsx)("thead",{children:(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Prop"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Type"}),(0, e.jsx)("th",{className:"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",children:"Description"})]})}),(0, e.jsxs)("tbody",{children:[(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"data"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"TableData[]"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"An array of fetched items."})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"count"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"number"})}),(0, e.jsxs)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:["Number of total items in the database. It takes ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"trailingQuery"})," into consideration."]})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"isSuccess"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"boolean"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"It's true if the last API call succeeded."})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"isLoading"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"boolean"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"It's true only for the initial fetch."})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"isFetching"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"boolean"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"It's true for the initial and all incremental fetches."})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"error"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"any"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"The error from the last fetch."})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"hasMore"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"boolean"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"Whether the query has finished fetching all items from the database"})]}),(0, e.jsxs)("tr",{className:"m-0 border-t p-0 even:bg-muted",children:[(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"fetchNextPage"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"() => void"})}),(0, e.jsx)("td",{className:"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",children:"Sends a new request for the next items"})]})]})]})}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"type-safety",children:[(0, e.jsx)(w,{id:"type-safety"})," Type safety"]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["The hook will use the typed defined on your Supabase client if they're setup ("," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/reference/javascript/typescript-support",children:"more info"}),")."]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["The hook also supports an custom defined result type by using ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"useInfiniteQuery<T>"}),". For example, if you have a custom type for ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"Product"}),", you can use it like this ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"useInfiniteQuery<Product>"}),"."]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"usage",children:[(0, e.jsx)(w,{id:"usage"})," Usage"]}),(0, e.jsxs)("h3",{className:"font-heading mt-8 scroll-m-20 text-xl tracking-tight",id:"with-sorting",children:[(0, e.jsx)(w,{id:"with-sorting"})," With sorting"]}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:h.split(`
`).map((r,a)=>(0, e.jsx)("div",{children:r},a))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("h3",{className:"font-heading mt-8 scroll-m-20 text-xl tracking-tight",id:"with-filtering-on-search-params",children:[(0, e.jsx)(w,{id:"with-filtering-on-search-params"})," With filtering on search params"]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["This example will filter based on a search param like ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"example.com/?q=hello"}),"."]}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:p.split(`
`).map((r,a)=>(0, e.jsx)("div",{children:r},a))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"reusable-components",children:[(0, e.jsx)(w,{id:"reusable-components"})," Reusable components"]}),(0, e.jsxs)("h3",{className:"font-heading mt-8 scroll-m-20 text-xl tracking-tight",id:"infinite-list-fetches-as-you-scroll",children:[(0, e.jsx)(w,{id:"infinite-list-fetches-as-you-scroll"})," Infinite list (fetches as you scroll)"]}),(0, e.jsx)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:"The following component abstracts the hook into a component. It includes few utility components for no results and end of the list."}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:g.split(`
`).map((r,a)=>(0, e.jsx)("div",{children:r},a))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["Use the ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"InfiniteList"})," component with the"," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/dashboard/project/_/sql/quickstarts",children:"Todo List"})," ","quickstart."]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["Add ",(0, e.jsx)("code",{className:"relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",children:"<InfiniteListDemo />"})," to a page to see it in action. Ensure the"," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://ui.shadcn.com/docs/components/checkbox",children:"Checkbox"})," ","component from shadcn/ui is installed, and"," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/api/rest/generating-types",children:"regenerate/download"})," ","types after running the quickstart."]}),(0, e.jsxs)("div",{className:"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 text-foreground/70 bg-muted/20 relative",children:[(0, e.jsx)("pre",{className:"px-4",children:(0, e.jsx)("code",{children:f.split(`
`).map((r,a)=>(0, e.jsx)("div",{children:r},a))})}),(0, e.jsx)(m$1,{})]}),(0, e.jsxs)("p",{className:"leading-7 not-first:mt-6 text-foreground/70",children:["The Todo List table has Row Level Security (RLS) enabled by default. Feel free disable it temporarily while testing. With RLS enabled, you will get an"," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/troubleshooting/why-is-my-select-returning-an-empty-data-array-and-i-have-data-in-the-table-xvOPgx",children:"empty array"})," ","of results by default."," ",(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/guides/database/postgres/row-level-security",children:"Read more"})," ","about RLS."]}),(0, e.jsxs)("h2",{className:"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl tracking-tight first:mt-0",id:"further-reading",children:[(0, e.jsx)(w,{id:"further-reading"})," Further reading"]}),(0, e.jsxs)("ul",{className:"my-6 ml-6 list-disc text-foreground/70",children:[(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/reference/javascript/typescript-support",children:"Generating Typescript types from the database"})}),(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/reference/javascript/select",children:"Supabase Database API"})}),(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://supabase.com/docs/reference/javascript/select#pagination",children:"Supabase Pagination"})}),(0, e.jsx)("li",{className:"mt-2",children:(0, e.jsx)("a",{className:"text-foreground underline decoration-1 decoration-foreground-muted underline-offset-4 transition-colors hover:decoration-primary hover:decoration-2",href:"https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",children:"Intersection Observer API"})})]})]})})]}),(0, e.jsx)("div",{className:"hidden text-sm xl:block",children:(0, e.jsx)("div",{className:"sticky top-16 -mt-10 pt-4",children:(0, e.jsx)("div",{className:"sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12",children:(0, e.jsxs)("div",{className:"space-y-2",children:[(0, e.jsx)("p",{className:"font-medium text-muted-foreground",children:"On This Page"}),(0, e.jsx)("ul",{className:"m-0 list-none",children:d.map(r=>(0, e.jsx)("li",{className:"mt-0 pt-2",children:(0, e.jsx)("a",{href:"#"+r.id,className:"inline-block no-underline transition-colors hover:text-foreground text-muted-foreground",children:r.title})},r.id))})]})})})})]})}
export{b as InfiniteQueryDocPage};//# sourceMappingURL=chunk--OD2fViw.js.map

'use client'

import { useInfiniteQuery as useTanstackInfiniteQuery } from '@tanstack/react-query'
import { type PostgrestError } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

type SupabaseClientType = typeof supabase
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
type Database =
  SupabaseClientType extends import('@supabase/supabase-js').SupabaseClient<infer U>
    ? IfAny<U, { public: { Tables: Record<string, any>; Views: Record<string, any>; Functions: Record<string, any> } }, U>
    : { public: { Tables: Record<string, any>; Views: Record<string, any>; Functions: Record<string, any> } }

type DatabaseSchema = Database['public']
type SupabaseTableName = keyof DatabaseSchema['Tables']
type SupabaseTableData<T extends SupabaseTableName> = DatabaseSchema['Tables'][T]['Row']

type SupabaseQueryHandler<T extends SupabaseTableName> = (
  query: import('@supabase/postgrest-js').PostgrestQueryBuilder<
    import('@supabase/postgrest-js').PostgrestClientOptions,
    DatabaseSchema,
    DatabaseSchema['Tables'][T],
    T
  >['select']
) => import('@supabase/postgrest-js').PostgrestQueryBuilder<
  import('@supabase/postgrest-js').PostgrestClientOptions,
  DatabaseSchema,
  DatabaseSchema['Tables'][T],
  T
>['select']

interface UseInfiniteQueryProps<T extends SupabaseTableName> {
  tableName: T
  columns?: string
  pageSize?: number
  trailingQuery?: SupabaseQueryHandler<T>
  trailingQueryKey?: unknown
}

function useInfiniteQuery<
  TData extends SupabaseTableData<T>,
  T extends SupabaseTableName = SupabaseTableName,
>(props: UseInfiniteQueryProps<T>) {
  const { tableName, columns = '*', pageSize = 20, trailingQuery, trailingQueryKey } = props

  const query = useTanstackInfiniteQuery({
    queryKey: [tableName, columns, pageSize, trailingQueryKey] as const,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      let builder = supabase
        .from(tableName)
        .select(columns, { count: 'exact' }) as any

      if (trailingQuery) {
        builder = trailingQuery(builder)
      }

      const from = pageParam * pageSize
      const to = from + pageSize - 1
      const { data, count, error } = await builder.range(from, to)

      if (error) throw error

      return { data: data as TData[], count: count ?? 0 }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const totalFetched = _allPages.reduce((sum, p) => sum + p.data.length, 0)
      if (totalFetched >= lastPage.count) return undefined
      return lastPageParam + 1
    },
    enabled: true,
  })

  const allData = query.data?.pages.flatMap((page) => page.data) ?? []
  const totalCount = query.data?.pages[0]?.count ?? 0

  return {
    data: allData,
    count: totalCount,
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error instanceof Error ? query.error : query.error ? new Error(String(query.error)) : null,
    hasMore: query.hasNextPage ?? false,
    fetchNextPage: () => { if (!query.isFetchingNextPage) query.fetchNextPage() },
  }
}

export {
  useInfiniteQuery,
  type SupabaseQueryHandler,
  type SupabaseTableData,
  type SupabaseTableName,
  type UseInfiniteQueryProps,
}

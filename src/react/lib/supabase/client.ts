import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const env = (import.meta as any).env
  const url = typeof env === 'object' && env !== null ? env.VITE_SUPABASE_URL : undefined
  const key = typeof env === 'object' && env !== null ? env.VITE_SUPABASE_PUBLISHABLE_KEY : undefined
  if (!url || !key) {
    throw new Error(
      'Supabase environment variables not configured. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local'
    )
  }
  return createSupabaseClient(url, key)
}

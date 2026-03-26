import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import { createServerClient as _createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  return key;
}

/**
 * Client for Next.js Client Components and browser.
 */
export function createBrowserClient() {
  return _createBrowserClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

/**
 * Client for Next.js Server Components and API Routes.
 * Requires Next.js cookies — use in RSC or Route Handlers.
 */
export function createServerClient(
  cookieStore: Pick<
    { get: (name: string) => { value: string } | undefined },
    "get"
  >
) {
  return _createServerClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        // The caller will pass the real Next.js cookieStore
        return [] as { name: string; value: string }[];
      },
    },
  });
}

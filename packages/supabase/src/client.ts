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
 * Cliente para Next.js Client Components y navegador.
 */
export function createBrowserClient() {
  return _createBrowserClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

/**
 * Cliente para Next.js Server Components y API Routes.
 * Requiere cookies de Next.js — usar en RSC o Route Handlers.
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
        // El caller pasará el cookieStore real de Next.js
        return [] as { name: string; value: string }[];
      },
    },
  });
}

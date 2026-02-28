// src/lib/supabase/server.ts
// Server-side Supabase client for RSC, Route Handlers, Server Actions
// Source: architecture.md §6.3

import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

export async function createServerSupabase() {
    const cookieStore = await cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // setAll can throw when called from RSC
                        // This is expected and can be safely ignored
                    }
                },
            },
        }
    );
}

/**
 * Creates an anonymous Supabase client specifically for use inside Next.js 'use cache' scopes.
 * Does NOT access 'cookies()' so it prevents "Accessing Dynamic data sources inside a cache scope" runtime errors.
 */
export function createAnonSupabase() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

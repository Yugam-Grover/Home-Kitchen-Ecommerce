// src/lib/supabase/client.ts
// Browser-side Supabase client for React Client Components
// Source: architecture.md §6.3

'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createBrowserSupabase() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

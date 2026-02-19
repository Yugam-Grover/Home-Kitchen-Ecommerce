// src/lib/supabase/admin.ts
// Service-role admin client — SERVER-ONLY
// Bypasses RLS for admin operations (erasure, migrations, etc.)
// Source: architecture.md §6.3
// ⚠️ NEVER import this in client components
// ⚠️ NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export function createAdminSupabase() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}

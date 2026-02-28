import { NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/lib/database/queries/categories';

export async function GET() {
    try {
        const slug = 'cookware';
        const supabase = (await import('@/lib/supabase/server')).createAnonSupabase();

        const all = await supabase.from('categories').select('*').limit(5);
        const filtered = await supabase.from('categories').select('*').eq('slug', slug);

        return NextResponse.json({
            slug,
            allCount: all.data?.length,
            allData: all.data,
            allErr: all.error,
            filteredCount: filtered.data?.length,
            filteredData: filtered.data,
            filteredErr: filtered.error
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

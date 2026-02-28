// src/lib/database/queries/categories.ts
// Server-side category queries with Next.js caching
// Source: architecture.md §3, §8.1

import { createAnonSupabase } from '@/lib/supabase/server';

// ----- Types -----

export interface DbSubCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
    product_count?: number;
}

export interface DbCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
    image_url: string | null;
    sub_categories: DbSubCategory[];
}

// ----- Cached Queries -----

/**
 * Fetch all parent categories with their sub-categories.
 * Used by the navbar mega menu. Heavily cached (categories rarely change).
 */
export async function getAllCategoriesWithSubs(): Promise<DbCategory[]> {
    'use cache';
    const supabase = createAnonSupabase();

    // 1. Fetch parent categories
    const { data: parents, error: parentErr } = await supabase
        .from('categories')
        .select('id, name, slug, description, sort_order, image_url')
        .is('parent_id', null)
        .order('sort_order', { ascending: true });

    if (parentErr || !parents) {
        console.error('Failed to fetch parent categories:', parentErr);
        return [];
    }

    // 2. Fetch all sub-categories in one query
    const parentIds = parents.map((p: any) => p.id);
    const { data: subs, error: subErr } = await supabase
        .from('categories')
        .select('id, name, slug, description, sort_order, parent_id')
        .in('parent_id', parentIds)
        .order('sort_order', { ascending: true });

    if (subErr || !subs) {
        console.error('Failed to fetch sub-categories:', subErr);
        return parents.map((p: any) => ({ ...p, sub_categories: [] }));
    }

    // 3. Group sub-categories by parent_id
    const subsByParent = new Map<string, DbSubCategory[]>();
    for (const sub of (subs as any[])) {
        const parentId = sub.parent_id;
        if (!subsByParent.has(parentId)) {
            subsByParent.set(parentId, []);
        }
        subsByParent.get(parentId)!.push({
            id: sub.id,
            name: sub.name,
            slug: sub.slug,
            description: sub.description,
            sort_order: sub.sort_order,
        });
    }

    return parents.map((p: any) => ({
        ...p,
        sub_categories: subsByParent.get(p.id) || [],
    }));
}

/**
 * Fetch a single parent category by slug, with its sub-categories.
 * Used by collection landing pages.
 */
export async function getCategoryBySlug(slug: string): Promise<DbCategory | null> {
    'use cache';

    const supabase = createAnonSupabase();

    const { data: parent, error: parentErr } = await supabase
        .from('categories')
        .select('id, name, slug, description, sort_order, image_url')
        .is('parent_id', null)
        .eq('slug', slug)
        .single();

    if (parentErr || !parent) return null;

    const { data: subs, error: subErr } = await supabase
        .from('categories')
        .select('id, name, slug, description, sort_order')
        .eq('parent_id', (parent as any).id)
        .order('sort_order', { ascending: true });

    if (subErr) {
        console.error('Failed to fetch sub-categories for', slug, subErr);
    }

    return {
        ...parent as any,
        sub_categories: ((subs as any) || []).map((s: any) => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            description: s.description,
            sort_order: s.sort_order,
        })),
    } as any;
}

/**
 * Fetch a single sub-category by slug + parent slug.
 * Returns the sub-category with its parent info for breadcrumbs.
 */
export async function getSubCategoryBySlug(
    parentSlug: string,
    subSlug: string
): Promise<{ subCategory: DbSubCategory; parentCategory: { id: string; name: string; slug: string } } | null> {
    'use cache';

    const supabase = createAnonSupabase();

    // Get parent first
    const { data: parent, error: parentErr } = await supabase
        .from('categories')
        .select('id, name, slug')
        .is('parent_id', null)
        .eq('slug', parentSlug)
        .single();

    if (parentErr || !parent) return null;

    // Get sub-category
    const { data: sub, error: subErr } = await supabase
        .from('categories')
        .select('id, name, slug, description, sort_order')
        .eq('parent_id', (parent as any).id)
        .eq('slug', subSlug)
        .single();

    if (subErr || !sub) return null;

    return {
        subCategory: {
            id: (sub as any).id,
            name: (sub as any).name,
            slug: (sub as any).slug,
            description: (sub as any).description,
            sort_order: (sub as any).sort_order,
        } as DbSubCategory,
        parentCategory: parent as any,
    };
}

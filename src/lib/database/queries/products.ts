// src/lib/database/queries/products.ts
// Server-side product queries with Next.js caching
// Source: architecture.md §3, §8.1

import { createAnonSupabase } from '@/lib/supabase/server';

// ----- Types -----

export interface DbProduct {
    id: string;
    sku: string;
    name: string;
    slug: string;
    short_description: string | null;
    base_price_usd: number;
    compare_at_price_usd: number | null;
    material: string | null;
    material_details: string[] | null;
    rating_avg: number;
    review_count: number;
    usp_badges: string[] | null;
    status: string;
    /** Sub-category name (most specific) */
    sub_category_name: string;
    /** Sub-category slug */
    sub_category_slug: string;
    /** Parent category name — needed for Dynamic Modular Engine layout switching */
    parent_category_name: string;
    /** Parent category slug */
    parent_category_slug: string;
}

export interface ProductQueryOptions {
    sort?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'relevance';
    limit?: number;
    offset?: number;
    search?: string;
}

export interface ProductFacets {
    categories: string[];
    materials: string[];
    priceRange: { min: number; max: number };
}


// ----- Cached Queries -----

/**
 * Fetch products by sub-category ID.
 * Used on collection sub-category pages (depth 2).
 * Includes parent category name via JOIN for Dynamic Modular Engine.
 */
export async function getProductsBySubCategory(
    subCategoryId: string,
    options: ProductQueryOptions = {}
): Promise<{ products: DbProduct[]; total: number }> {
    'use cache';

    const supabase = createAnonSupabase();
    const { sort = 'relevance', limit = 100, offset = 0, search } = options;

    let query = supabase
        .from('products')
        .select(`
            id, sku, name, slug, short_description,
            base_price_usd, compare_at_price_usd,
            material, material_details, rating_avg, review_count,
            usp_badges, status,
            categories!inner (
                id, name, slug,
                parent:categories!parent_id (
                    id, name, slug
                )
            )
        `, { count: 'exact' })
        .eq('category_id', subCategoryId)
        .eq('status', 'active');

    if (search) {
        query = query.ilike('name', `%${search}%`);
    }

    // Sorting
    switch (sort) {
        case 'price-asc':
            query = query.order('base_price_usd', { ascending: true });
            break;
        case 'price-desc':
            query = query.order('base_price_usd', { ascending: false });
            break;
        case 'rating':
            query = query.order('rating_avg', { ascending: false });
            break;
        case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
        default:
            query = query.order('rating_avg', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
        console.error('Failed to fetch products by sub-category:', error);
        return { products: [], total: 0 };
    }

    const products = (data || []).map((row: any) => mapRowToProduct(row));

    return { products, total: count || 0 };
}

/**
 * Fetch products by parent category ID (all sub-categories).
 * Used on collection landing pages (depth 1) for featured products.
 */
export async function getProductsByParentCategory(
    parentCategoryId: string,
    options: ProductQueryOptions = {}
): Promise<{ products: DbProduct[]; total: number }> {
    'use cache';
    const supabase = createAnonSupabase();
    const { sort = 'rating', limit = 100, offset = 0 } = options;

    // Get all sub-category IDs under this parent
    const { data: subs } = await supabase
        .from('categories')
        .select('id')
        .eq('parent_id', parentCategoryId);

    const subIds = (subs || []).map((s: any) => s.id);
    if (subIds.length === 0) return { products: [], total: 0 };

    let query = supabase
        .from('products')
        .select(`
            id, sku, name, slug, short_description,
            base_price_usd, compare_at_price_usd,
            material, material_details, rating_avg, review_count,
            usp_badges, status,
            categories!inner (
                id, name, slug,
                parent:categories!parent_id (
                    id, name, slug
                )
            )
        `, { count: 'exact' })
        .in('category_id', subIds)
        .eq('status', 'active');

    switch (sort) {
        case 'price-asc':
            query = query.order('base_price_usd', { ascending: true });
            break;
        case 'price-desc':
            query = query.order('base_price_usd', { ascending: false });
            break;
        case 'rating':
            query = query.order('rating_avg', { ascending: false });
            break;
        default:
            query = query.order('rating_avg', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
        console.error('Failed to fetch products by parent category:', error);
        return { products: [], total: 0 };
    }

    return {
        products: (data || []).map((row: any) => mapRowToProduct(row)),
        total: count || 0,
    };
}

/**
 * Fetch ALL active products with category join.
 * Used on the main /products PLP page.
 */
export async function getAllProducts(
    options: ProductQueryOptions = {}
): Promise<{ products: DbProduct[]; total: number }> {
    'use cache';
    const supabase = createAnonSupabase();
    const { sort = 'relevance', limit = 200, offset = 0, search } = options;

    let query = supabase
        .from('products')
        .select(`
            id, sku, name, slug, short_description,
            base_price_usd, compare_at_price_usd,
            material, material_details, rating_avg, review_count,
            usp_badges, status,
            categories!inner (
                id, name, slug,
                parent:categories!parent_id (
                    id, name, slug
                )
            )
        `, { count: 'exact' })
        .eq('status', 'active');

    if (search) {
        query = query.ilike('name', `%${search}%`);
    }

    switch (sort) {
        case 'price-asc':
            query = query.order('base_price_usd', { ascending: true });
            break;
        case 'price-desc':
            query = query.order('base_price_usd', { ascending: false });
            break;
        case 'rating':
            query = query.order('rating_avg', { ascending: false });
            break;
        case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
        default:
            query = query.order('created_at', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
        console.error('Failed to fetch all products:', error);
        return { products: [], total: 0 };
    }

    return {
        products: (data || []).map((row: any) => mapRowToProduct(row)),
        total: count || 0,
    };
}

/**
 * Derive filter facets from a set of products (client-side derivation).
 * Called with the full product set to build sidebar checkboxes.
 */
export function deriveFacets(products: DbProduct[]): ProductFacets {
    const categorySet = new Set<string>();
    const materialSet = new Set<string>();
    let min = Infinity;
    let max = -Infinity;

    for (const p of products) {
        categorySet.add(p.sub_category_name);
        if (p.material) materialSet.add(p.material);
        if (p.base_price_usd < min) min = p.base_price_usd;
        if (p.base_price_usd > max) max = p.base_price_usd;
    }

    return {
        categories: Array.from(categorySet).sort(),
        materials: Array.from(materialSet).sort(),
        priceRange: { min: min === Infinity ? 0 : min, max: max === -Infinity ? 500 : max },
    };
}

// ----- Internal Helpers -----

function mapRowToProduct(row: any): DbProduct {
    const cat = row.categories;
    const parent = cat?.parent;

    return {
        id: row.id,
        sku: row.sku,
        name: row.name,
        slug: row.slug,
        short_description: row.short_description,
        base_price_usd: Number(row.base_price_usd),
        compare_at_price_usd: row.compare_at_price_usd ? Number(row.compare_at_price_usd) : null,
        material: row.material,
        material_details: row.material_details,
        rating_avg: Number(row.rating_avg),
        review_count: row.review_count,
        usp_badges: row.usp_badges,
        status: row.status,
        sub_category_name: cat?.name || 'Uncategorized',
        sub_category_slug: cat?.slug || '',
        parent_category_name: parent?.name || 'Uncategorized',
        parent_category_slug: parent?.slug || '',
    };
}

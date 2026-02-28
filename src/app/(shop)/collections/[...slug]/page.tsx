import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug, getSubCategoryBySlug } from '@/lib/database/queries/categories';
import { getProductsBySubCategory, getProductsByParentCategory } from '@/lib/database/queries/products';
import { CollectionRenderer } from '@/components/wellness-ui/collection-renderer';
import { navigationConfig } from '@/config/navigation';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

// Dynamic metadata from DB category
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const [categorySlug, subCategorySlug] = slug;

    if (subCategorySlug) {
        const result = await getSubCategoryBySlug(categorySlug, subCategorySlug);
        if (!result) return { title: 'Collection Not Found' };
        return {
            title: `${result.subCategory.name} — ${result.parentCategory.name} | Nestora`,
            description: `Shop our curated ${result.subCategory.name.toLowerCase()} collection. Organic modernist designs for mindful living.`,
        };
    }

    const category = await getCategoryBySlug(categorySlug);
    if (!category) return { title: 'Collection Not Found' };
    return {
        title: `${category.name} — Nestora`,
        description: `Explore our ${category.name.toLowerCase()} collection. Thoughtfully designed essentials for restorative living.`,
    };
}

export default async function CollectionPage({ params }: PageProps) {
    'use cache';
    const { slug } = await params;

    // Validate depth
    if (!slug || slug.length === 0 || slug.length > 2) {
        notFound();
    }

    const [categorySlug, subCategorySlug] = slug;

    // Depth 2: Sub-category product grid
    if (subCategorySlug) {
        const result = await getSubCategoryBySlug(categorySlug, subCategorySlug);
        if (!result) notFound();

        const { products, total } = await getProductsBySubCategory(result!.subCategory.id);

        // JSON-LD BreadcrumbList 
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}` },
                { '@type': 'ListItem', position: 2, name: result!.parentCategory.name, item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}/collections/${categorySlug}` },
                { '@type': 'ListItem', position: 3, name: result!.subCategory.name, item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}/collections/${categorySlug}/${subCategorySlug}` },
            ],
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <CollectionRenderer
                    mode="sub-category"
                    parentCategory={result!.parentCategory}
                    subCategory={result!.subCategory}
                    products={products}
                    totalProducts={total}
                />
            </>
        );
    }

    // Depth 1: Category landing page
    const category = await getCategoryBySlug(categorySlug);
    if (!category) notFound();

    // Also get navigation config for the featured section
    const navConfig = navigationConfig.find(c => c.slug === categorySlug);

    // Fetch top-rated products from this parent category for preview
    const { products: featuredProducts } = await getProductsByParentCategory(category!.id, { limit: 6, sort: 'rating' });

    // JSON-LD BreadcrumbList
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}` },
            { '@type': 'ListItem', position: 2, name: category!.name, item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}/collections/${categorySlug}` },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CollectionRenderer
                mode="category-landing"
                category={category!}
                featuredProducts={featuredProducts}
                navConfig={navConfig}
            />
        </>
    );
}

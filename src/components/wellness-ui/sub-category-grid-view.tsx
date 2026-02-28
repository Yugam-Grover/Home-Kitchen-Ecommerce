import React from 'react';
import Image, { getImageProps } from 'next/image';
import type { DbSubCategory } from '@/lib/database/queries/categories';
import type { DbProduct } from '@/lib/database/queries/products';
import { Breadcrumbs } from '@/components/wellness-ui/breadcrumbs';
import { PlpClient } from '@/components/wellness-ui/plp-client';
import { PlpSkeleton } from '@/components/wellness-ui/plp-skeleton';

interface SubCategoryGridViewProps {
    parentCategory: { id: string; name: string; slug: string };
    subCategory: DbSubCategory;
    products: DbProduct[];
    totalProducts: number;
}

export function SubCategoryGridView({
    parentCategory,
    subCategory,
    products,
    totalProducts,
}: SubCategoryGridViewProps) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: parentCategory.name, href: `/collections/${parentCategory.slug}` },
        { label: subCategory.name, href: `/collections/${parentCategory.slug}/${subCategory.slug}`, active: true },
    ];

    // Art Direction for Mobile First POI Crop (Rules 3 & 4)
    const heroSrc = '/assets/mock/img4.jpg';
    const commonImageProps = { alt: `${subCategory.name} collection texture`, fill: true, priority: true };
    const {
        props: { srcSet: desktopSrc },
    } = getImageProps({ ...commonImageProps, src: heroSrc });
    const {
        props: { srcSet: mobileSrc, ...restImageProps },
    } = getImageProps({ ...commonImageProps, src: heroSrc });

    return (
        <main className="bg-surface-default min-h-screen pt-24 pb-32 overflow-hidden">
            <div className="container-standard mb-8 relative">

                {/* Vibrant Sub-Category Header */}
                <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-3xl p-10 md:p-16 mb-12 flex flex-col items-center text-center relative overflow-hidden border border-stone-200/50 shadow-sm">
                    {/* Background Texture Overlay (With Art Direction) */}
                    <div className="absolute inset-0 z-0 mix-blend-multiply opacity-20 pointer-events-none">
                        <picture>
                            <source media="(min-width: 768px)" srcSet={desktopSrc} />
                            <source media="(max-width: 767px)" srcSet={mobileSrc} />
                            <img {...restImageProps} className="object-cover w-full h-full" />
                        </picture>
                        <div className="absolute inset-0 bg-stone-100/30 backdrop-blur-sm" />
                    </div>

                    {/* Vibrant Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-200/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 w-full flex justify-center mb-6">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    <h1 className="text-display-lg text-stone-900 mb-4 relative z-10 font-serif tracking-tight">
                        {subCategory.name}
                    </h1>
                    <p className="text-body-md text-stone-500 relative z-10 font-medium">
                        {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
                    </p>
                    <p className="text-body-lg text-stone-600 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed mt-3">
                        {subCategory.description ?? `Curated selections from our ${parentCategory.name.toLowerCase()} collection. Designed for mindful living.`}
                    </p>
                </div>

                {/* React Suspense Boundary for Client Products Grid */}
                <React.Suspense fallback={<PlpSkeleton />}>
                    <PlpClient
                        products={products}
                        parentCategoryName={parentCategory.name}
                        parentCategorySlug={parentCategory.slug}
                    />
                </React.Suspense>
            </div>
        </main>
    );
}

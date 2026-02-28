import * as React from 'react';
import Image, { getImageProps } from 'next/image';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/wellness-ui/breadcrumbs';
import { PlpClient } from '@/components/wellness-ui/plp-client';
import { PlpSkeleton } from '@/components/wellness-ui/plp-skeleton';
import { getAllProducts } from '@/lib/database/queries/products';

export const metadata: Metadata = {
    title: 'Shop All Products — Nestora',
    description: 'Explore our curated collection of organic modernist home and kitchen essentials. Self-sanitizing surfaces & modular multi-taskers.',
};

export default async function ProductsPage() {
    'use cache';

    // Server-side fetch of all active products with category joins
    const { products, total } = await getAllProducts();

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/products', active: true },
    ];

    // Art Direction for Mobile First POI Crop (Rule 3 & 4)
    const commonImageProps = { alt: 'Curated home collection texture', fill: true, priority: true };
    const {
        props: { srcSet: desktopSrc },
    } = getImageProps({
        ...commonImageProps,
        src: '/assets/mock/img4.jpg',
    });
    const {
        props: { srcSet: mobileSrc, ...restImageProps },
    } = getImageProps({
        ...commonImageProps,
        src: '/assets/mock/img4.jpg',
    });

    // JSON-LD BreadcrumbList
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}` },
            { '@type': 'ListItem', position: 2, name: 'Shop All', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://nestora.com'}/products` },
        ],
    };

    return (
        <main className="bg-surface-default min-h-screen pt-24 pb-32 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container-standard mb-8 relative">
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/3" />
                    <div className="absolute bottom-0 right-1/2 w-72 h-72 bg-orange-200/20 rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 w-full flex justify-center mb-6">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    <h1 className="text-display-lg text-stone-900 mb-4 relative z-10 font-serif tracking-tight">Shop All Collections</h1>
                    <p className="text-body-md text-stone-500 relative z-10 font-medium">{total} products</p>
                    <p className="text-body-lg text-stone-700 max-w-2xl relative z-10 leading-relaxed font-sans mt-3">
                        Discover thoughtfully engineered objects for everyday living. Elevate your space with pieces that combine functional excellence with organic warmth.
                    </p>
                </div>
            </div>

            <div className="container-standard">
                <React.Suspense fallback={<PlpSkeleton />}>
                    <PlpClient products={products} />
                </React.Suspense>
            </div>
        </main>
    );
}

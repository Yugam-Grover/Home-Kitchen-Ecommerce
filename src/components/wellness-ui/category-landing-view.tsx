import React from 'react';
import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { DbCategory } from '@/lib/database/queries/categories';
import type { DbProduct } from '@/lib/database/queries/products';
import { getMockImageSrc } from '@/lib/utils/mock-images';
import type { NavigationCategory } from '@/config/navigation';
import { Breadcrumbs } from '@/components/wellness-ui/breadcrumbs';
import { ProductCard } from '@/components/wellness-ui/product-card';

interface CategoryLandingViewProps {
    category: DbCategory;
    featuredProducts: DbProduct[];
    navConfig?: NavigationCategory;
}

export function CategoryLandingView({ category, featuredProducts, navConfig }: CategoryLandingViewProps) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: category.name, href: `/collections/${category.slug}`, active: true },
    ];

    // Use navigation config image if available, fallback to mock
    const heroSrc = navConfig?.featuredImage.src || '/assets/mock/img1.jpg';

    // Art Direction for Mobile First POI Crop (Rules 3 & 4)
    const commonImageProps = { alt: `${category.name} collection lifestyle`, fill: true, priority: true };
    const {
        props: { srcSet: desktopSrc },
    } = getImageProps({ ...commonImageProps, src: heroSrc });
    const {
        props: { srcSet: mobileSrc, ...restImageProps },
    } = getImageProps({ ...commonImageProps, src: heroSrc });

    return (
        <main className="bg-surface-default min-h-screen pt-24 pb-32">

            {/* 1. Hero Landing Block */}
            <section className="container-standard mb-24 relative">
                <div className="relative w-full h-[60vh] min-h-[500px] rounded-3xl overflow-hidden shadow-sm group">
                    <picture>
                        <source media="(min-width: 768px)" srcSet={desktopSrc} />
                        <source media="(max-width: 767px)" srcSet={mobileSrc} />
                        <img {...restImageProps} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                    </picture>
                    <div className="absolute inset-0 bg-stone-900/30" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                        <div className="mb-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                            <Breadcrumbs items={breadcrumbItems} className="text-white/80 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/60" />
                        </div>
                        <h1 className="text-display-xl text-white mb-6 font-serif tracking-tight drop-shadow-md">
                            {category.name}
                        </h1>
                        <p className="text-body-lg text-white/90 max-w-2xl font-medium drop-shadow-sm">
                            {category.description ?? 'Discover objects designed to reduce visual noise and bring a sense of calm to your daily rituals.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Sub-Category Grid Routing */}
            <section className="container-standard mb-32">
                <div className="flex flex-col items-center mb-16">
                    <div className="w-[1px] h-12 bg-sage-400 mb-8"></div>
                    <h2 className="text-display-sm font-serif text-stone-900 tracking-tight font-bold">Explore the Collection</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.sub_categories.map((sub) => (
                        <Link
                            key={sub.id}
                            href={`/collections/${category.slug}/${sub.slug}`}
                            className="bg-white rounded-2xl p-10 border border-stone-100 shadow-md flex flex-col h-full hover:shadow-xl transition-shadow duration-300 group"
                        >
                            <h3 className="text-heading-sm font-bold text-stone-900 mb-3">{sub.name}</h3>
                            <p className="text-body-md text-stone-500 mb-8 font-medium">
                                {sub.description ?? `Shop our curated ${sub.name.toLowerCase()} selection.`}
                            </p>
                            <span className="inline-flex items-center text-body-sm font-bold text-sage-600 group-hover:text-sage-800 transition-colors uppercase tracking-widest mt-auto border-t border-stone-100 pt-6">
                                Shop {sub.name}
                                <ChevronRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. Featured Products Preview */}
            {featuredProducts.length > 0 && (
                <section className="container-standard mb-24">
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-display-sm font-serif text-stone-900 tracking-tight font-bold">Top Rated in {category.name}</h2>
                        <p className="text-body-md text-stone-500 mt-3 max-w-xl text-center">Our most celebrated pieces across this collection.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {featuredProducts.slice(0, 6).map((product, idx) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                slug={product.slug}
                                name={product.name}
                                category={product.sub_category_name}
                                price={product.base_price_usd}
                                originalPrice={product.compare_at_price_usd ?? undefined}
                                rating={product.rating_avg}
                                reviewCount={product.review_count}
                                imageSrc={getMockImageSrc(idx)}
                                imageAlt={product.name}
                                parentCategory={product.parent_category_name}
                                priority={idx < 3}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Featured Block Banner */}
            {navConfig?.featured && (
                <section className="container-standard mb-24">
                    <div className="bg-stone-900 rounded-3xl p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                        <div className="relative z-10 md:w-1/2">
                            <h2 className="text-display-md text-white font-serif mb-6">{navConfig.featured.title}</h2>
                            <p className="text-body-lg text-stone-300 mb-8 font-medium">Discover the engineering and thoughtful details behind our most celebrated designs.</p>
                            <div className="flex flex-col gap-4">
                                {navConfig.featured.items.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="inline-flex items-center text-body-md font-bold text-amber-400 hover:text-amber-300 transition-colors group"
                                    >
                                        <span className="w-8 h-[1px] bg-amber-400 mr-4 group-hover:w-12 transition-all"></span>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

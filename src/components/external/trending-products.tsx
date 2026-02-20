'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/wellness-ui/product-card';
import { Carousel } from '@/components/external/carousel';
import { ArrowRight } from 'lucide-react';

const mockTrending = [
    {
        id: 'prod-1',
        slug: 'ceramic-essential-pan',
        name: 'Ceramic Essential Pan',
        category: 'Cookware',
        price: 95.0,
        originalPrice: 120.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Ceramic Essential Pan',
        rating: 4.9,
        reviewCount: 124,
        badges: [{ type: 'new' as const, label: 'Bestseller' }]
    },
    {
        id: 'prod-2',
        slug: 'stackable-glass-storage',
        name: 'Stackable Glass Storage',
        category: 'Storage',
        price: 45.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Stackable Glass Storage',
        rating: 4.8,
        reviewCount: 89,
    },
    {
        id: 'prod-3',
        slug: 'bamboo-cutting-board-set',
        name: 'Bamboo Cutting Board Set',
        category: 'Utensils',
        price: 65.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Bamboo Cutting Board Set',
        rating: 4.7,
        reviewCount: 210,
        badges: [{ type: 'low-stock' as const, label: 'Low Stock' }]
    },
    {
        id: 'prod-4',
        slug: 'organic-cotton-towels',
        name: 'Organic Cotton Kitchen Towels',
        category: 'Textiles',
        price: 35.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Organic Cotton Kitchen Towels',
        rating: 4.9,
        reviewCount: 340,
    }
];

export function TrendingProducts() {
    return (
        <section className="container-standard py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3 flex flex-col justify-center">
                    <span className="text-overline text-sage-600 mb-2">TRENDING</span>
                    <h2 className="text-display-md text-stone-900 mb-4">Elevate Everyday</h2>
                    <p className="text-body-md text-stone-600 mb-8">
                        Curated pieces that combine functional excellence with organic warmth.
                    </p>
                    <Link href="/products" className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 font-semibold transition-colors">
                        View Collection <ArrowRight size={20} />
                    </Link>
                </div>
                <div className="md:col-span-9">
                    <Carousel itemWidth={280}>
                        {mockTrending.map(prod => (
                            <ProductCard
                                key={prod.id}
                                {...prod}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

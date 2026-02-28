'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/wellness-ui/product-card';
import { Carousel } from '@/components/external/carousel';
import { ArrowRight } from 'lucide-react';

const mockNewArrivals = [
    {
        id: 'new-1',
        slug: 'linen-tablecloth',
        name: 'Organic Linen Tablecloth',
        category: 'Textiles',
        price: 85.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Organic Linen Tablecloth',
        rating: 5.0,
        reviewCount: 12,
        badges: [{ type: 'new' as const, label: 'New Arrival' }]
    },
    {
        id: 'new-2',
        slug: 'stoneware-plates',
        name: 'Stoneware Dinner Plates',
        category: 'Dining',
        price: 60.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Stoneware Dinner Plates',
        rating: 4.9,
        reviewCount: 24,
    },
    {
        id: 'new-3',
        slug: 'matte-gold-flatware',
        name: 'Matte Gold Flatware Set',
        category: 'Dining',
        price: 110.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Matte Gold Flatware Set',
        rating: 4.8,
        reviewCount: 18,
    },
    {
        id: 'new-4',
        slug: 'glass-carafe',
        name: 'Ribbed Glass Carafe',
        category: 'Accessories',
        price: 45.0,
        imageSrc: '/assets/illustrations/placeholder.svg',
        imageAlt: 'Ribbed Glass Carafe',
        rating: 4.9,
        reviewCount: 42,
        badges: [{ type: 'new' as const, label: 'Early Access' }]
    }
];

export function NewArrivals() {
    return (
        <section className="container-standard py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3 flex flex-col justify-center">
                    <span className="text-overline text-sage-600 mb-2">NEW ARRIVALS</span>
                    <h2 className="text-display-md text-stone-900 mb-4">Fresh Additions</h2>
                    <p className="text-body-md text-stone-600 mb-8">
                        The latest pieces designed to bring balance and minimalist beauty to your home.
                    </p>
                    <Link href="/products?sort=new" className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 font-semibold transition-colors">
                        Shop New <ArrowRight size={20} />
                    </Link>
                </div>
                <div className="md:col-span-9">
                    <Carousel itemWidth={280}>
                        {mockNewArrivals.map(prod => (
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

'use client';

import * as React from 'react';
import { ProductCard, ProductCardProps } from '@/components/wellness-ui/product-card';
import { cn } from '@/lib/utils/cn';

interface ProductGridProps {
    products: ProductCardProps[];
    className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
    if (!products?.length) {
        return null;
    }

    return (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8', className)}>
            {products.map((product) => (
                <div key={product.id}>
                    <ProductCard {...product} />
                </div>
            ))}
        </div>
    );
}

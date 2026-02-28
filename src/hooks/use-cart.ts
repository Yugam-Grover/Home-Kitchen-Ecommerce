'use client';

import { useState } from 'react';
import type { DbProduct } from '@/lib/database/queries/products';

export function useCart() {
    const [isAdding, setIsAdding] = useState(false);

    const addToCart = async (product: DbProduct, quantity: number = 1) => {
        setIsAdding(true);
        // TODO: implement real cart logic
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAdding(false);
        console.log(`Added ${quantity} of ${product.name} to cart.`);
    };

    return { addToCart, isAdding };
}

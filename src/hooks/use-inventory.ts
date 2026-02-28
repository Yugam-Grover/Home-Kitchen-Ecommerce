'use client';

import { useState, useEffect } from 'react';

export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export function useInventory(productId: string) {
    const [status, setStatus] = useState<InventoryStatus>('in_stock');
    const [stock, setStock] = useState(10);

    useEffect(() => {
        // TODO: implement Supabase Realtime WebSocket connection for stock
        setStock(10);
        setStatus('in_stock');
    }, [productId]);

    return { status, stock };
}

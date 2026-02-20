'use client';

import { useState, useEffect } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock recently viewed items
const mockViewed = [
    { id: '1', slug: 'ceramic-pan', name: 'Ceramic Essential Pan', price: '$95', image: '/assets/illustrations/placeholder.svg' },
    { id: '2', slug: 'glass-storage', name: 'Stackable Glass Storage', price: '$45', image: '/assets/illustrations/placeholder.svg' }
];

export function RecentlyViewed() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Show after delaying (simulate scrolling)
    useEffect(() => {
        if (isDismissed) return;
        const timer = setTimeout(() => setIsVisible(true), 15000); // 15s delay
        return () => clearTimeout(timer);
    }, [isDismissed]);

    if (isDismissed) return null;

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {isVisible && (
                    <m.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
                        className="fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 w-[320px]"
                    >
                        <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
                            <div className="flex items-center gap-2 text-stone-600 font-semibold text-sm">
                                <Clock size={16} /> Recently Viewed
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                                aria-label="Close recently viewed"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {mockViewed.map(item => (
                                <Link key={item.id} href={`/products/${item.slug}`} className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h4 className="text-body-sm text-stone-900 group-hover:text-sage-700 transition-colors line-clamp-1">
                                            {item.name}
                                        </h4>
                                        <p className="text-caption text-stone-500 font-bold tabular-nums">
                                            {item.price}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}

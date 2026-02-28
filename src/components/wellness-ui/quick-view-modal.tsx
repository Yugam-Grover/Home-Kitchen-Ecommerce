'use client';

import * as React from 'react';
import Image from 'next/image';
import { X, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/wellness-ui/button';

export interface QuickViewProduct {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount?: number;
    imageSrc: string;
    imageAlt: string;
    gallery?: string[];
    colors?: string[];
    material?: string;
}

export interface QuickViewModalProps {
    product: QuickViewProduct | null;
    onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
    const [added, setAdded] = React.useState(false);

    // Reset state when a new product is opened
    React.useEffect(() => {
        setAdded(false);
    }, [product]);

    // Handle escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!product) return null;

    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => {
            onClose();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative flex flex-col sm:flex-row w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                role="dialog"
                aria-modal="true"
                aria-labelledby="quick-view-title"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Left: Image */}
                <div className="relative w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-auto bg-stone-50">
                    <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right: Details */}
                <div className="flex flex-col w-full sm:w-1/2 p-6 sm:p-8">
                    <span className="text-overline text-stone-500 mb-2">{product.category}</span>
                    <h2 id="quick-view-title" className="text-heading-lg text-stone-900 mb-2">
                        {product.name}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="text-price-lg text-stone-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="text-price-strike mt-1">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <p className="text-body-md text-stone-600 mb-8 border-b border-stone-100 pb-6">
                        Experience the perfect blend of organic functionalism and mindful design with our signature {product.category.toLowerCase()}. Designed to integrate seamlessly into a restorative home space.
                    </p>

                    {product.colors && product.colors.length > 0 && (
                        <div className="mb-8">
                            <span className="block text-sm font-semibold text-stone-900 mb-3">Select Variant</span>
                            <div className="flex items-center gap-3">
                                {product.colors.map((color, idx) => (
                                    <button
                                        key={idx}
                                        className="h-8 w-8 rounded-full border-2 border-stone-200 ring-offset-2 hover:ring-2 hover:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                        style={{ backgroundColor: color }}
                                        title={`Variant ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-auto">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full h-14"
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? (
                                <>
                                    <Check className="h-5 w-5 mr-2" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Quick Add to Cart
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

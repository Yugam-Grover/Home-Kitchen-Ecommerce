'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Badge } from './badge';
import { StarRating } from './star-rating';
import { Button } from './button';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    badge?: {
        text: string;
        variant: 'discount' | 'new' | 'low-stock' | 'out-of-stock' | 'gold-member';
    };
    slug: string;
    onAddToCart?: (id: string) => void;
    onToggleWishlist?: (id: string) => void;
    isWishlisted?: boolean;
}

export function ProductCard({
    id,
    title,
    price,
    originalPrice,
    image,
    rating = 0,
    reviewCount,
    badge,
    slug,
    onAddToCart,
    onToggleWishlist,
    isWishlisted = false,
}: ProductCardProps) {
    return (
        <div className="group relative flex flex-col rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-50 mb-4">
                {/* Badge */}
                {badge && (
                    <div className="absolute left-3 top-3 z-10">
                        <Badge variant={badge.variant}>{badge.text}</Badge>
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleWishlist?.(id);
                    }}
                    className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-stone-900 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 hover:bg-white"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart size={18} className={cn("transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-stone-600")} />
                </button>

                <Link href={`/products/${slug}`} className="block h-full w-full">
                    {/* Note: In a real app, use Cloudinary URL builder here. For now using generic Image */}
                    <div className="relative h-full w-full">
                        {/* Placeholder for image - using standard next/image with object-cover */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </Link>

                {/* Quick Add Overlay (Desktop) / Button (Mobile) */}
                <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button
                        size="sm"
                        variant="white"
                        className="rounded-full shadow-md h-10 w-10 p-0"
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart?.(id);
                        }}
                        aria-label="Quick add to cart"
                    >
                        <ShoppingBag size={18} />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-1">
                <Link href={`/products/${slug}`} className="group-hover:text-sage-700 transition-colors">
                    <h3 className="font-sans text-lg font-semibold text-stone-900 line-clamp-1">{title}</h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <StarRating value={rating} readOnly size={14} />
                    {reviewCount !== undefined && (
                        <span className="text-xs text-stone-500">({reviewCount})</span>
                    )}
                </div>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-stone-900">${price.toFixed(2)}</span>
                    {originalPrice && originalPrice > price && (
                        <span className="text-sm text-stone-400 line-through">${originalPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

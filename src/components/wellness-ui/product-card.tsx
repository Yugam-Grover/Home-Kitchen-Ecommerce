import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/wellness-ui/badge';
import { Button } from '@/components/wellness-ui/button';
import { StarRating } from '@/components/wellness-ui/star-rating';

export interface ProductCardProps {
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
    badges?: {
        type: 'discount' | 'new' | 'low-stock' | 'out-of-stock' | 'gold-member';
        label: string;
    }[];
    isWishlisted?: boolean;
    onAddToCart?: (e: React.MouseEvent) => void;
    onToggleWishlist?: (e: React.MouseEvent) => void;
    className?: string;
}

export function ProductCard({
    id,
    slug,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    imageSrc,
    imageAlt,
    badges = [],
    isWishlisted = false,
    onAddToCart,
    onToggleWishlist,
    className,
}: ProductCardProps) {
    // Format currency
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div
            className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
                className
            )}
        >
            {/* Wishlist Button - Absolute Top Right */}
            <button
                onClick={onToggleWishlist}
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                <Heart
                    className={cn(
                        'h-5 w-5 transition-colors',
                        isWishlisted
                            ? 'fill-red-500 text-red-500'
                            : 'text-stone-900 hover:text-red-500'
                    )}
                />
            </button>

            {/* Badges - Absolute Top Left */}
            <div className="absolute left-3 top-3 z-20 flex flex-col gap-1">
                {badges.map((badge, index) => (
                    <Badge key={index} variant={badge.type}>
                        {badge.label}
                    </Badge>
                ))}
            </div>

            <Link href={`/products/${slug}`} className="flex-1">
                {/* Image Container with Aspect Ratio 4:5 */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    {/* Image scaling on hover */}
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Add to Cart Overlay - Slides up on hover */}
                    {onAddToCart && (
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                            <button
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent link navigation
                                    onAddToCart(e);
                                }}
                                className="flex w-full items-center justify-center gap-2 bg-primary-500/90 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-4">
                    <span className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-500">
                        {category}
                    </span>
                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight text-stone-900 group-hover:text-primary-700 font-sans">
                        {name}
                    </h3>

                    <div className="mt-auto flex items-end justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-stone-900 tabular-nums">
                                    {formatPrice(price)}
                                </span>
                                {originalPrice && originalPrice > price && (
                                    <span className="text-sm text-stone-400 line-through tabular-nums">
                                        {formatPrice(originalPrice)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <StarRating rating={rating} />
                            {reviewCount !== undefined && (
                                <span className="text-xs text-stone-500">({reviewCount})</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

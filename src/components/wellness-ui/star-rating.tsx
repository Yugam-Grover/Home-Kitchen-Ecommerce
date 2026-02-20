import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
    rating: number;
    max?: number;
    size?: 'sm' | 'md';
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
    ({ className, rating, max = 5, size = 'sm', ...props }, ref) => {
        // Clamp rating between 0 and max
        const clampedRating = Math.max(0, Math.min(rating, max));

        // Create an array for rendering stars
        const stars = Array.from({ length: max }, (_, index) => {
            const starValue = index + 1;

            if (clampedRating >= starValue) {
                return 'full';
            } else if (clampedRating >= starValue - 0.5) {
                return 'half';
            } else {
                return 'empty';
            }
        });

        const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

        return (
            <div
                ref={ref}
                className={cn('inline-flex items-center gap-[2px]', className)}
                {...props}
            >
                {stars.map((type, index) => {
                    if (type === 'full') {
                        return (
                            <Star
                                key={index}
                                className={cn(iconSize, 'fill-secondary-500 text-secondary-500')}
                            />
                        );
                    } else if (type === 'half') {
                        // Lucide doesn't have a perfect half-filled star that matches the fill. 
                        // We can use a mask or just rely on StarHalf if available and styled correctly.
                        // Actually, simplest consistent way is using SVG defs or just the StarHalf from lucide 
                        // but `fill-secondary-500` on StarHalf fills the whole icon in some versions or just the path.
                        // Let's assume Lucide's StarHalf is the left half.
                        // Better: use a relative div with two stars for perfect half.
                        // For now, let's stick to standard Lucide StarHalf.
                        return (
                            <div key={index} className="relative">
                                <Star className={cn(iconSize, 'text-stone-200 fill-stone-200')} /> {/* Background empty star */}
                                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                    <Star className={cn(iconSize, 'fill-secondary-500 text-secondary-500')} />
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <Star
                                key={index}
                                className={cn(iconSize, 'text-stone-200 fill-stone-200')}
                            />
                        );
                    }
                })}
            </div>
        );
    }
);
StarRating.displayName = 'StarRating';

export { StarRating };

import * as React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { StarRating } from '@/components/wellness-ui/star-rating';

export interface TestimonialCardProps {
    author: string;
    location?: string;
    quote: string;
    rating?: number;
    className?: string;
}

export function TestimonialCard({
    author,
    location,
    quote,
    rating = 5,
    className,
}: TestimonialCardProps) {
    return (
        <div
            className={cn(
                'relative flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md',
                className
            )}
        >
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                <StarRating rating={rating} size="sm" />

                <blockquote className="font-serif text-2xl italic leading-relaxed text-stone-900 sm:text-3xl">
                    &ldquo;{quote}&rdquo;
                </blockquote>

                <div className="flex flex-col items-center">
                    <cite className="font-sans text-base font-semibold not-italic text-stone-900">
                        {author}
                    </cite>
                    {location && (
                        <span className="font-sans text-xs text-stone-500">
                            {location}
                        </span>
                    )}
                </div>
            </div>

            {/* Decorative Quote Mark Background */}
            <span className="absolute bottom-4 right-6 text-[160px] leading-none text-secondary-500/30 font-serif select-none pointer-events-none italic z-0">
                &rdquo;
            </span>
        </div>
    );
}

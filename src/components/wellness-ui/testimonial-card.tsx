import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { StarRating } from './star-rating';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface TestimonialCardProps {
    quote: string;
    author: string;
    location?: string;
    rating?: number;
    className?: string;
}

export function TestimonialCard({ quote, author, location, rating = 5, className }: TestimonialCardProps) {
    return (
        <div className={cn("relative flex flex-col items-center justify-center p-8 text-center", className)}>
            {/* Decorative Quote Mark */}
            <span className="absolute left-1/2 top-0 -translate-x-1/2 transform text-[120px] leading-none text-amber-100 -z-10 font-serif opacity-50">
                &ldquo;
            </span>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <StarRating value={rating} readOnly size={20} />

                <blockquote className="font-serif text-xl sm:text-2xl italic leading-relaxed text-stone-900 max-w-2xl">
                    "{quote}"
                </blockquote>

                <div className="flex flex-col items-center">
                    <cite className="font-sans text-sm font-bold uppercase tracking-widest text-stone-900 not-italic">
                        {author}
                    </cite>
                    {location && (
                        <span className="text-xs text-stone-500 mt-1">{location}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

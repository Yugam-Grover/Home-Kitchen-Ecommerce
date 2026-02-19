import * as React from 'react';
import { Star } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface StarRatingProps {
    max?: number;
    value?: number;
    readOnly?: boolean;
    onChange?: (value: number) => void;
    className?: string;
    size?: number;
}

export function StarRating({
    max = 5,
    value = 0,
    readOnly = false,
    onChange,
    className,
    size = 18,
}: StarRatingProps) {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const displayValue = hoverValue ?? value;

    return (
        <div className={cn('flex items-center gap-0.5', className)} onMouseLeave={() => setHoverValue(null)}>
            {[...Array(max)].map((_, i) => {
                const ratingValue = i + 1;
                const isFilled = ratingValue <= displayValue;

                return (
                    <button
                        key={i}
                        type="button"
                        disabled={readOnly}
                        onClick={() => !readOnly && onChange?.(ratingValue)}
                        onMouseEnter={() => !readOnly && setHoverValue(ratingValue)}
                        className={cn(
                            'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 rounded-sm',
                            readOnly ? 'cursor-default' : 'cursor-pointer'
                        )}
                        aria-label={`Rate ${ratingValue} out of ${max} stars`}
                    >
                        <Star
                            size={size}
                            className={cn(
                                'transition-all duration-200',
                                isFilled ? 'fill-amber-500 text-amber-500' : 'text-stone-300 fill-transparent'
                            )}
                            strokeWidth={1.5}
                        />
                    </button>
                );
            })}
        </div>
    );
}

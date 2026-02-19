
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type BadgeVariant =
    | 'discount'
    | 'new'
    | 'low-stock'
    | 'out-of-stock'
    | 'gold-member'
    | 'early-access'
    | 'certification'
    | 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    children: React.ReactNode;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
    const variants: Record<string, string> = {
        discount: 'bg-green-100 text-green-800 border-green-200',
        new: 'bg-amber-100 text-amber-800 border-amber-200',
        'low-stock': 'bg-orange-100 text-orange-800 border-orange-200',
        'out-of-stock': 'bg-red-100 text-red-800 border-red-200',
        'gold-member': 'bg-amber-50 text-amber-600 border-amber-200 ring-1 ring-amber-300',
        'early-access': 'bg-sage-100 text-sage-800 border-sage-200',
        certification: 'bg-blue-50 text-blue-700 border-blue-200',
        default: 'bg-stone-100 text-stone-800 border-stone-200',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                variants[variant] || variants.default,
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

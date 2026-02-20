import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 font-sans',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary-500 text-stone-50 hover:bg-primary-500/80',
                secondary:
                    'border-transparent bg-secondary-500 text-white hover:bg-secondary-500/80',
                outline: 'text-stone-950',
                destructive:
                    'border-transparent bg-semantic-error text-stone-50 hover:bg-semantic-error/80',
                success:
                    'border-transparent bg-semantic-success text-white hover:bg-semantic-success/80',
                warning:
                    'border-transparent bg-semantic-warning text-white hover:bg-semantic-warning/80',
                // Specific semantic badges from Design System
                discount: 'border-transparent bg-semantic-success text-white',
                new: 'border-transparent bg-secondary-500 text-white',
                'low-stock': 'border-transparent bg-amber-100 text-amber-800',
                'out-of-stock': 'border-transparent bg-red-100 text-red-800',
                'gold-member': 'border-transparent bg-amber-100 text-amber-900',
                certification: 'border-primary-200 bg-primary-50 text-primary-900',
            },
            size: {
                sm: 'px-2 py-[2px] text-[11px]',
                md: 'px-3 py-1 text-sm',
                lg: 'px-4 py-1.5 text-base',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
    );
}

export { Badge, badgeVariants };

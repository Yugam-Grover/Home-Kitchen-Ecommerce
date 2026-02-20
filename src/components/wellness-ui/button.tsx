import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-50 font-sans text-inherit',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary-500 text-white shadow-sm hover:bg-primary-600 hover:shadow-md active:bg-primary-700 active:shadow-none',
                secondary:
                    'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 active:bg-primary-100',
                accent:
                    'bg-secondary-500 text-white shadow-sm hover:bg-secondary-600 hover:shadow-md active:bg-secondary-700 active:shadow-none',
                ghost:
                    'bg-transparent text-stone-600 hover:bg-stone-100 active:bg-stone-200',
                danger:
                    'bg-semantic-error text-white hover:bg-red-700 active:bg-red-800',
                link: 'text-primary-500 underline-offset-4 hover:underline',
            },
            size: {
                sm: 'h-9 px-4 text-sm font-medium',
                md: 'h-11 px-5 text-base',
                lg: 'h-[52px] px-6 text-lg',
                xl: 'h-14 px-8 text-lg font-bold',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

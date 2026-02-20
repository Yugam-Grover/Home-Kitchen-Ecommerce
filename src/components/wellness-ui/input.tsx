import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { Search } from 'lucide-react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    variant?: 'default' | 'search' | 'pill';
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, type, startIcon, endIcon, variant = 'default', label, error, helperText, ...props },
        ref
    ) => {
        // Base styles
        const baseStyles =
            'flex h-11 w-full border border-stone-200 bg-white px-4 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 font-sans';

        // Variant styles
        const variantStyles = {
            default: 'rounded-xl',
            search: 'rounded-full pl-12', // Extra padding for search icon
            pill: 'rounded-full',
        };

        // Error styles
        const errorStyles = error
            ? 'border-semantic-error focus-visible:ring-semantic-error'
            : '';

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-stone-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {variant === 'search' && (
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                            <Search className="h-5 w-5" />
                        </div>
                    )}
                    {startIcon && variant !== 'search' && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                            {startIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            baseStyles,
                            variantStyles[variant],
                            errorStyles,
                            startIcon && variant !== 'search' ? 'pl-12' : '',
                            endIcon ? 'pr-10' : '',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {endIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                            {endIcon}
                        </div>
                    )}
                </div>
                {helperText && !error && (
                    <p className="text-xs text-stone-500">{helperText}</p>
                )}
                {error && (
                    <p className="text-sm font-medium text-semantic-error">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };

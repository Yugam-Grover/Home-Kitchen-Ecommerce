import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="w-full">
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            'flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow',
                            error
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : 'border-stone-200',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className
                        )}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={error ? 'input-error' : helperText ? 'input-helper' : undefined}
                        {...props}
                    />
                    {rightIcon && !error && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                            {rightIcon}
                        </div>
                    )}
                    {error && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                            <AlertCircle size={18} />
                        </div>
                    )}
                </div>
                {error && (
                    <p id="input-error" className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1" role="alert">
                        {error}
                    </p>
                )}
                {!error && helperText && (
                    <p id="input-helper" className="mt-1.5 text-xs text-stone-500">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };

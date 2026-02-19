import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700 shadow-sm hover:shadow-md disabled:bg-sage-300',
      secondary: 'bg-transparent border border-gray-200 text-stone-900 hover:bg-stone-50 active:bg-stone-100 disabled:text-stone-300 disabled:border-gray-100',
      ghost: 'bg-transparent text-sage-600 hover:bg-sage-50 active:bg-sage-100 disabled:text-sage-300',
      white: 'bg-white text-stone-900 hover:bg-stone-50 active:bg-stone-100 shadow-sm hover:shadow-md disabled:bg-stone-50 disabled:text-stone-300',
    };

    const sizes = {
      sm: 'h-8 px-4 text-sm gap-2',
      md: 'h-10 px-5 text-base gap-2',
      lg: 'h-12 px-6 text-lg gap-3',
      xl: 'h-14 px-8 text-xl gap-3',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };

import * as React from 'react';
import { Input } from '@/components/wellness-ui/input';
import { cn } from '@/lib/utils/cn';

interface CategorySearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (query: string) => void;
}

export function CategorySearch({ className, onSearch, ...props }: CategorySearchProps) {
    return (
        <div className={cn('relative w-full max-w-[240px]', className)}>
            <Input
                variant="search"
                placeholder="Search in category..."
                className="h-10 text-sm bg-stone-50 border-transparent focus:bg-white transition-colors"
                onChange={(e) => onSearch?.(e.target.value)}
                {...props}
            />
        </div>
    );
}

import * as React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/wellness-ui/button';

export interface EmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({
    title = 'No results found',
    description = 'We couldn\'t find anything matching your current filters. Try changing your search terms or clearing filters.',
    actionLabel = 'Clear All Filters',
    onAction
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-surface-warm rounded-3xl border border-stone-200">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <SearchX className="h-8 w-8 text-stone-400" />
            </div>
            <h3 className="text-heading-lg mb-3">{title}</h3>
            <p className="text-body-md text-stone-600 max-w-md mx-auto mb-8">
                {description}
            </p>
            {onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}

import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    className,
    currentPage,
    totalPages,
    onPageChange,
    ...props
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        // Simple logic for < 5 pages
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                            currentPage === i
                                ? "bg-stone-900 text-white shadow-sm"
                                : "text-stone-800 hover:bg-stone-200 hover:text-stone-900"
                        )}
                        aria-current={currentPage === i ? 'page' : undefined}
                    >
                        {i}
                    </button>
                );
            }
            return pages;
        }

        // Logic > 5 pages
        pages.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                    currentPage === 1 ? "bg-stone-900 text-white shadow-sm" : "text-stone-800 hover:bg-stone-200 hover:text-stone-900"
                )}
            >
                1
            </button>
        );

        if (currentPage > 3) {
            pages.push(<span key="ell1" className="flex items-end justify-center w-6 text-stone-400"><MoreHorizontal className="w-4 h-4" /></span>);
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                        currentPage === i ? "bg-stone-900 text-white shadow-sm" : "text-stone-800 hover:bg-stone-200 hover:text-stone-900"
                    )}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages - 2) {
            pages.push(<span key="ell2" className="flex items-end justify-center w-6 text-stone-400"><MoreHorizontal className="w-4 h-4" /></span>);
        }

        pages.push(
            <button
                key={totalPages}
                onClick={() => onPageChange(totalPages)}
                className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                    currentPage === totalPages ? "bg-stone-900 text-white shadow-sm" : "text-stone-800 hover:bg-stone-200 hover:text-stone-900"
                )}
            >
                {totalPages}
            </button>
        );

        return pages;
    };

    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn("mx-auto flex w-full justify-center mt-12 mb-8", className)}
            {...props}
        >
            <ul className="flex flex-row items-center gap-1 sm:gap-2">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex h-10 items-center justify-center gap-1 rounded-full px-3 sm:px-4 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-200 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        aria-label="Go to previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Prev</span>
                    </button>
                </li>

                {renderPageNumbers()}

                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex h-10 items-center justify-center gap-1 rounded-full px-3 sm:px-4 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-200 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        aria-label="Go to next page"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </li>
            </ul>
        </nav>
    );
}

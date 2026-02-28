'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/wellness-ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/wellness-ui/select';

export interface PlpToolbarProps {
    totalResults: number;
    activeFilters: Record<string, any>;
    onClearFilter: (type: string, value?: string) => void;
    onSortChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    searchValue: string;
    sortValue: string;
}

export function PlpToolbar({
    totalResults,
    activeFilters,
    onClearFilter,
    onSortChange,
    onSearchChange,
    searchValue,
    sortValue,
}: PlpToolbarProps) {
    const activeFilterCount = Object.keys(activeFilters).reduce((acc, key) => {
        const val = activeFilters[key];
        if (Array.isArray(val)) return acc + val.length;
        if (typeof val === 'boolean' && val) return acc + 1;
        return acc;
    }, 0);

    return (
        <div className="flex flex-col gap-4 mb-8 bg-white border border-stone-200 shadow-sm rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-body-md font-medium text-stone-900 bg-stone-100 px-3 py-1.5 rounded-full">
                        {totalResults} Results
                    </span>
                    {activeFilterCount > 0 && (
                        <div className="hidden md:flex items-center gap-2 flex-wrap">
                            {Object.entries(activeFilters).map(([type, values]) => {
                                if (type === 'price' && Array.isArray(values) && values.length === 2) {
                                    return (
                                        <button
                                            key="price"
                                            onClick={() => onClearFilter('price')}
                                            className="flex items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1 text-sm font-medium text-sage-700 border border-sage-200 hover:bg-sage-100 transition-colors"
                                        >
                                            ${values[0]} - ${values[1] === 300 ? '300+' : values[1]}
                                            <X className="h-3 w-3" />
                                        </button>
                                    );
                                }
                                if (Array.isArray(values) && type !== 'price') {
                                    return values.map((val) => (
                                        <button
                                            key={`${type}-${val}`}
                                            onClick={() => onClearFilter(type, val)}
                                            className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 border border-primary-200 hover:bg-primary-100 transition-colors"
                                        >
                                            {val}
                                            <X className="h-3 w-3" />
                                        </button>
                                    ));
                                }
                                if (typeof values === 'boolean' && values) {
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => onClearFilter(type)}
                                            className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 border border-primary-200 hover:bg-primary-100 transition-colors"
                                        >
                                            {type === 'inStockOnly' ? 'In Stock' : type}
                                            <X className="h-3 w-3" />
                                        </button>
                                    );
                                }
                                return null;
                            })}
                            <button
                                onClick={() => onClearFilter('all')}
                                className="text-sm text-stone-500 hover:text-stone-900 underline underline-offset-4"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <div className="w-full md:w-60">
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-sans"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-40 flex-shrink-0">
                        <Select value={sortValue} onValueChange={onSortChange}>
                            <SelectTrigger className="rounded-xl border-stone-200 bg-white shadow-sm">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="relevance">Relevance</SelectItem>
                                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                                <SelectItem value="rating">Top Rated</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}

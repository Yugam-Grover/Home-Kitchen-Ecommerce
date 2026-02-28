'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { Checkbox } from '@/components/wellness-ui/checkbox';
import { Slider } from '@/components/wellness-ui/slider';

export interface PlpSidebarProps {
    className?: string;
    onFilterChange: (type: string, value: string | string[] | number[] | boolean) => void;
    activeFilters: Record<string, any>;
    /** Dynamic facets derived from real product data */
    facets?: { categories: string[]; materials: string[] };
    /** Max price for the slider (derived from data) */
    maxPrice?: number;
}

export function PlpSidebar({ className, onFilterChange, activeFilters, facets, maxPrice: maxPriceProp }: PlpSidebarProps) {
    const sidebarMaxPrice = maxPriceProp || 500;
    const categoryList = facets?.categories || [];
    const materialList = facets?.materials || [];

    // Local state for the price slider to debounce changes
    const [priceRange, setPriceRange] = React.useState([0, sidebarMaxPrice]);
    const [showAllCategories, setShowAllCategories] = React.useState(false);
    const [showAllMaterials, setShowAllMaterials] = React.useState(false);

    // Manual Price Inputs
    const [minPrice, setMinPrice] = React.useState(priceRange[0].toString());
    const [maxPrice, setMaxPrice] = React.useState(priceRange[1].toString());

    React.useEffect(() => {
        setMinPrice(priceRange[0].toString());
        setMaxPrice(priceRange[1].toString());
    }, [priceRange]);

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
        onFilterChange('price', value);
    };

    const handleManualPriceSubmit = () => {
        let min = parseInt(minPrice) || 0;
        let max = parseInt(maxPrice) || sidebarMaxPrice;

        // Validation
        if (min < 0) min = 0;
        if (max > sidebarMaxPrice) max = sidebarMaxPrice;
        if (min > max) min = max;

        setMinPrice(min.toString());
        setMaxPrice(max.toString());
        setPriceRange([min, max]);
        onFilterChange('price', [min, max]);
    };

    const pricePresets = [
        { label: 'Under $50', range: [0, 50] },
        { label: '$50 - $100', range: [50, 100] },
        { label: '$100 - $200', range: [100, 200] },
        { label: 'Over $200', range: [200, sidebarMaxPrice] }
    ];

    const toggleCategory = (category: string) => {
        const current = activeFilters.categories || [];
        const updated = current.includes(category)
            ? current.filter((c: string) => c !== category)
            : [...current, category];
        onFilterChange('categories', updated);
    };

    const toggleMaterial = (material: string) => {
        const current = activeFilters.materials || [];
        const updated = current.includes(material)
            ? current.filter((m: string) => m !== material)
            : [...current, material];
        onFilterChange('materials', updated);
    };

    return (
        <aside className={cn('flex flex-col w-64 flex-shrink-0 md:sticky md:top-24 pr-6 md:border-r border-stone-300', className)}>
            {/* Category Filter */}
            <div className="py-5 border-b border-stone-300">
                <h3 className="text-heading-sm mb-4">By Category</h3>
                <div className="flex flex-col gap-3">
                    {(showAllCategories ? categoryList : categoryList.slice(0, 3)).map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox
                                checked={activeFilters.categories?.includes(cat)}
                                onCheckedChange={() => toggleCategory(cat)}
                            />
                            <span className="text-body-sm text-stone-800 group-hover:text-stone-900 transition-colors">
                                {cat}
                            </span>
                        </label>
                    ))}
                    {categoryList.length > 3 && (
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline mt-1 text-left w-fit transition-colors"
                        >
                            {showAllCategories ? 'See Less' : `See More (${categoryList.length - 3})`}
                        </button>
                    )}
                </div>
            </div>

            {/* Material Filter */}
            <div className="py-5 border-b border-stone-300">
                <h3 className="text-heading-sm mb-4">By Material</h3>
                <div className="flex flex-col gap-3">
                    {(showAllMaterials ? materialList : materialList.slice(0, 3)).map((mat) => (
                        <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox
                                checked={activeFilters.materials?.includes(mat)}
                                onCheckedChange={() => toggleMaterial(mat)}
                            />
                            <span className="text-body-sm text-stone-800 group-hover:text-stone-900 transition-colors">
                                {mat}
                            </span>
                        </label>
                    ))}
                    {materialList.length > 3 && (
                        <button
                            onClick={() => setShowAllMaterials(!showAllMaterials)}
                            className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline mt-1 text-left w-fit transition-colors"
                        >
                            {showAllMaterials ? 'See Less' : `See More (${materialList.length - 3})`}
                        </button>
                    )}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="py-5 border-b border-stone-300">
                <h3 className="text-heading-sm mb-4">Price</h3>

                {/* Presets */}
                <div className="flex flex-col gap-2 mb-6">
                    {pricePresets.map((preset, idx) => {
                        const isSelected = priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1];
                        return (
                            <button
                                key={idx}
                                onClick={() => handlePriceChange(preset.range)}
                                className={cn(
                                    "text-left text-sm py-1.5 px-3 rounded-lg transition-colors border",
                                    isSelected
                                        ? "bg-primary-50 border-primary-200 text-primary-800 font-medium"
                                        : "bg-transparent border-transparent text-stone-800 hover:bg-stone-100"
                                )}
                            >
                                {preset.label}
                            </button>
                        );
                    })}
                </div>

                {/* Slider */}
                <div className="px-2 mb-6">
                    <Slider
                        defaultValue={[0, sidebarMaxPrice]}
                        max={sidebarMaxPrice}
                        step={5}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        onValueCommit={handlePriceChange}
                    />
                </div>
                <div className="flex items-center justify-between text-caption text-stone-500 mb-6">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1] === sidebarMaxPrice ? `${sidebarMaxPrice}+` : priceRange[1]}</span>
                </div>

                {/* Manual Inputs */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                        <input
                            type="number"
                            className="w-full pl-7 pr-3 py-2 border border-stone-300 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onBlur={handleManualPriceSubmit}
                            onKeyDown={(e) => e.key === 'Enter' && handleManualPriceSubmit()}
                        />
                    </div>
                    <span className="text-stone-400">-</span>
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                        <input
                            type="number"
                            className="w-full pl-7 pr-3 py-2 border border-stone-300 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onBlur={handleManualPriceSubmit}
                            onKeyDown={(e) => e.key === 'Enter' && handleManualPriceSubmit()}
                        />
                    </div>
                </div>
            </div>

            {/* Availability Filter */}
            <div className="py-4 border-b border-stone-300">
                <h3 className="text-heading-sm mb-4">Availability</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                        checked={activeFilters.inStockOnly}
                        onCheckedChange={(checked) => onFilterChange('inStockOnly', checked === true)}
                    />
                    <span className="text-body-sm text-stone-800 group-hover:text-stone-900 transition-colors">
                        In Stock Only
                    </span>
                </label>
            </div>
        </aside>
    );
}

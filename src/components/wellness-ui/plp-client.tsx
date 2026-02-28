'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { DbProduct } from '@/lib/database/queries/products';
import { getMockImageSrc, getMockGallery } from '@/lib/utils/mock-images';
import { PlpSidebar } from './plp-sidebar';
import { PlpToolbar } from './plp-toolbar';
import { ProductGrid } from './product-grid';
import { EmptyState } from './empty-state';
import type { ProductCardProps } from './product-card';
import { QuickViewModal } from './quick-view-modal';
import { Filter, X } from 'lucide-react';
import { Pagination } from './pagination';

interface PlpClientProps {
    /** Real product data from Supabase (fetched server-side and passed as props) */
    products?: DbProduct[];
    /** Parent category name — for Dynamic Modular Engine layout context */
    parentCategoryName?: string;
    /** Parent category slug — for URL context */
    parentCategorySlug?: string;
}

export function PlpClient({ products: serverProducts, parentCategoryName, parentCategorySlug }: PlpClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Parse initial URL state
    const initialCategory = searchParams.get('category') ? searchParams.get('category')!.split(',') : [];
    const initialMaterial = searchParams.get('material') ? searchParams.get('material')!.split(',') : [];
    const initialQuery = searchParams.get('q') || '';
    const initialSort = searchParams.get('sort') || 'relevance';

    // Derive facets from actual data
    const allProducts = serverProducts || [];
    const categorySet = new Set<string>();
    const materialSet = new Set<string>();
    let priceMin = Infinity;
    let priceMax = -Infinity;

    for (const p of allProducts) {
        categorySet.add(p.sub_category_name);
        if (p.material) materialSet.add(p.material);
        if (p.base_price_usd < priceMin) priceMin = p.base_price_usd;
        if (p.base_price_usd > priceMax) priceMax = p.base_price_usd;
    }

    const maxPrice = priceMax === -Infinity ? 500 : Math.ceil(priceMax / 50) * 50; // Round up to nearest 50

    const [activeFilters, setActiveFilters] = React.useState<Record<string, any>>({
        categories: initialCategory,
        materials: initialMaterial,
        price: [0, maxPrice],
        inStockOnly: false
    });

    const [searchValue, setSearchValue] = React.useState(initialQuery);
    const [sortValue, setSortValue] = React.useState(initialSort);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isPending, startTransition] = React.useTransition();
    const itemsPerPage = 12;

    // UX states
    const [quickViewProduct, setQuickViewProduct] = React.useState<DbProduct | null>(null);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);

    // Update URL when filters change
    const basePath = pathname || '/products';

    const updateUrl = React.useCallback((filters: Record<string, any>, search: string, sort: string) => {
        const params = new URLSearchParams();
        if (filters.categories?.length) params.set('category', filters.categories.join(','));
        if (filters.materials?.length) params.set('material', filters.materials.join(','));
        if (search) params.set('q', search);
        if (sort !== 'relevance') params.set('sort', sort);

        startTransition(() => {
            router.push(`${basePath}?${params.toString()}`, { scroll: false });
        });
    }, [router, basePath]);

    const handleFilterChange = (type: string, value: any) => {
        const newFilters = { ...activeFilters, [type]: value };
        setActiveFilters(newFilters);
        setCurrentPage(1);
        updateUrl(newFilters, searchValue, sortValue);
    };

    const handleClearFilter = (type: string, value?: string) => {
        if (type === 'all') {
            const cleared = { categories: [], materials: [], price: [0, maxPrice], inStockOnly: false };
            setActiveFilters(cleared);
            setSearchValue('');
            setSortValue('relevance');
            updateUrl(cleared, '', 'relevance');
            return;
        }

        if (Array.isArray(activeFilters[type]) && value) {
            const newArray = activeFilters[type].filter((v: string) => v !== value);
            handleFilterChange(type, newArray);
        } else {
            handleFilterChange(type, type === 'price' ? [0, maxPrice] : false);
        }
    };

    const handleSortChange = (value: string) => {
        setSortValue(value);
        setCurrentPage(1);
        updateUrl(activeFilters, searchValue, value);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        setCurrentPage(1);
        updateUrl(activeFilters, value, sortValue);
    };

    // Client-side filtering on real data
    const filteredProducts = React.useMemo(() => {
        let result = [...allProducts];

        // Search
        if (searchValue) {
            const q = searchValue.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.sub_category_name.toLowerCase().includes(q) ||
                (p.material && p.material.toLowerCase().includes(q))
            );
        }

        // Sub-Category filter
        if (activeFilters.categories?.length > 0) {
            result = result.filter(p => activeFilters.categories.includes(p.sub_category_name));
        }

        // Material filter
        if (activeFilters.materials?.length > 0) {
            result = result.filter(p => p.material && activeFilters.materials.includes(p.material));
        }

        // Price range
        if (activeFilters.price) {
            const [min, max] = activeFilters.price;
            result = result.filter(p => p.base_price_usd >= min && p.base_price_usd <= max);
        }

        // Sort
        switch (sortValue) {
            case 'price-asc':
                result.sort((a, b) => a.base_price_usd - b.base_price_usd);
                break;
            case 'price-desc':
                result.sort((a, b) => b.base_price_usd - a.base_price_usd);
                break;
            case 'rating':
                result.sort((a, b) => b.rating_avg - a.rating_avg);
                break;
            default:
                break;
        }

        return result;
    }, [allProducts, activeFilters, searchValue, sortValue]);

    const paginatedProducts = React.useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    // Map DbProduct → ProductCardProps
    const productCardPropsList: ProductCardProps[] = paginatedProducts.map((p, index) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.sub_category_name,
        price: p.base_price_usd,
        originalPrice: p.compare_at_price_usd ?? undefined,
        rating: p.rating_avg,
        reviewCount: p.review_count,
        imageSrc: getMockImageSrc(index + (currentPage - 1) * itemsPerPage),
        imageAlt: p.name,
        gallery: getMockGallery(index + (currentPage - 1) * itemsPerPage),
        parentCategory: p.parent_category_name,
        priority: index < 4, // Top row loads eagerly
        onAddToCart: (e) => {
            e.preventDefault();
            setQuickViewProduct(p);
        },
        onQuickView: (e) => {
            e.preventDefault();
            setQuickViewProduct(p);
        },
        onToggleWishlist: (e) => {
            e.preventDefault();
        }
    }));

    // Quick View modal product → card props mapping
    const quickViewProps = quickViewProduct ? {
        id: quickViewProduct.id,
        slug: quickViewProduct.slug,
        name: quickViewProduct.name,
        category: quickViewProduct.sub_category_name,
        price: quickViewProduct.base_price_usd,
        originalPrice: quickViewProduct.compare_at_price_usd ?? undefined,
        rating: quickViewProduct.rating_avg,
        reviewCount: quickViewProduct.review_count,
        imageSrc: getMockImageSrc(0),
        imageAlt: quickViewProduct.name,
        gallery: getMockGallery(0),
        material: quickViewProduct.material ?? undefined,
    } : null;

    return (
        <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <PlpSidebar
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    facets={{
                        categories: Array.from(categorySet).sort(),
                        materials: Array.from(materialSet).sort(),
                    }}
                    maxPrice={maxPrice}
                />
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFiltersOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
                    <div className="relative w-[300px] max-w-[85vw] bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between p-4 border-b border-stone-200">
                            <h2 className="text-heading-md">Filters</h2>
                            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <PlpSidebar
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                className="w-full pr-0"
                                facets={{
                                    categories: Array.from(categorySet).sort(),
                                    materials: Array.from(materialSet).sort(),
                                }}
                                maxPrice={maxPrice}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 min-w-0 transition-opacity duration-200 pb-20 md:pb-0" style={{ opacity: isPending ? 0.6 : 1 }}>
                <PlpToolbar
                    totalResults={filteredProducts.length}
                    activeFilters={activeFilters}
                    onClearFilter={handleClearFilter}
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                    searchValue={searchValue}
                    sortValue={sortValue}
                />

                {filteredProducts.length > 0 ? (
                    <>
                        <ProductGrid products={productCardPropsList} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    </>
                ) : (
                    <EmptyState onAction={() => handleClearFilter('all')} />
                )}
            </div>

            {/* Mobile Filter FAB */}
            <button
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full shadow-lg font-semibold tracking-wide"
                onClick={() => setIsMobileFiltersOpen(true)}
            >
                <Filter className="h-4 w-4" />
                Filter & Sort
            </button>

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProps}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
}

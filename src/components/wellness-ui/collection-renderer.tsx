import React from 'react';
import type { DbCategory, DbSubCategory } from '@/lib/database/queries/categories';
import type { DbProduct } from '@/lib/database/queries/products';
import type { NavigationCategory } from '@/config/navigation';
import { CategoryLandingView } from './category-landing-view';
import { SubCategoryGridView } from './sub-category-grid-view';

interface CategoryLandingProps {
    mode: 'category-landing';
    category: DbCategory;
    featuredProducts: DbProduct[];
    navConfig?: NavigationCategory;
}

interface SubCategoryProps {
    mode: 'sub-category';
    parentCategory: { id: string; name: string; slug: string };
    subCategory: DbSubCategory;
    products: DbProduct[];
    totalProducts: number;
}

type CollectionRendererProps = CategoryLandingProps | SubCategoryProps;

export function CollectionRenderer(props: CollectionRendererProps) {
    if (props.mode === 'category-landing') {
        return (
            <CategoryLandingView
                category={props.category}
                featuredProducts={props.featuredProducts}
                navConfig={props.navConfig}
            />
        );
    }

    return (
        <SubCategoryGridView
            parentCategory={props.parentCategory}
            subCategory={props.subCategory}
            products={props.products}
            totalProducts={props.totalProducts}
        />
    );
}

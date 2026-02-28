// src/config/navigation.ts
// Navigation config aligned with live Supabase categories
// 5 parent categories → 18 sub-categories
// Hrefs use DB slugs: /collections/{parent-slug}/{sub-slug}

export interface SubCategory {
    name: string;
    href: string;
    slug: string;
}

export interface CategoryGroup {
    title: string;
    description: string;
    items: SubCategory[];
    viewAllHref: string;
}

export interface FeaturedItem {
    title: string;
    items: { name: string; href: string }[];
}

export interface NavigationCategory {
    label: string;
    href: string;
    slug: string;
    featuredImage: {
        src: string;
        alt: string;
    };
    groups: CategoryGroup[];
    featured?: FeaturedItem;
}

export const navigationConfig: NavigationCategory[] = [
    {
        label: 'Cookware',
        href: '/collections/cookware',
        slug: 'cookware',
        featuredImage: {
            src: '/assets/mock/img2.jpg',
            alt: 'Precision-engineered cookware in a restorative kitchen setting',
        },
        groups: [
            {
                title: 'Pots & Pans',
                description: 'Essential pieces for mindful preparation.',
                items: [
                    { name: 'Shop All Pots & Pans', href: '/collections/cookware/pots-pans', slug: 'pots-pans' },
                ],
                viewAllHref: '/collections/cookware/pots-pans',
            },
            {
                title: 'Knives & Cutlery',
                description: 'Precision instruments for daily rituals.',
                items: [
                    { name: 'Shop All Knives & Cutlery', href: '/collections/cookware/knives-cutlery', slug: 'knives-cutlery' },
                ],
                viewAllHref: '/collections/cookware/knives-cutlery',
            },
            {
                title: 'Prep Tools & Gadgets',
                description: 'Tactile tools for effortless cooking.',
                items: [
                    { name: 'Shop All Prep Tools', href: '/collections/cookware/prep-tools-gadgets', slug: 'prep-tools-gadgets' },
                ],
                viewAllHref: '/collections/cookware/prep-tools-gadgets',
            },
            {
                title: 'Bakeware',
                description: 'Non-toxic baking essentials.',
                items: [
                    { name: 'Shop All Bakeware', href: '/collections/cookware/bakeware', slug: 'bakeware' },
                ],
                viewAllHref: '/collections/cookware/bakeware',
            },
        ],
        featured: {
            title: 'Featured Innovation',
            items: [
                { name: 'Self-Sanitizing Surfaces', href: '/collections/cookware/pots-pans' },
                { name: 'Modular Multi-Taskers', href: '/collections/cookware/prep-tools-gadgets' },
            ],
        },
    },
    {
        label: 'Dining & Entertaining',
        href: '/collections/dining-entertaining',
        slug: 'dining-entertaining',
        featuredImage: {
            src: '/assets/mock/img5.jpg',
            alt: 'Organic modernist dining table set with ceramic plates',
        },
        groups: [
            {
                title: 'Dinnerware',
                description: 'Unglazed edges and tactile forms.',
                items: [
                    { name: 'Shop All Dinnerware', href: '/collections/dining-entertaining/dinnerware', slug: 'dinnerware' },
                ],
                viewAllHref: '/collections/dining-entertaining/dinnerware',
            },
            {
                title: 'Drinkware',
                description: 'Mugs, glasses, and carafes for daily rituals.',
                items: [
                    { name: 'Shop All Drinkware', href: '/collections/dining-entertaining/drinkware', slug: 'drinkware' },
                ],
                viewAllHref: '/collections/dining-entertaining/drinkware',
            },
            {
                title: 'Serveware',
                description: 'Platters, bowls, and boards for curated hosting.',
                items: [
                    { name: 'Shop All Serveware', href: '/collections/dining-entertaining/serveware', slug: 'serveware' },
                ],
                viewAllHref: '/collections/dining-entertaining/serveware',
            },
            {
                title: 'Table Linens',
                description: 'Organic textures for the table.',
                items: [
                    { name: 'Shop All Table Linens', href: '/collections/dining-entertaining/table-linens', slug: 'table-linens' },
                ],
                viewAllHref: '/collections/dining-entertaining/table-linens',
            },
        ],
    },
    {
        label: 'Home Furnishings',
        href: '/collections/home-furnishings',
        slug: 'home-furnishings',
        featuredImage: {
            src: '/assets/mock/img1.jpg',
            alt: 'Minimalist Japandi living space with organic textures',
        },
        groups: [
            {
                title: 'Throws & Blankets',
                description: 'Cozy layers for restorative comfort.',
                items: [
                    { name: 'Shop All Throws & Blankets', href: '/collections/home-furnishings/throws-blankets', slug: 'throws-blankets' },
                ],
                viewAllHref: '/collections/home-furnishings/throws-blankets',
            },
            {
                title: 'Decorative Pillows',
                description: 'Organic cushions and tactile textures.',
                items: [
                    { name: 'Shop All Decorative Pillows', href: '/collections/home-furnishings/decorative-pillows', slug: 'decorative-pillows' },
                ],
                viewAllHref: '/collections/home-furnishings/decorative-pillows',
            },
            {
                title: 'Rugs & Mats',
                description: 'Grounding textures for every room.',
                items: [
                    { name: 'Shop All Rugs & Mats', href: '/collections/home-furnishings/rugs-mats', slug: 'rugs-mats' },
                ],
                viewAllHref: '/collections/home-furnishings/rugs-mats',
            },
            {
                title: 'Decor & Accents',
                description: 'Tactile details for visual warmth.',
                items: [
                    { name: 'Shop All Decor & Accents', href: '/collections/home-furnishings/decor-accents', slug: 'decor-accents' },
                ],
                viewAllHref: '/collections/home-furnishings/decor-accents',
            },
        ],
    },
    {
        label: 'Bath & Wellness',
        href: '/collections/bath-wellness',
        slug: 'bath-wellness',
        featuredImage: {
            src: '/assets/mock/img4.jpg',
            alt: 'Serene spa-inspired bath sanctuary',
        },
        groups: [
            {
                title: 'Bath Towels & Mats',
                description: 'Organic cotton and bamboo for daily renewal.',
                items: [
                    { name: 'Shop All Bath Towels & Mats', href: '/collections/bath-wellness/bath-towels-mats', slug: 'bath-towels-mats' },
                ],
                viewAllHref: '/collections/bath-wellness/bath-towels-mats',
            },
            {
                title: 'Robes',
                description: 'Luxuriously soft wraps for restorative mornings.',
                items: [
                    { name: 'Shop All Robes', href: '/collections/bath-wellness/robes', slug: 'robes' },
                ],
                viewAllHref: '/collections/bath-wellness/robes',
            },
            {
                title: 'Bath Accessories',
                description: 'Curated tools for unhurried self-care.',
                items: [
                    { name: 'Shop All Bath Accessories', href: '/collections/bath-wellness/bath-accessories', slug: 'bath-accessories' },
                ],
                viewAllHref: '/collections/bath-wellness/bath-accessories',
            },
        ],
        featured: {
            title: 'Wellness Ritual',
            items: [
                { name: 'Japanese Hinoki Collection', href: '/collections/bath-wellness/bath-accessories' },
                { name: 'Organic Linen Robes', href: '/collections/bath-wellness/robes' },
            ],
        },
    },
    {
        label: 'Bedding',
        href: '/collections/bedding',
        slug: 'bedding',
        featuredImage: {
            src: '/assets/mock/img3.jpg',
            alt: 'Organic linen bedding in a restful sanctuary',
        },
        groups: [
            {
                title: 'Sheets & Pillowcases',
                description: 'Organic cotton and linen for restorative sleep.',
                items: [
                    { name: 'Shop All Sheets & Pillowcases', href: '/collections/bedding/sheets-pillowcases', slug: 'sheets-pillowcases' },
                ],
                viewAllHref: '/collections/bedding/sheets-pillowcases',
            },
            {
                title: 'Duvet Covers',
                description: 'Pre-washed linen and percale for effortless elegance.',
                items: [
                    { name: 'Shop All Duvet Covers', href: '/collections/bedding/duvet-covers', slug: 'duvet-covers' },
                ],
                viewAllHref: '/collections/bedding/duvet-covers',
            },
            {
                title: 'Quilts & Blankets',
                description: 'Hand-quilted coverlets and weighted comfort.',
                items: [
                    { name: 'Shop All Quilts & Blankets', href: '/collections/bedding/quilts-blankets', slug: 'quilts-blankets' },
                ],
                viewAllHref: '/collections/bedding/quilts-blankets',
            },
        ],
        featured: {
            title: 'Sleep Sanctuary',
            items: [
                { name: 'Organic Sateen Collection', href: '/collections/bedding/sheets-pillowcases' },
                { name: 'Weighted Blankets', href: '/collections/bedding/quilts-blankets' },
            ],
        },
    },
];

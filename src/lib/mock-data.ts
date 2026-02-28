export type ProductCategory = 'Cookware' | 'Storage' | 'Textiles' | 'Utensils' | 'Cleaning' | 'Tableware';

export interface Product {
    id: string;
    slug: string;
    name: string;
    category: ProductCategory;
    price: number;
    originalPrice?: number;
    imageSrc: string;
    imageAlt: string;
    gallery?: string[];
    rating: number;
    reviewCount: number;
    badges?: { type: 'discount' | 'new' | 'low-stock' | 'out-of-stock' | 'gold-member'; label: string }[];
    colors?: string[]; // hex codes for swatches
    material?: string;
}

export const baseMockProducts: Product[] = [
    {
        id: 'prod-1',
        slug: 'ceramic-essential-pan',
        name: 'Ceramic Essential Pan',
        category: 'Cookware',
        price: 95.0,
        originalPrice: 120.0,
        imageSrc: '/assets/mock/img1.jpg',
        imageAlt: 'Ceramic Essential Pan in Sage Green',
        gallery: ['/assets/mock/img1.jpg', '/assets/mock/img13.jpg', '/assets/mock/img14.jpg'],
        rating: 4.9,
        reviewCount: 124,
        badges: [{ type: 'new', label: 'Bestseller' }],
        colors: ['#4A5D4E', '#F5EEE6', '#1C1917'],
        material: 'Ceramic',
    },
    {
        id: 'prod-2',
        slug: 'stackable-glass-storage',
        name: 'Stackable Glass Storage (Set of 4)',
        category: 'Storage',
        price: 45.0,
        imageSrc: '/assets/mock/img2.jpg',
        imageAlt: 'Stackable Glass Storage Containers',
        gallery: ['/assets/mock/img2.jpg', '/assets/mock/img15.jpg'],
        rating: 4.8,
        reviewCount: 389,
        material: 'Glass',
    },
    {
        id: 'prod-3',
        slug: 'bamboo-cutting-board-set',
        name: 'Organic Bamboo Cutting Board',
        category: 'Utensils',
        price: 65.0,
        originalPrice: 75.0,
        imageSrc: '/assets/mock/img3.jpg',
        imageAlt: 'Bamboo Cutting Board Set',
        gallery: ['/assets/mock/img3.jpg', '/assets/mock/img1.jpg'],
        rating: 4.7,
        reviewCount: 210,
        badges: [{ type: 'discount', label: 'Sale' }],
        material: 'Wood',
    },
    {
        id: 'prod-4',
        slug: 'organic-cotton-towels',
        name: 'Waffle Knit Kitchen Towels',
        category: 'Textiles',
        price: 35.0,
        imageSrc: '/assets/mock/img4.jpg',
        imageAlt: 'Organic Cotton Kitchen Towels',
        gallery: ['/assets/mock/img4.jpg', '/assets/mock/img13.jpg'],
        rating: 4.9,
        reviewCount: 340,
        colors: ['#D6D3CD', '#E8E5DF', '#8B9A90'],
        material: 'Cotton',
    },
    {
        id: 'prod-5',
        slug: 'self-sanitizing-prep-station',
        name: 'Self-Sanitizing Prep Station',
        category: 'Cleaning',
        price: 185.0,
        imageSrc: '/assets/mock/img5.jpg',
        imageAlt: 'Minimalist prep station',
        gallery: ['/assets/mock/img5.jpg', '/assets/mock/img14.jpg'],
        rating: 4.9,
        reviewCount: 42,
        badges: [{ type: 'gold-member', label: 'Gold Exclusive' }],
        colors: ['#1C1917', '#FAF8F5'],
        material: 'Steel',
    },
    {
        id: 'prod-6',
        slug: 'japanese-chef-knife',
        name: 'Forged Carbon Steel Chef Knife',
        category: 'Utensils',
        price: 140.0,
        imageSrc: '/assets/mock/img6.jpg',
        imageAlt: 'Japanese Chef Knife with Wooden Handle',
        gallery: ['/assets/mock/img6.jpg'],
        rating: 5.0,
        reviewCount: 156,
        badges: [{ type: 'low-stock', label: 'Only 3 Left' }],
        material: 'Steel',
    },
    {
        id: 'prod-7',
        slug: 'stoneware-dinner-set',
        name: 'Matte Stoneware Dinner Set',
        category: 'Tableware',
        price: 125.0,
        imageSrc: '/assets/mock/img7.jpg',
        imageAlt: 'Matte Stoneware Plates',
        gallery: ['/assets/mock/img7.jpg', '/assets/mock/img15.jpg'],
        rating: 4.6,
        reviewCount: 88,
        colors: ['#4A5D4E', '#EAE6E1', '#78716C'],
        material: 'Ceramic',
    },
    {
        id: 'prod-8',
        slug: 'copper-pour-over-kettle',
        name: 'Precision Pour-Over Kettle',
        category: 'Cookware',
        price: 85.0,
        imageSrc: '/assets/mock/img8.jpg',
        imageAlt: 'Copper Pour-Over Kettle',
        gallery: ['/assets/mock/img8.jpg', '/assets/mock/img13.jpg'],
        rating: 4.8,
        reviewCount: 312,
        material: 'Steel',
    },
    {
        id: 'prod-9',
        slug: 'modular-pantry-bins',
        name: 'Modular Pantry Bins',
        category: 'Storage',
        price: 55.0,
        originalPrice: 65.0,
        imageSrc: '/assets/mock/img9.jpg',
        imageAlt: 'Modular Pantry Storage',
        gallery: ['/assets/mock/img9.jpg', '/assets/mock/img1.jpg'],
        rating: 4.5,
        reviewCount: 198,
        badges: [{ type: 'discount', label: '15% Off' }],
        material: 'Plastic',
    },
    {
        id: 'prod-10',
        slug: 'linen-table-runner',
        name: 'Washed Linen Table Runner',
        category: 'Textiles',
        price: 48.0,
        imageSrc: '/assets/mock/img10.jpg',
        imageAlt: 'Linen Table Runner on wooden table',
        gallery: ['/assets/mock/img10.jpg'],
        rating: 4.9,
        reviewCount: 75,
        colors: ['#B8AF9F', '#E8E5DF'],
        material: 'Linen',
    },
    {
        id: 'prod-11',
        slug: 'cast-iron-dutch-oven',
        name: 'Enameled Cast Iron Dutch Oven',
        category: 'Cookware',
        price: 210.0,
        imageSrc: '/assets/mock/img11.jpg',
        imageAlt: 'Enameled Dutch Oven',
        gallery: ['/assets/mock/img11.jpg', '/assets/mock/img14.jpg'],
        rating: 4.9,
        reviewCount: 650,
        badges: [{ type: 'out-of-stock', label: 'Out of Stock' }],
        colors: ['#8DAB93', '#F2F0EA', '#D97706'],
        material: 'Cast Iron',
    },
    {
        id: 'prod-12',
        slug: 'compost-bin-odorless',
        name: 'Odorless Countertop Compost',
        category: 'Cleaning',
        price: 65.0,
        imageSrc: '/assets/mock/img12.jpg',
        imageAlt: 'Countertop Compost Bin',
        gallery: ['/assets/mock/img12.jpg', '/assets/mock/img15.jpg'],
        rating: 4.8,
        reviewCount: 145,
        material: 'Steel',
    }
];

// Duplicate products to easily demonstrate pagination 
export const mockProducts: Product[] = [
    ...baseMockProducts,
    ...baseMockProducts.map((p, i) => ({
        ...p,
        id: `prod-${i + 13}`,
        slug: `${p.slug}-v2`,
        name: `${p.name} (V2)`,
    })),
    ...baseMockProducts.slice(0, 8).map((p, i) => ({
        ...p,
        id: `prod-${i + 25}`,
        slug: `${p.slug}-v3`,
        name: `${p.name} (Premium)`,
        price: p.price + 20,
        badges: [{ type: 'new' as const, label: 'New Edition' }]
    }))
];

export const mockFacets = {
    categories: ['Cookware', 'Storage', 'Textiles', 'Utensils', 'Cleaning', 'Tableware'],
    materials: ['Ceramic', 'Cast Iron', 'Steel', 'Wood', 'Glass', 'Cotton', 'Linen', 'Plastic'],
};

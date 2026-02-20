'use client';

import dynamic from 'next/dynamic';
import { HeroSkeleton } from '@/components/external/hero-slider';

// Abstracting dynamic imports to a Client Component wrapper 
// to bypass the Server Component `ssr: false` Next.js 16 restriction

export const HeroSlider = dynamic(() => import('@/components/external/hero-slider').then(mod => mod.HeroSlider), {
    ssr: false,
    loading: () => <HeroSkeleton />
});

export const TrendingProducts = dynamic(() => import('@/components/external/trending-products').then(mod => mod.TrendingProducts), {
    ssr: false,
    loading: () => <div className="container-standard py-24 min-h-[400px] bg-surface-default animate-pulse"></div>
});

export const TestimonialsCarousel = dynamic(() => import('@/components/external/testimonials-carousel').then(mod => mod.TestimonialsCarousel), {
    ssr: false,
    loading: () => <div className="w-full py-24 min-h-[300px] bg-surface-warm animate-pulse"></div>
});

export const ShopTheLook = dynamic(() => import('@/components/external/shop-the-look').then(mod => mod.ShopTheLook), {
    ssr: false,
    loading: () => <div className="container-standard py-24 min-h-[400px] animate-pulse"></div>
});

export const RecentlyViewed = dynamic(() => import('@/components/external/recently-viewed').then(mod => mod.RecentlyViewed), {
    ssr: false
});

export const CareGuideModal = dynamic(() => import('@/components/external/care-guide-modal').then(mod => mod.CareGuideModal), {
    ssr: false
});

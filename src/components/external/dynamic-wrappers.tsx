'use client';

import dynamic from 'next/dynamic';
import { HeroSkeleton } from '@/components/external/hero-slider';
import { LazyMount } from '@/components/external/lazy-mount';

// -----------------------------------------------------------------------------
// ABOVE THE FOLD (Immediate Loading)
// -----------------------------------------------------------------------------

export const Navbar = dynamic(() => import('@/components/external/navbar').then(mod => mod.Navbar), {
    ssr: false,
    loading: () => <header className="h-[73px] bg-white border-b border-stone-200 animate-pulse w-full hidden md:block"></header>
});

export const HeroSlider = dynamic(() => import('@/components/external/hero-slider').then(mod => mod.HeroSlider), {
    ssr: false,
    loading: () => <HeroSkeleton />
});

// -----------------------------------------------------------------------------
// BELOW THE FOLD (Lazy Mounted via Intersection Observer)
// Defers JS downloading & parsing until the user scrolls near the component!
// -----------------------------------------------------------------------------

const TrendingProductsDynamic = dynamic(() => import('@/components/external/trending-products').then(mod => mod.TrendingProducts), { ssr: false });
export function TrendingProducts() {
    return (
        <LazyMount fallback={<div className="container-standard py-24 min-h-[400px] bg-surface-default animate-pulse"></div>}>
            <TrendingProductsDynamic />
        </LazyMount>
    );
}

const NewArrivalsDynamic = dynamic(() => import('@/components/external/new-arrivals').then(mod => mod.NewArrivals), { ssr: false });
export function NewArrivals() {
    return (
        <LazyMount fallback={<div className="container-standard py-24 min-h-[400px] bg-surface-default animate-pulse"></div>}>
            <NewArrivalsDynamic />
        </LazyMount>
    );
}

const TestimonialsCarouselDynamic = dynamic(() => import('@/components/external/testimonials-carousel').then(mod => mod.TestimonialsCarousel), { ssr: false });
export function TestimonialsCarousel() {
    return (
        <LazyMount fallback={<div className="w-full py-24 min-h-[300px] bg-surface-warm animate-pulse"></div>}>
            <TestimonialsCarouselDynamic />
        </LazyMount>
    );
}

const ShopTheLookDynamic = dynamic(() => import('@/components/external/shop-the-look').then(mod => mod.ShopTheLook), { ssr: false });
export function ShopTheLook() {
    return (
        <LazyMount fallback={<div className="container-standard py-24 min-h-[400px] animate-pulse"></div>}>
            <ShopTheLookDynamic />
        </LazyMount>
    );
}

const NewsletterCtaDynamic = dynamic(() => import('@/components/external/newsletter-cta').then(mod => mod.NewsletterCta), { ssr: false });
export function NewsletterCta() {
    return (
        <LazyMount fallback={<section className="container-standard py-24 min-h-[400px] bg-surface-default animate-pulse"></section>}>
            <NewsletterCtaDynamic />
        </LazyMount>
    );
}

// -----------------------------------------------------------------------------
// MODALS & OVERLAYS (Standard Dynamic)
// -----------------------------------------------------------------------------

export const RecentlyViewed = dynamic(() => import('@/components/external/recently-viewed').then(mod => mod.RecentlyViewed), {
    ssr: false
});

export const CareGuideModal = dynamic(() => import('@/components/external/care-guide-modal').then(mod => mod.CareGuideModal), {
    ssr: false
});

import {
  HeroSlider,
  TrendingProducts,
  TestimonialsCarousel,
  ShopTheLook,
  RecentlyViewed,
  CareGuideModal
} from '@/components/external/dynamic-wrappers';
import { BrandUspBand } from '@/components/wellness-ui/brand-usp-band';
import { NewsletterCta } from '@/components/wellness-ui/newsletter-cta';
import { ShopByCategory } from '@/components/wellness-ui/shop-by-category';

export const metadata = {
  title: 'Restorative Home & Kitchen',
  description: 'Organic Modernist Living with Self-Sanitizing Surfaces.',
};

export default async function HomePage() {
  // Use React 19's use cache for the server shell (though Dynamic components bypass this for JS delivery)
  'use cache';

  return (
    <main className="flex flex-col min-h-screen bg-surface-default">
      <HeroSlider />
      <ShopByCategory />
      <TrendingProducts />
      <BrandUspBand />
      <ShopTheLook />
      <TestimonialsCarousel />
      <NewsletterCta />

      {/* Proactive Client Overlays */}
      <RecentlyViewed />
      <CareGuideModal />
    </main>
  );
}

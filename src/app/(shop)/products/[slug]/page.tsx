import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/database/queries/products';

import { PDPHeroZone } from './components/pdp-hero-zone';
import { PDPUspBar } from './components/pdp-usp-bar';
import { PDPNarrativeFact } from './components/pdp-narrative-fact';
import { PDPNarrativeFeeling } from './components/pdp-narrative-feeling';
import { PDPCompleteTheLook } from './components/pdp-complete-the-look';
import { PDPSocialSpotlight } from './components/pdp-social-spotlight';
import { PDPNarrativeProof } from './components/pdp-narrative-proof';
import { PDPRelatedProducts } from './components/pdp-related-products';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    // Use Next 15+ promise resolution for params
    const { slug } = await params;

    // 1. Fetch Product Data
    const product = await getProductBySlug(slug);

    // 2. 404 if not found
    if (!product) {
        notFound();
    }

    // 3. Dynamic Modular Engine logic
    const isPrecisionMode =
        product.parent_category_name === 'Cookware' ||
        product.parent_category_name === 'Dining & Entertaining';
    const mode = isPrecisionMode ? 'precision' : 'restorative';

    // 4. Render the 8-Section Master Architecture
    return (
        <article className="w-full flex flex-col">
            {/* SECTION 1: The Buy Box */}
            <PDPHeroZone product={product} />

            {/* SECTION 2: USP Badge Bar */}
            <PDPUspBar product={product} />

            {/* SECTION 3: Narrative Block A (The Fact) - DYNAMIC MODE */}
            <PDPNarrativeFact product={product} mode={mode} />

            {/* SECTION 4: Narrative Block B (The Feeling) - DYNAMIC MODE */}
            <PDPNarrativeFeeling product={product} mode={mode} />

            {/* SECTION 5: Complete the Look Carousel */}
            <PDPCompleteTheLook product={product} />

            {/* SECTION 6: UGC & Review Spotlight */}
            <PDPSocialSpotlight product={product} />

            {/* SECTION 7: Narrative Block C (The Proof / FAQ) */}
            <PDPNarrativeProof product={product} mode={mode} />

            {/* SECTION 8: Related Products Carousel (Same Subcategory) */}
            <PDPRelatedProducts product={product} />
        </article>
    );
}

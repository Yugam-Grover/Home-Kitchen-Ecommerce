import { Star } from 'lucide-react';
import type { DbProduct } from '@/lib/database/queries/products';

interface PDPSocialSpotlightProps {
    product: DbProduct;
}

export function PDPSocialSpotlight({ product }: PDPSocialSpotlightProps) {
    // Mock data for the review section based on mockup instructions
    const averageRating = product.rating_avg > 0 ? product.rating_avg.toFixed(1) : '4.8';
    const totalReviews = product.review_count > 0 ? product.review_count : 124;

    const histogram = [
        { stars: 5, percentage: 75 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 6 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 1 },
    ];

    const mockReviews = [
        {
            id: 1,
            author: 'Eleanor V.',
            verified: true,
            rating: 5,
            date: 'October 12, 2025',
            title: 'Exactly what my kitchen needed',
            body: `The aesthetic is unparalleled. I was worried it might just look good and not perform, but the quality is evident from the moment you hold it. It feels substantial yet perfectly balanced.`
        },
        {
            id: 2,
            author: 'Marcus T.',
            verified: true,
            rating: 5,
            date: 'September 28, 2025',
            title: 'Minimalist perfection',
            body: `I've replaced three separate tools with just this one. The self-sanitizing feature gives me peace of mind, especially when prepping multiple meals quickly.`
        },
        {
            id: 3,
            author: 'Sarah J.',
            verified: true,
            rating: 4,
            date: 'September 15, 2025',
            title: 'Beautiful but requires care',
            body: `Absolutely stunning design. It fits the Japandi vibe of my home perfectly. Just make sure to follow the care instructions to keep the finish pristine.`
        }
    ];

    return (
        <section className="w-full py-16 lg:py-32 bg-surface-alt border-y border-surface-border">
            <div className="container-standard">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* LEFT: Rating Summary & Histogram */}
                    <div className="lg:col-span-4 flex flex-col pt-2">
                        <h2 className="text-display-md text-stone-900 font-serif mb-8">Customer Reviews</h2>

                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-[4rem] leading-none font-serif text-stone-900 tracking-tighter">
                                {averageRating}
                            </span>
                            <div className="flex flex-col pb-1">
                                <div className="flex gap-1 text-amber-500 mb-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-body-sm text-stone-500">Based on {totalReviews} reviews</span>
                            </div>
                        </div>

                        {/* Histogram */}
                        <div className="flex flex-col gap-3 mb-10">
                            {histogram.map((row) => (
                                <div key={row.stars} className="flex items-center gap-4 text-body-sm text-stone-600">
                                    <div className="flex items-center gap-1 w-[40px]">
                                        <span className="font-medium">{row.stars}</span>
                                        <Star className="w-3 h-3 text-stone-400 fill-current" />
                                    </div>
                                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-stone-800 rounded-full"
                                            style={{ width: `${row.percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-[30px] text-right text-stone-400">{row.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Review List */}
                    <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-12">
                        {mockReviews.map((review) => (
                            <div key={review.id} className="flex flex-col pb-8 lg:pb-12 border-b border-surface-border last:border-0 last:pb-0">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-body-md font-medium text-stone-900">{review.author}</span>
                                            {review.verified && (
                                                <span className="text-xs text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full font-medium">Verified Buyer</span>
                                            )}
                                        </div>
                                        <span className="text-body-sm text-stone-400">{review.date}</span>
                                    </div>
                                    <div className="flex gap-0.5 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-stone-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <h4 className="text-body-lg font-serif font-medium text-stone-900 mb-2">
                                    {review.title}
                                </h4>
                                <p className="text-body-md text-stone-600 leading-relaxed">
                                    {review.body}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

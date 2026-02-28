import type { DbProduct } from '@/lib/database/queries/products';

interface PDPCompleteTheLookProps {
    product: DbProduct;
}

export function PDPCompleteTheLook({ product }: PDPCompleteTheLookProps) {
    // Mock data for the carousel
    const relatedMock = [
        { name: 'Artisan Wooden Spoon', price: 24, img: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop' },
        { name: 'Linen Tea Towel Set', price: 38, img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=400&auto=format&fit=crop' },
        { name: 'Ceramic Pour-Over', price: 45, img: 'https://images.unsplash.com/photo-1551695535-ba4c95b6c38a?q=80&w=400&auto=format&fit=crop' },
        { name: 'Minimalist Timer', price: 30, img: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=400&auto=format&fit=crop' }
    ];

    return (
        <section className="w-full py-16 lg:py-24 border-y border-surface-border bg-stone-50 overflow-hidden">
            <div className="container-immersive">
                <div className="flex justify-between items-end mb-10 px-4 md:px-0">
                    <div>
                        <h2 className="text-display-md text-stone-900 font-serif mb-2">Complete the Look</h2>
                        <p className="text-body-md text-stone-500">Curated pairings to elevate your {product.sub_category_name}.</p>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 md:px-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {relatedMock.map((item, idx) => (
                        <div key={idx} className="shrink-0 snap-start w-[65vw] sm:w-[200px] md:w-[240px] group cursor-pointer">
                            {/* Product Card strictly 4:5 aspect ratio */}
                            <div className="w-full aspect-[4/5] relative rounded-xl overflow-hidden bg-stone-200 mb-4 shadow-sm">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-body-md font-medium text-stone-800 group-hover:text-amber-700 transition-colors">
                                    {item.name}
                                </h3>
                                <span className="text-body-md text-stone-900">${item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

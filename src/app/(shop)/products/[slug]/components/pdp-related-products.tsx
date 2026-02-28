import type { DbProduct } from '@/lib/database/queries/products';

interface PDPRelatedProductsProps {
    product: DbProduct;
}

export function PDPRelatedProducts({ product }: PDPRelatedProductsProps) {
    // Mock data for the carousel
    const relatedMock = [
        { name: 'Companion Plate Set', price: 65, img: 'https://images.unsplash.com/photo-1610486300466-993d0d62fa22?q=80&w=400&auto=format&fit=crop' },
        { name: 'Everyday Serving Bowl', price: 85, img: 'https://images.unsplash.com/photo-1578500244799-a56976ceb139?q=80&w=400&auto=format&fit=crop' },
        { name: 'Signature Tumblers', price: 40, img: 'https://images.unsplash.com/photo-1544413661-0f7301c9b253?q=80&w=400&auto=format&fit=crop' },
        { name: 'Organic Cotton Napkins', price: 28, img: 'https://images.unsplash.com/photo-1584837474249-1663f7d2f9d8?q=80&w=400&auto=format&fit=crop' }
    ];

    return (
        <section className="w-full py-16 lg:py-24 bg-surface-default overflow-hidden">
            <div className="container-immersive">
                <div className="flex justify-between items-end mb-10 px-4 md:px-0">
                    <div>
                        <h2 className="text-display-md text-stone-900 font-serif mb-2">You May Also Like</h2>
                        <p className="text-body-md text-stone-500">More from the {product.sub_category_name} collection.</p>
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

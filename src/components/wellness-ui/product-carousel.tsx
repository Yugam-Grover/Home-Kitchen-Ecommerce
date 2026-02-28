import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ProductCard, ProductCardProps } from '@/components/wellness-ui/product-card';
import { Button } from '@/components/wellness-ui/button';

export interface ProductCarouselProps {
    title: string;
    products: (ProductCardProps & { id: string })[];
    className?: string;
}

export function ProductCarousel({ title, products, className }: ProductCarouselProps) {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className={cn('py-12 space-y-8', className)}>
            <div className="container-standard flex items-center justify-between">
                <h2 className="text-heading-lg text-stone-900">{title}</h2>
                <div className="hidden md:flex gap-2">
                    <Button variant="secondary" size="icon" onClick={() => scroll('left')} aria-label="Scroll left">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={() => scroll('right')} aria-label="Scroll right">
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory px-4 md:px-0"
            >
                <div className="container-standard flex gap-6 items-stretch">
                    {products.map((product) => (
                        <div key={product.id} className="w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] flex-shrink-0 snap-center flex flex-col h-full">
                            <ProductCard {...product} className="flex-1 h-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

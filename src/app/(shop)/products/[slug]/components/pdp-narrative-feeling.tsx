import type { DbProduct } from '@/lib/database/queries/products';

interface PDPNarrativeFeelingProps {
    product: DbProduct;
    mode: 'precision' | 'restorative';
}

export function PDPNarrativeFeeling({ product, mode }: PDPNarrativeFeelingProps) {
    // Mock background image depending on mode
    const bgImage = mode === 'precision'
        ? 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2000&auto=format&fit=crop';

    return (
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-stone-900 bg-fixed bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />
            {/* Overlay to ensure text legibility */}
            <div className="absolute inset-0 bg-stone-900/40" />

            {/* Content */}
            <div className="container-standard relative z-10 text-center flex flex-col items-center">
                {mode === 'precision' ? (
                    <>
                        <span className="text-body-sm text-stone-300 font-mono uppercase tracking-[0.2em] mb-6">
                            04 : The Experience
                        </span>
                        <h2 className="text-display-xl text-white font-serif mb-8 max-w-4xl leading-[1.1]">
                            Uncompromising Performance in Every Detail.
                        </h2>
                        <p className="text-body-lg text-stone-200 max-w-2xl leading-relaxed">
                            Every curve and edge of the {product.name} has been calibrated for optimal efficiency. We removed the unnecessary so you can focus on what matters.
                        </p>
                    </>
                ) : (
                    <>
                        <span className="text-body-sm text-stone-200 uppercase tracking-widest mb-6 border-b border-stone-200/30 pb-2">
                            The Feeling
                        </span>
                        <h2 className="text-display-xl text-white font-serif mb-8 max-w-4xl leading-tight">
                            Create Space for What Matters.
                        </h2>
                        <p className="text-body-lg text-stone-100 max-w-2xl leading-loose font-light">
                            The {product.name} isn't just an object—it's an invitation to slow down. Designed to seamlessly integrate into your sanctuary and elevate your daily rituals.
                        </p>
                    </>
                )}
            </div>
        </section>
    );
}

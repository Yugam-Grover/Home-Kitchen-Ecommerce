import type { DbProduct } from '@/lib/database/queries/products';

interface PDPNarrativeFactProps {
    product: DbProduct;
    mode: 'precision' | 'restorative';
}

function BlueprintLayout({ product }: { product: DbProduct }) {
    const facts = product.material_details || [
        'Constructed from aerospace-grade aluminum',
        'Finished with a non-toxic ceramic coating',
        'Engineered for optimal heat distribution'
    ];

    return (
        <section className="w-full py-20 lg:py-32 bg-stone-50 border-t border-stone-200">
            <div className="container-standard">
                <h2 className="text-display-md text-stone-900 font-sans tracking-tight mb-16 uppercase">
                    Technical Specifications
                </h2>
                {/* 40/60 Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <div className="lg:col-span-5 w-full aspect-[4/5] bg-stone-900 relative shadow-md">
                        {/* High contrast monochromatic image representation */}
                        <img
                            src="https://images.unsplash.com/photo-1590725140246-200caaa5e4de?q=80&w=800&auto=format&fit=crop&grayscale=true"
                            alt="Blueprint"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 border border-stone-700 m-4 mix-blend-overlay"></div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col pt-8">
                        <div className="grid grid-cols-1 border-t border-stone-300">
                            {facts.map((fact, i) => (
                                <div key={i} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-6 border-b border-stone-300">
                                    <span className="text-sm font-mono text-stone-500 uppercase tracking-[0.1em]">
                                        0{i + 1}
                                    </span>
                                    <p className="text-body-md font-mono text-stone-900 lg:w-3/4 leading-relaxed">
                                        {fact}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BentoLayout({ product }: { product: DbProduct }) {
    const facts = product.material_details || [
        'Constructed from aerospace-grade aluminum',
        'Finished with a non-toxic ceramic coating',
        'Engineered for optimal heat distribution'
    ];

    return (
        <section className="w-full py-24 relative overflow-hidden z-0">
            {/* Subtle blurred radial gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-surface-warm),_var(--color-white))] -z-10" />

            <div className="container-standard">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="text-body-sm text-stone-500 uppercase tracking-widest mb-4 block">Material Truth</span>
                    <h2 className="text-display-lg text-stone-900 font-serif mb-6 leading-tight">
                        Crafted for <br />Your Sanctuary
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {facts.slice(0, 3).map((fact, i) => (
                        /* Floating bento boxes */
                        <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col gap-6 text-center items-center justify-center min-h-[280px]">
                            <div className="w-14 h-14 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 font-serif text-xl">
                                {i + 1}
                            </div>
                            <p className="text-body-lg text-stone-800 leading-relaxed font-light">
                                {fact}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PDPNarrativeFact({ product, mode }: PDPNarrativeFactProps) {
    return mode === 'precision' ? <BlueprintLayout product={product} /> : <BentoLayout product={product} />;
}

import { ChevronDown, Plus, Minus } from 'lucide-react';
import type { DbProduct } from '@/lib/database/queries/products';

interface PDPNarrativeProofProps {
    product: DbProduct;
    mode?: 'precision' | 'restorative';
}

function PrecisionFAQ({ faqs }: { faqs: any[] }) {
    return (
        <section className="w-full py-20 lg:py-32 bg-stone-50">
            <div className="container-narrow">
                <div className="mb-16">
                    <h2 className="text-display-md text-stone-900 font-sans tracking-tight mb-2 uppercase">FAQ</h2>
                    <p className="text-body-md font-mono text-stone-500 uppercase tracking-widest">Peace of Mind</p>
                </div>
                <div className="flex flex-col">
                    {faqs.map((faq, idx) => (
                        <details key={idx} className="group overflow-hidden">
                            <summary className="flex justify-between items-center py-6 text-body-lg font-mono font-medium text-stone-900 cursor-pointer list-none [&::-webkit-details-marker]:hidden border-b-2 border-stone-300 group-hover:border-stone-500 transition-colors">
                                {faq.question}
                                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                                    <Plus className="absolute w-5 h-5 text-stone-900 group-open:opacity-0 transition-opacity" />
                                    <Minus className="absolute w-5 h-5 text-stone-900 opacity-0 group-open:opacity-100 transition-opacity" />
                                </div>
                            </summary>
                            <div className="pt-6 pb-8 text-body-md font-mono text-stone-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RestorativeFAQ({ faqs }: { faqs: any[] }) {
    return (
        <section className="w-full py-24 bg-surface-warm">
            <div className="container-narrow">
                <div className="text-center mb-16">
                    <span className="text-body-sm text-sage-600 uppercase tracking-widest mb-4 block">Peace of Mind</span>
                    <h2 className="text-display-md text-stone-900 font-serif mb-6">Frequently Asked Questions</h2>
                </div>
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <details
                            key={idx}
                            className="group rounded-2xl bg-white shadow-sm hover:shadow transition-shadow overflow-hidden"
                        >
                            <summary className="flex justify-between items-center p-6 text-body-lg font-medium text-stone-800 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <ChevronDown className="w-5 h-5 text-stone-400 group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="px-6 pb-6 pt-2 text-body-md text-stone-600 leading-relaxed">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PDPNarrativeProof({ product, mode = 'restorative' }: PDPNarrativeProofProps) {
    const faqs = product.faq_data || [
        {
            question: 'How do I care for the surface?',
            answer: 'Wipe down with a damp cloth after each use. Avoid abrasive cleaners that might damage the proprietary finish.',
        },
        {
            question: 'Is it completely non-toxic?',
            answer: 'Yes. We rigorously test all materials to ensure zero off-gassing and complete safety for your home environment.',
        },
        {
            question: 'What is the return policy?',
            answer: 'You have 30 days to test it in your own space. If it doesn\'t bring you peace, return it for a full refund.',
        },
        {
            question: 'How does the self-sanitizing feature work?',
            answer: 'The exterior features a silver-ion integrated coating that actively breaks down bacteria upon contact.',
        }
    ];

    return mode === 'precision' ? <PrecisionFAQ faqs={faqs} /> : <RestorativeFAQ faqs={faqs} />;
}

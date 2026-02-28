import { Leaf, ShieldCheck, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';
import type { DbProduct } from '@/lib/database/queries/products';

interface PDPUspBarProps {
    product: DbProduct;
}

// Simple lookup to map string terms to Lucide icons
function getIconForBadge(badge: string) {
    const lower = badge.toLowerCase();
    if (lower.includes('organic') || lower.includes('eco') || lower.includes('sustainable')) return <Leaf className="w-5 h-5 text-sage-600" strokeWidth={1.5} />;
    if (lower.includes('warranty') || lower.includes('guarantee') || lower.includes('certified')) return <ShieldCheck className="w-5 h-5 text-sage-600" strokeWidth={1.5} />;
    if (lower.includes('clean') || lower.includes('sanitizing') || lower.includes('pure')) return <Sparkles className="w-5 h-5 text-sage-600" strokeWidth={1.5} />;
    if (lower.includes('wash') || lower.includes('water')) return <Droplets className="w-5 h-5 text-sage-600" strokeWidth={1.5} />;

    return <CheckCircle2 className="w-5 h-5 text-sage-600" strokeWidth={1.5} />;
}

export function PDPUspBar({ product }: PDPUspBarProps) {
    const badges = product.usp_badges || ['Premium Quality', 'Ethically Sourced', 'Timeless Design'];

    return (
        <section className="w-full border-y border-surface-border bg-surface-default py-6">
            <div className="container-standard">
                {/* Horizontal scroll container for mobile, flex wrap for desktop */}
                <div className="flex overflow-x-auto lg:flex-wrap items-center justify-start lg:justify-center gap-8 lg:gap-16 snap-x pb-2 lg:pb-0 scrollbar-hide">
                    {badges.map((badge, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 shrink-0 snap-start group"
                        >
                            <div className="p-2 bg-sage-50 rounded-full group-hover:bg-sage-100 transition-colors duration-300">
                                {getIconForBadge(badge)}
                            </div>
                            <span className="text-body-sm font-medium text-stone-700 tracking-wide uppercase">
                                {badge}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

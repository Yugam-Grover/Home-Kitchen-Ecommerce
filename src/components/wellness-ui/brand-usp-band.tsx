import { ShieldCheck, Layers, Droplets } from 'lucide-react';

export function BrandUspBand() {
    return (
        <section className="bg-sage-500 w-full py-16">
            <div className="container-narrow text-center">
                <h2 className="text-display-md mb-4 text-white">Self-Sanitizing Surfaces & Modular Multi-Taskers</h2>
                <p className="text-body-lg text-sage-100 mb-12">
                    Experience the calm of a home that cleans itself. Our restorative collection is designed to reduce decision fatigue and elevate your daily rituals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <ShieldCheck size={48} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                        <h3 className="text-heading-sm text-white">Antimicrobial</h3>
                        <p className="text-body-sm text-sage-100">Lab-tested surfaces that continuously neutralize bacteria.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Layers size={48} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                        <h3 className="text-heading-sm text-white">Modular Design</h3>
                        <p className="text-body-sm text-sage-100">Space-saving forms that seamlessly stack and nest.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Droplets size={48} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                        <h3 className="text-heading-sm text-white">Non-Toxic</h3>
                        <p className="text-body-sm text-sage-100">100% free of forever chemicals, BPA, and heavy metals.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

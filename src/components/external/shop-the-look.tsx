'use client';

import { useState } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/wellness-ui/button';

const hotspots = [
    { id: 1, x: 30, y: 50, name: 'Ceramic Serving Bowl', price: '$45' },
    { id: 2, x: 70, y: 40, name: 'Glass Storage Set', price: '$85' },
]

export function ShopTheLook() {
    const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

    return (
        <LazyMotion features={domAnimation}>
            <section className="container-standard py-24">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/3 flex flex-col justify-center">
                        <h2 className="text-display-md text-stone-900 mb-4">Shop The Look</h2>
                        <p className="text-body-lg text-stone-600 mb-8">
                            Curate your sanctuary with pieces that work together in perfect harmony. Our pieces are designed to elevate your everyday rituals.
                        </p>
                    </div>

                    <div className="w-full md:w-2/3 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-stone-200 shadow-sm">
                        {/* Background image placeholder */}
                        <div className="absolute inset-0 bg-sage-100 opacity-50 flex justify-center items-center">
                            <span className="text-sage-400 font-serif text-lg">Lifestyle Image</span>
                        </div>

                        {hotspots.map(spot => (
                            <div
                                key={spot.id}
                                className="absolute z-10"
                                style={{ top: `${spot.y}%`, left: `${spot.x}%`, transform: 'translate(-50%, -50%)' }}
                                onMouseEnter={() => setActiveHotspot(spot.id)}
                                onMouseLeave={() => setActiveHotspot(null)}
                            >
                                <button
                                    className="w-8 h-8 rounded-full bg-white shadow-md flex justify-center items-center text-stone-900 hover:scale-110 transition-transform relative cursor-pointer"
                                    aria-label={`View details for ${spot.name}`}
                                    onFocus={() => setActiveHotspot(spot.id)}
                                    onBlur={() => setActiveHotspot(null)}
                                >
                                    <Plus size={16} />
                                    <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-white"></span>
                                </button>

                                <AnimatePresence>
                                    {activeHotspot === spot.id && (
                                        <m.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                                            className="absolute top-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-4 w-48 z-20"
                                        >
                                            <div className="w-full aspect-square bg-stone-100 rounded-xl mb-3"></div>
                                            <div className="font-semibold text-stone-900 text-sm mb-1">{spot.name}</div>
                                            <div className="text-stone-500 text-xs mb-3">{spot.price}</div>
                                            <Button size="sm" className="w-full rounded-full focus-visible:ring-1 focus-visible:ring-sage-500">
                                                Add to Cart
                                            </Button>
                                        </m.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}

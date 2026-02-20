'use client';

import { useState } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/wellness-ui/button';

export function CareGuideModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <LazyMotion features={domAnimation}>
            <Button
                variant="ghost"
                size="sm"
                className="fixed left-6 bottom-6 z-40 bg-white shadow-md rounded-full px-4 border border-stone-200 text-stone-600 hover:text-sage-700 flex items-center gap-2 hover:bg-surface-warm backdrop-blur-sm bg-white/80"
                onClick={() => setIsOpen(true)}
            >
                <Info size={16} /> Product Care
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 w-screen h-screen">
                            <m.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                                className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 relative pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <h2 className="text-heading-lg font-serif mb-2 text-stone-900">Care Guide</h2>
                                <p className="text-body-sm text-stone-500 mb-6">How to maintain your self-sanitizing surfaces.</p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-heading-sm mb-1 text-stone-900">Everyday Cleaning</h3>
                                        <p className="text-body-sm text-stone-600">Use warm water and mild dish soap. Avoid abrasive sponges which can degrade the continuous antimicrobial coating.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-sm mb-1 text-stone-900">Stain Removal</h3>
                                        <p className="text-body-sm text-stone-600">For stubborn marks, combine baking soda and a few drops of water into a paste. Let sit for 10 minutes before wiping clean.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-heading-sm mb-1 text-stone-900">Dishwasher Safe</h3>
                                        <p className="text-body-sm text-stone-600">All modular containers are top-rack dishwasher safe. However, hand washing prolongs the lifespan of the seals.</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end">
                                    <Button variant="secondary" onClick={() => setIsOpen(false)}>Close Guide</Button>
                                </div>
                            </m.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}

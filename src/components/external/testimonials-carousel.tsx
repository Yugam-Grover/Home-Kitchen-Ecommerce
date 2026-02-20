'use client';

import { useState } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const mockTestimonials = [
    {
        id: 1,
        quote: "It leaves my kitchen looking pristine. The self-sanitizing feature is exactly what I've been waiting for.",
        author: "Craig H.",
        location: "Seattle, WA",
        rating: 5
    },
    {
        id: 2,
        quote: "A perfectly designed set. Reduces clutter and brings a sense of calm to my daily routine.",
        author: "Sarah M.",
        location: "Austin, TX",
        rating: 5
    },
    {
        id: 3,
        quote: "Beautiful, functional, and safe. I replaced all my plastics with their glass storage.",
        author: "Elena R.",
        location: "New York, NY",
        rating: 5
    }
];

export function TestimonialsCarousel() {
    const [current, setCurrent] = useState(0);



    return (
        <LazyMotion features={domAnimation}>
            <section className="bg-surface-warm w-full py-24 px-4 overflow-hidden relative">
                <div className="container-narrow text-center relative z-10 w-full max-w-[800px] mx-auto">

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary-100 opacity-50 z-0 pointer-events-none" style={{ fontSize: '180px', lineHeight: 1, fontFamily: 'serif' }}>
                        &ldquo;
                    </div>

                    <div className="min-h-[250px] relative z-20 flex flex-col items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={current}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ type: 'tween', ease: 'easeOut', duration: 0.8 }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className="flex text-amber-500 mb-6 gap-1">
                                    {Array(mockTestimonials[current].rating).fill(0).map((_, i) => (
                                        <Star key={i} size={20} fill="currentColor" className="text-amber-500" />
                                    ))}
                                </div>
                                <h3 className="text-heading-lg font-serif italic mb-6 max-w-2xl text-stone-900 leading-relaxed px-4">
                                    "{mockTestimonials[current].quote}"
                                </h3>
                                <div className="text-body-sm text-stone-600">
                                    <span className="font-bold text-stone-900">{mockTestimonials[current].author}</span> &bull; {mockTestimonials[current].location}
                                </div>
                            </m.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center items-center gap-6 mt-12 relative z-20">
                        <button
                            onClick={() => setCurrent(prev => (prev - 1 + mockTestimonials.length) % mockTestimonials.length)}
                            className="w-10 h-10 rounded-full border border-stone-300 hover:bg-white flex items-center justify-center transition-colors cursor-pointer bg-transparent"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} className="text-stone-600" />
                        </button>
                        <div className="flex gap-2">
                            {mockTestimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${idx === current ? 'bg-sage-600' : 'bg-sage-200'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrent(prev => (prev + 1) % mockTestimonials.length)}
                            className="w-10 h-10 rounded-full border border-stone-300 hover:bg-white flex items-center justify-center transition-colors cursor-pointer bg-transparent"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} className="text-stone-600" />
                        </button>
                    </div>

                </div>
            </section>
        </LazyMotion>
    );
}

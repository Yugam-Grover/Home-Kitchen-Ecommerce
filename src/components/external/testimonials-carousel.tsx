'use client';

import { useState } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

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
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndexChange = (dir: 'next' | 'prev') => {
        if (dir === 'next') setCurrentIndex(prev => prev + 1);
        else setCurrentIndex(prev => prev - 1);
    };

    // Render 5 slots to guarantee smooth continuous sliding on edges without unmount collision limits
    const slots = [-2, -1, 0, 1, 2];

    return (
        <LazyMotion features={domAnimation}>
            <section className="bg-surface-warm w-full py-16 overflow-hidden relative">
                <div className="container-standard relative z-10 w-full mx-auto flex flex-col items-center">

                    {/* Vertical Line & Heading */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-[1px] h-8 bg-sage-400 mb-6"></div>
                        <h2 className="text-display-sm font-serif text-stone-900 tracking-tight font-bold text-2xl">What our clients say</h2>
                    </div>

                    <div className="w-full flex items-center justify-center relative min-h-[320px]">
                        {/* Navigation Left */}
                        <button
                            onClick={() => handleIndexChange('prev')}
                            className="absolute left-0 lg:left-8 z-40 w-12 h-12 flex items-center justify-center text-stone-900 hover:text-sage-600 transition-colors bg-surface-warm/50 backdrop-blur-sm rounded-full md:bg-transparent cursor-pointer"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={32} strokeWidth={1.5} />
                        </button>

                        <div className="flex items-center justify-center w-full max-w-[1100px] relative h-full">
                            {slots.map((offset) => {
                                const index = currentIndex + offset;
                                const normalizedIndex = ((index % mockTestimonials.length) + mockTestimonials.length) % mockTestimonials.length;
                                const testimonial = mockTestimonials[normalizedIndex];
                                const isCenter = offset === 0;
                                const isVisible = Math.abs(offset) <= 1;

                                return (
                                    <m.div
                                        key={index}
                                        initial={{ x: `${offset * 110}%`, opacity: 0, scale: 0.8 }}
                                        animate={{
                                            x: `${offset * 110}%`,
                                            opacity: isCenter ? 1 : isVisible ? 0.4 : 0,
                                            scale: isCenter ? 1 : 0.85,
                                            zIndex: isCenter ? 30 : isVisible ? 10 : 0
                                        }}
                                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
                                        className={cn(
                                            "absolute top-1/2 -translate-y-1/2 w-[85vw] md:w-[480px] bg-white p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col items-center text-center",
                                            !isVisible && "pointer-events-none"
                                        )}
                                    >
                                        {/* Stars - visible mainly on center */}
                                        <m.div
                                            initial={false}
                                            animate={{ opacity: isCenter ? 1 : 0, height: isCenter ? 'auto' : 0, marginBottom: isCenter ? 24 : 0 }}
                                            className="flex text-sage-600 gap-1 overflow-hidden"
                                        >
                                            {Array(testimonial.rating).fill(0).map((_, i) => (
                                                <Star key={`star-${i}`} size={20} fill="currentColor" className="text-sage-600" />
                                            ))}
                                        </m.div>

                                        <blockquote className="text-body-md md:text-body-lg text-stone-900 mb-6 md:mb-8 leading-relaxed font-medium relative z-10" aria-live="polite">
                                            "{testimonial.quote}"
                                        </blockquote>

                                        <div className="text-caption font-bold text-stone-900 relative z-10 mt-auto">
                                            {testimonial.author} - <span className="font-normal text-stone-500">{testimonial.location}</span>
                                        </div>

                                        {/* Floating Quote Mark - Half Inside, Half Outside per mockup */}
                                        <m.div
                                            initial={false}
                                            animate={{ opacity: isCenter ? 1 : 0, scale: isCenter ? 1 : 0.5 }}
                                            className="absolute bottom-0 right-10 translate-y-[60%] text-[100px] md:text-[140px] leading-[0.5] pt-12 text-sage-600 font-serif z-30 select-none drop-shadow-sm flex items-center justify-center pointer-events-none"
                                        >
                                            &rdquo;
                                        </m.div>
                                    </m.div>
                                );
                            })}
                        </div>

                        {/* Navigation Right */}
                        <button
                            onClick={() => handleIndexChange('next')}
                            className="absolute right-0 lg:right-8 z-40 w-12 h-12 flex items-center justify-center text-stone-900 hover:text-sage-600 transition-colors bg-surface-warm/50 backdrop-blur-sm rounded-full md:bg-transparent cursor-pointer"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={32} strokeWidth={1.5} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mt-8">
                        <div className="w-[1px] h-8 bg-sage-400"></div>
                    </div>

                </div>
            </section>
        </LazyMotion>
    );
}

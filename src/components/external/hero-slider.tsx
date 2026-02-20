'use client';

import { useState, useEffect } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/wellness-ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        image: '/assets/illustrations/placeholder-transparent.svg',
        titlePart1: 'Restorative',
        titlePart2: 'Sanctuary',
        description: 'Design isn’t just about aesthetics; it tells your story through style, function, and personality.',
        productName: 'Ceramic Essential Pan',
        productSub: 'Multi-Tasking Cookware'
    },
    {
        id: 2,
        image: '/assets/illustrations/placeholder-transparent.svg',
        titlePart1: 'Organic',
        titlePart2: 'Modern',
        description: 'Discover meticulously curated collections designed to reduce decision fatigue and bring lasting calm to your daily routines.',
        productName: 'Glass Storage Set',
        productSub: 'Stackable Organization'
    }
];

export function HeroSkeleton() {
    return (
        <section className="bg-surface-default w-full min-h-[90vh] pb-12 relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-[8%] lg:top-[12%] left-0 right-0 z-0 pointer-events-none flex justify-center w-full px-4 text-center">
                <div className="h-[10vw] w-3/4 bg-stone-200/50 rounded-full animate-pulse mx-auto"></div>
            </div>

            <div className="container-immersive grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10 w-full h-full items-center mt-12 lg:mt-24">
                <div className="lg:col-span-3 flex flex-col justify-center lg:justify-end h-full gap-8 lg:gap-16 order-2 lg:order-1 pt-12 lg:pt-32">
                    <div className="flex flex-col gap-6">
                        <div className="h-20 w-full bg-stone-200/50 rounded-xl animate-pulse"></div>
                        <div className="h-14 w-40 bg-stone-200/50 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-[260px] h-[160px] bg-white rounded-3xl shadow-sm animate-pulse hidden lg:block"></div>
                </div>

                <div className="lg:col-span-6 flex justify-center items-center h-[30vh] lg:h-[50vh] relative z-20 order-1 lg:order-2">
                    <div className="w-64 h-64 lg:w-[400px] lg:h-[400px] rounded-full bg-stone-200/60 animate-pulse"></div>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-end lg:items-end h-full gap-8 order-3 lg:order-3 pt-12 lg:pt-32">
                    <div className="lg:text-right w-full flex flex-col lg:items-end hidden lg:flex">
                        <div className="h-10 w-48 bg-stone-200/50 rounded-lg animate-pulse mb-3"></div>
                        <div className="h-6 w-32 bg-stone-200/50 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="w-full lg:w-48 xl:w-64 aspect-[4/3] bg-white/50 rounded-3xl animate-pulse hidden lg:block"></div>
                    <div className="flex gap-4 p-2 justify-center lg:justify-end w-full">
                        <div className="w-14 h-14 rounded-full bg-stone-200/50 animate-pulse"></div>
                        <div className="w-14 h-14 rounded-full bg-stone-200/50 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    // Spring configuration targeting user's request for "tactile and organic" motion
    const springTransition = {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1
    };

    return (
        <LazyMotion features={domAnimation}>
            <section className="bg-surface-default w-full min-h-[90vh] relative flex items-center justify-center overflow-hidden pt-20 pb-12">

                {/* Giant Background Title */}
                <div className="absolute top-[8%] lg:top-[12%] left-0 right-0 z-0 pointer-events-none flex justify-center w-full px-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <m.h1
                            key={current}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -30 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="text-[10vw] lg:text-[9vw] font-serif leading-none text-stone-900 tracking-tighter whitespace-nowrap opacity-[0.85]"
                        >
                            {slides[current].titlePart1} <span className="text-sage-500">{slides[current].titlePart2}</span>
                        </m.h1>
                    </AnimatePresence>
                </div>

                <div className="container-immersive grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 w-full h-full items-center mt-12 lg:mt-24">

                    {/* Left Column: Subtext, Button, Social Proof */}
                    <div className="lg:col-span-3 flex flex-col justify-center lg:justify-end h-full gap-12 lg:gap-16 order-2 lg:order-1 pt-12 lg:pt-40 lg:pb-8">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={current}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                                className="flex flex-col gap-8"
                            >
                                <p className="text-body-lg text-stone-600 leading-relaxed font-medium max-w-sm">
                                    {slides[current].description}
                                </p>
                                <div>
                                    <Button size="lg" className="rounded-full px-10 bg-amber-500 hover:bg-amber-600 text-white shadow-lg border-0 transition-transform hover:scale-105 py-6 text-md focus:ring-amber-500">
                                        Shop Now
                                    </Button>
                                </div>
                            </m.div>
                        </AnimatePresence>

                        <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-100 max-w-[260px] hidden lg:block relative z-30">
                            <div className="flex -space-x-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-sage-200 border-[3px] border-white relative object-cover">
                                    {/* Using empty colors to simulate profile pics */}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-sage-300 border-[3px] border-white relative z-10"></div>
                                <div className="w-12 h-12 rounded-full bg-sage-400 border-[3px] border-white relative z-20"></div>
                                <div className="w-12 h-12 rounded-full bg-stone-900 border-[3px] border-white relative z-30 flex justify-center items-center text-xs font-bold text-white tracking-tighter hover:scale-110 transition-transform cursor-pointer">
                                    +
                                </div>
                            </div>
                            <div className="flex text-amber-500 mb-2 gap-1">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <div className="text-heading-md text-stone-900 leading-none mb-1 font-bold">12k+</div>
                            <div className="text-caption text-stone-500 font-medium">Satisfied Customers</div>
                        </div>
                    </div>

                    {/* Center Column: Huge Product Image */}
                    <div className="lg:col-span-6 flex justify-center items-center h-[35vh] lg:h-[65vh] relative z-20 pointer-events-none order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={current}
                                initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, y: -50, rotate: 5 }}
                                transition={springTransition}
                                className="w-full h-full relative xl:scale-125"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={slides[current].image} alt="" className="w-full h-full object-contain pointer-events-auto filter drop-shadow-[0_45px_30px_rgba(28,43,30,0.15)] hover:scale-[1.03] hover:-translate-y-2 transition-transform duration-500" />
                            </m.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Next Product Info & Navigation */}
                    <div className="lg:col-span-3 flex flex-col justify-end lg:items-end h-full gap-8 order-3 lg:order-3 pt-12 lg:pt-40 lg:pb-8">

                        <AnimatePresence mode="wait">
                            <m.div
                                key={current}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                                className="text-right hidden lg:block"
                            >
                                <h3 className="text-heading-md text-stone-900 leading-tight mb-2 tracking-tight">{slides[current].productName}</h3>
                                <p className="text-body-sm text-stone-500">{slides[current].productSub}</p>
                            </m.div>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <m.div
                                key={current}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="hidden lg:flex w-48 xl:w-56 aspect-square bg-white/40 rounded-[2rem] p-6 shadow-sm backdrop-blur-md justify-center items-center cursor-pointer hover:bg-white/80 transition-all border border-white relative z-30"
                                onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={slides[(current + 1) % slides.length].image} alt="" className="w-full h-full object-contain filter drop-shadow-lg opacity-90 transition-transform hover:scale-110" />
                            </m.div>
                        </AnimatePresence>

                        <div className="flex gap-4 p-2 justify-center lg:justify-end w-full">
                            <button
                                onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
                                className="w-14 h-14 rounded-full border-2 border-stone-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white flex items-center justify-center transition-all bg-transparent text-stone-900"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft size={24} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
                                className="w-14 h-14 rounded-full border-2 border-stone-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white flex items-center justify-center transition-all bg-transparent text-stone-900"
                                aria-label="Next slide"
                            >
                                <ChevronRight size={24} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
}

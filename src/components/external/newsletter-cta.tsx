'use client';

import { useState } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Check } from 'lucide-react';

export function NewsletterCta() {
    const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');

    return (
        <LazyMotion features={domAnimation}>
            {/* Using container-immersive and w-full to let elements breathe and use the browser window efficiently */}
            <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 py-24 object-contain">
                {/* manually added max-h-[500px] below*/}
                <div className="bg-stone-900 rounded-[2.5rem] max-h-[500px] overflow-hidden relative flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-stone-800">

                    {/* Abstract background swoosh behind the illustration */}
                    <div className="absolute right-0 top-0 bottom-0 w-[60%] bg-stone-800/40 rounded-l-[15rem] hidden lg:block pointer-events-none" />

                    {/* Left side: Content & Form */}
                    <div className="w-full lg:w-[45%] p-10 md:p-16 lg:px-24 flex flex-col justify-center relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex max-w-max items-center justify-center px-5 py-2 rounded-full bg-white/10 text-white text-xs tracking-[0.15em] uppercase font-bold mb-8 md:mb-10 backdrop-blur-sm"
                        >
                            The Journal
                        </m.div>

                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-display-sm xl:text-display-md text-white font-serif leading-[1.1] mb-12 tracking-tight"
                        >
                            Subscribe to our newsletter to receive restorative insights.
                        </m.h2>

                        <m.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full max-w-lg flex flex-col sm:flex-row bg-white/5 sm:bg-white p-2 rounded-2xl mb-8 shadow-sm backdrop-blur-md sm:backdrop-blur-none border border-white/10 sm:border-none"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Write your email"
                                className="w-full bg-white sm:bg-transparent border-none outline-none text-stone-900 placeholder:text-stone-500 font-medium px-6 py-4 sm:py-0 rounded-xl sm:rounded-none mb-2 sm:mb-0 text-body-md"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-sage-600 hover:bg-sage-700 text-white px-10 py-4 sm:py-3.5 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </m.form>

                        <m.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-8 pl-2"
                        >
                            <button
                                type="button"
                                className="flex items-center gap-3 cursor-pointer group bg-transparent border-none p-0 m-0"
                                onClick={() => setFrequency('weekly')}
                            >
                                <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center transition-colors group-hover:bg-white/10">
                                    <div className={`w-3 h-3 rounded-full transition-colors ${frequency === 'weekly' ? 'bg-sage-400' : 'bg-transparent'}`} />
                                </div>
                                <span className="text-white/80 text-sm font-medium tracking-wide">Weekly</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center gap-3 cursor-pointer group bg-transparent border-none p-0 m-0"
                                onClick={() => setFrequency('monthly')}
                            >
                                <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center transition-colors group-hover:bg-white/10">
                                    <div className={`w-3 h-3 rounded-full transition-colors ${frequency === 'monthly' ? 'bg-sage-400' : 'bg-transparent'}`} />
                                </div>
                                <span className="text-white/80 text-sm font-medium tracking-wide">Monthly</span>
                            </button>
                        </m.div>
                    </div>

                    {/* Right side: Elegant Abstract Japandi Illustration */}
                    <div className="w-full lg:w-[55%] min-h-[400px] lg:min-h-[550px] relative flex justify-center items-center p-4 lg:p-12 overflow-hidden bg-stone-800/40 lg:bg-transparent border-t lg:border-t-0 lg:border-l border-white/10 mt-12 lg:mt-0">
                        <m.div
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full max-w-[600px] aspect-[4/3] lg:aspect-auto relative z-10 pointer-events-none"
                        >
                            {/* Hand-coded Abstract Japandi Scene */}
                            <svg width="100%" height="70%" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
                                        <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000" floodOpacity="0.25" />
                                    </filter>
                                    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                                        <stop offset="0%" stopColor="#F2F0EA" />
                                        <stop offset="70%" stopColor="#D6D3D1" />
                                        <stop offset="100%" stopColor="#A8A29E" />
                                    </radialGradient>
                                    <linearGradient id="sageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#A3B19B" />
                                        <stop offset="100%" stopColor="#3E4E42" />
                                    </linearGradient>
                                    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#F59E0B" />
                                        <stop offset="100%" stopColor="#B45309" />
                                    </linearGradient>
                                </defs>

                                {/* Deep Architectural Arch backdrop */}
                                <path d="M 120 500 L 120 220 A 130 130 0 0 1 380 220 L 380 500 Z" fill="url(#sageGrad)" opacity="0.9" />

                                {/* Inner Arch Detail */}
                                <path d="M 140 500 L 140 230 A 110 110 0 0 1 360 230 L 360 500 Z" fill="#6F8366" opacity="0.3" />

                                {/* Luminous Amber Sun / Moon accent */}
                                <circle cx="340" cy="160" r="70" fill="url(#amberGrad)" opacity="0.95" />

                                {/* Structural Block/Pedestal */}
                                <rect x="180" y="320" width="140" height="180" fill="#F2F0EA" filter="url(#softShadow)" />
                                <rect x="180" y="320" width="20" height="180" fill="#FFFFFF" opacity="0.8" />
                                <rect x="300" y="320" width="20" height="180" fill="#D6D3D1" opacity="0.8" />

                                {/* Flawless Minimalist Sphere sitting on block */}
                                <circle cx="250" cy="245" r="75" fill="url(#sphereGrad)" filter="url(#softShadow)" />

                                {/* Botanical / Zen branch line art elegantly sweeping across */}
                                <path d="M 330 480 Q 220 250 420 100" stroke="#F2F0EA" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" filter="url(#softShadow)" />

                                {/* Botanical Leaves */}
                                <path d="M 420 100 Q 435 90 415 120 Q 395 130 420 100 Z" fill="#F2F0EA" />
                                <path d="M 370 170 Q 400 150 370 200 Q 340 210 370 170 Z" fill="#F2F0EA" />
                                <path d="M 290 280 Q 320 250 280 310 Q 250 320 290 280 Z" fill="#F2F0EA" />

                                {/* Foreground dark abstract organic pebble (grounding element) */}
                                <path d="M 270 470 C 290 430 410 410 450 460 C 470 490 320 530 270 470 Z" fill="#1C1917" opacity="0.6" />
                            </svg>
                        </m.div>
                    </div>

                </div>
            </section>
        </LazyMotion>
    );
}

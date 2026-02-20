'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m, LazyMotion, domAnimation, useMotionValue } from 'framer-motion';

export function Carousel({ children, gap = 24, itemWidth = 300 }: { children: React.ReactNode, gap?: number, itemWidth?: number }) {
    const [carouselWidth, setCarouselWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    useEffect(() => {
        if (carouselRef.current) {
            setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, [children]);

    return (
        <LazyMotion features={domAnimation}>
            <div className="relative overflow-hidden w-full cursor-grab active:cursor-grabbing pb-8" ref={carouselRef}>
                <m.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -carouselWidth }}
                    style={{ x }}
                    className="flex"
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.8 }}
                >
                    {React.Children.map(children, (child, idx) => (
                        <div
                            key={idx}
                            style={{ minWidth: itemWidth, marginRight: gap }}
                        >
                            {child}
                        </div>
                    ))}
                </m.div>
            </div>
        </LazyMotion>
    );
}

'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

/**
 * LazyMount delays the rendering of its children until it intersects
 * with the viewport (or is close to it). 
 * This drastically improves initial page load (LCP/INP) by deferring 
 * heavy Client Components (like Framer Motion sliders below the fold).
 */
export function LazyMount({ children, fallback, rootMargin = '300px' }: { children: ReactNode, fallback: ReactNode, rootMargin?: string }) {
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
                observer.disconnect();
            }
        }, { rootMargin });

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref} className="w-full">
            {isIntersecting ? children : fallback}
        </div>
    );
}

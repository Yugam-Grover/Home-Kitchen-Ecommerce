'use client';

import * as React from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useRouter } from 'next/navigation';

export interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock data for autocomplete
const RECENT_SEARCHES = ['Ceramic Pan', 'Glass Containers', 'Dinnerware Set'];
const TRENDING_CATEGORIES = [
    { label: 'Cookware Sets', href: '/collections/cookware/sets' },
    { label: 'Tableware', href: '/collections/tableware' },
    { label: 'Pantry Organization', href: '/collections/kitchen-essentials/storage' },
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Escape key listener & auto-focus
    React.useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);

            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';

            return () => {
                clearTimeout(timer);
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = 'auto';
            };
        }
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Simulated search navigation
            router.push(`/products?q=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                        {/* Backdrop */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute inset-0 bg-surface-white/85 backdrop-blur-sm"
                            onClick={onClose}
                        />

                        {/* Modal Content */}
                        <m.div
                            initial={{ opacity: 0, scale: 0.98, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }} // Faster unhurried curve
                            className="relative w-full max-w-3xl flex flex-col items-center z-10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-0 -top-12 p-2 text-stone-500 hover:text-stone-900 transition-colors bg-white rounded-full shadow-sm hover:shadow-md"
                                aria-label="Close search"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>

                            {/* Search Input Box */}
                            <form onSubmit={handleSubmit} className="w-full relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-sage-500 group-focus-within:text-sage-700 transition-colors">
                                    <Search size={28} strokeWidth={1.5} />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for restorative essentials..."
                                    className="w-full h-20 pl-16 pr-8 text-2xl font-serif text-stone-900 bg-white rounded-full border border-stone-200 outline-none shadow-sm focus:border-sage-300 focus:shadow-md transition-all placeholder:text-stone-300"
                                />
                                {query.length > 0 && (
                                    <div className="absolute inset-y-0 right-6 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setQuery('')}
                                            className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                                        >
                                            <X size={20} strokeWidth={2} />
                                        </button>
                                    </div>
                                )}
                            </form>

                            {/* Suggestions Drawer */}
                            <div className="w-[95%] bg-white rounded-3xl mt-4 shadow-xl border border-stone-100 overflow-hidden text-left p-8">

                                {query.length > 2 ? (
                                    // Simulation of Fuzzy Matching state
                                    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                                        <div className="text-body-md text-stone-600">
                                            Showing results for <span className="font-bold text-stone-900">{query}</span>...{' '}
                                            <span className="text-stone-400 italic">Search instead for "{query}s"?</span>
                                        </div>
                                        <div className="w-full h-[1px] bg-stone-100" />
                                        <button
                                            className="text-left py-2 px-4 -mx-4 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-3 group"
                                            onClick={() => {
                                                router.push(`/products?q=${encodeURIComponent(query)}`);
                                                onClose();
                                            }}
                                        >
                                            <Search size={18} className="text-stone-400 group-hover:text-amber-500 transition-colors" />
                                            <span className="text-heading-sm text-stone-900 group-hover:text-amber-600 transition-colors">See all products for "{query}"</span>
                                        </button>
                                    </div>
                                ) : (
                                    // Default Discovery State
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-300">

                                        {/* Recent Searches */}
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400 flex items-center gap-2">
                                                <Clock size={14} />
                                                Recent Searches
                                            </h3>
                                            <ul className="flex flex-col gap-2">
                                                {RECENT_SEARCHES.map((item) => (
                                                    <li key={item}>
                                                        <button
                                                            className="text-body-lg text-stone-700 hover:text-amber-600 transition-colors py-2 text-left w-full hover:translate-x-1"
                                                            onClick={() => {
                                                                setQuery(item);
                                                                // simulate search
                                                                setTimeout(() => onClose(), 300);
                                                            }}
                                                        >
                                                            {item}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Trending Categories */}
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-sage-500 flex items-center gap-2">
                                                <TrendingUp size={14} />
                                                Trending Categories
                                            </h3>
                                            <ul className="flex flex-col gap-2">
                                                {TRENDING_CATEGORIES.map((cat) => (
                                                    <li key={cat.label}>
                                                        <button
                                                            className="text-body-lg text-stone-700 hover:text-amber-600 transition-colors py-2 text-left w-full hover:translate-x-1"
                                                            onClick={() => {
                                                                router.push(cat.href);
                                                                onClose();
                                                            }}
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </m.div>

                    </div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}

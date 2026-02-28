'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/wellness-ui/button';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { SearchOverlay } from '@/components/external/search-overlay';
import { navigationConfig } from '@/config/navigation';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    // Handle scroll for glassmorphism effect
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get active category data from JSON config mapping
    const activeCategoryData = React.useMemo(() => {
        return navigationConfig.find(cat => cat.label === activeDropdown);
    }, [activeDropdown]);

    return (
        <LazyMotion features={domAnimation}>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    'h-[60px] md:h-[72px] flex items-center',
                    isScrolled || activeDropdown || isSearchOpen
                        ? 'bg-surface-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm'
                        : 'bg-transparent border-b border-transparent'
                )}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <div className="container-standard flex w-full h-full items-center justify-between">
                    <Link href="/" className="relative z-50 flex items-center h-[56px] md:h-[64px] mr-12 py-1">
                        <Image
                            src="/assets/brand/logo-navbar-v2.png"
                            alt="Nestora Logo"
                            width={386}
                            height={101}
                            className="h-full w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Center Zone: State-Driven Commerce Links */}
                    <div className="hidden lg:flex items-center justify-center flex-1 h-full gap-8">
                        {navigationConfig.map((category) => (
                            <div
                                key={category.label}
                                className="h-full flex items-center relative"
                                onMouseEnter={() => setActiveDropdown(category.label)}
                            >
                                <Link
                                    href={category.href}
                                    className={cn(
                                        "flex items-center text-sm font-medium transition-colors h-full px-2 uppercase tracking-widest",
                                        activeDropdown === category.label ? "text-amber-700" : "text-stone-600 hover:text-amber-600"
                                    )}
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    {category.label}
                                </Link>

                                {/* Hover Indicator Line */}
                                {activeDropdown === category.label && (
                                    <m.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Zone: Icons */}
                    <div className="flex items-center gap-2 md:gap-4 h-full ml-auto">
                        <button
                            className="p-2 text-stone-600 hover:text-amber-600 transition-colors"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Open search"
                            aria-expanded={isSearchOpen}
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        <Link
                            href="/account"
                            className="p-2 text-stone-600 hover:text-amber-600 transition-colors hidden sm:block"
                            aria-label="Account"
                        >
                            <User className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/cart"
                            className="p-2 text-stone-600 hover:text-amber-600 transition-colors relative"
                            aria-label="Cart"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow-sm shadow-amber-900/20">
                                0
                            </span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-stone-600 relative z-50 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* State-Driven Mega Menu */}
                {/* 
                    Absolute positioned full-width bar attached directly to the bottom of the nav.
                    Prevents all layout shifts (CLS) on the page below.
                */}
                <AnimatePresence>
                    {activeDropdown && activeCategoryData && (
                        <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="absolute top-full left-0 w-full bg-surface-white border-b border-stone-200 shadow-xl shadow-stone-900/5 overscroll-contain"
                        >
                            {/* Mega Nav Inner Grid */}
                            <div className="container-standard flex h-[480px]">

                                {/* 30% Image Zone (Lifestyle Narrative) */}
                                <div className="w-[30%] h-full relative p-8 group overflow-hidden">
                                    <div className="absolute inset-8 rounded-xl overflow-hidden shadow-md">
                                        <Image
                                            src={activeCategoryData.featuredImage.src}
                                            alt={activeCategoryData.featuredImage.alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                            sizes="400px"
                                        />
                                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />

                                        {/* Overlay Callout */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <Button variant="secondary" className="w-full justify-between bg-white/90 backdrop-blur-sm border-none shadow-lg group-hover:bg-amber-600 group-hover:text-white hover:!bg-amber-700 hover:!text-white transition-all">
                                                <span>Shop the Look</span>
                                                <ChevronRight size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* 70% Listicle Zone (Sub-Categories) */}
                                <div className="w-[70%] h-full p-12 pr-0 flex gap-12 border-l border-stone-100">

                                    {/* Map through JSON category groups */}
                                    <div className="flex-1 grid grid-cols-2 gap-12">
                                        {activeCategoryData.groups.map((group) => (
                                            <div key={group.title} className="flex flex-col">
                                                <h3 className="text-body-lg font-bold text-stone-900 mb-2">{group.title}</h3>
                                                <p className="text-body-sm text-stone-500 mb-6 font-medium bg-stone-50/50 -ml-3 p-3 rounded-lg">{group.description}</p>

                                                <ul className="space-y-4 flex-1">
                                                    {group.items.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                className="text-body-md text-stone-600 hover:text-amber-700 font-medium flex items-center group/link transition-colors"
                                                                onClick={() => setActiveDropdown(null)}
                                                            >
                                                                {item.name}
                                                                <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all text-amber-500 ml-1" />
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <Link
                                                    href={group.viewAllHref}
                                                    className="inline-flex items-center text-body-sm font-bold text-sage-600 hover:text-sage-800 transition-colors mt-6 uppercase tracking-wider"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    View All {group.title}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Featured Column (Optional 3rd Column) */}
                                    {activeCategoryData.featured && (
                                        <div className="w-[200px] flex flex-col pt-2 border-l border-stone-100 pl-8 bg-gradient-to-b from-stone-50/50 to-transparent -my-12 py-12">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
                                                {activeCategoryData.featured.title}
                                            </h4>
                                            <ul className="space-y-4">
                                                {activeCategoryData.featured.items.map(item => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className="text-body-sm text-stone-800 hover:text-amber-600 flex items-center gap-2 group/spotlight"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-200 group-hover/spotlight:bg-amber-500 transition-colors" />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                </div>

                            </div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* Mobile Navigation Mesh Overlay */}
                <div
                    id="mobile-menu"
                    className={cn(
                        'fixed inset-0 z-40 bg-surface-white transition-opacity duration-300 ease-in-out lg:hidden',
                        isMenuOpen ? 'opacity-100 pointer-events-auto block' : 'opacity-0 pointer-events-none hidden'
                    )}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 overflow-y-auto">
                        {navigationConfig.map((category) => (
                            <Link
                                key={category.label}
                                href={category.href}
                                className="text-2xl font-serif font-medium text-stone-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {category.label}
                            </Link>
                        ))}
                        <div className="pt-8 w-full max-w-xs space-y-4">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 border-amber-600 text-white" variant="primary">Shop All Collections</Button>
                            <Button className="w-full border-stone-200" variant="secondary">My Account</Button>
                        </div>
                    </div>
                </div>
            </nav>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </LazyMotion>
    );
}

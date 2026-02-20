'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/wellness-ui/button';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    // Handle scroll for glassmorphism effect
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                'h-[60px] md:h-[72px] flex items-center',
                isScrolled
                    ? 'bg-surface-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm'
                    : 'bg-transparent border-b border-transparent'
            )}
        >
            <div className="container-standard flex w-full items-center justify-between">
                {/* Left Zone: Logo */}
                <Link href="/" className="relative z-50">
                    <span className="font-serif text-2xl font-bold tracking-tight text-primary-900">
                        ANTIGRAVITY
                    </span>
                </Link>

                {/* Center Zone: Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-stone-600 hover:text-primary-500 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Zone: Icons */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        className="p-2 text-stone-600 hover:text-primary-500 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    <Link
                        href="/account"
                        className="p-2 text-stone-600 hover:text-primary-500 transition-colors"
                        aria-label="Account"
                    >
                        <User className="h-5 w-5" />
                    </Link>

                    <Link
                        href="/cart"
                        className="p-2 text-stone-600 hover:text-primary-500 transition-colors relative"
                        aria-label="Cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">
                            0
                        </span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-stone-600 relative z-50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Mesh Overlay */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-surface-white transition-opacity duration-300 ease-in-out md:hidden',
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-2xl font-serif font-medium text-primary-900"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-8 w-full max-w-xs space-y-4">
                        <Button className="w-full" variant="primary">Shop All</Button>
                        <Button className="w-full" variant="secondary">My Account</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

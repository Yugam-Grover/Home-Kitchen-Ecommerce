'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/wellness-ui/button';
import { Input } from '@/components/wellness-ui/input';

export function Footer() {
    const [currentYear, setCurrentYear] = React.useState('');

    React.useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);
    return (
        <footer className="bg-stone-900 text-stone-200 pt-16 pb-8">
            <div className="container-standard w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="space-y-6 ">
                        <Image
                            src="/assets/brand/logo-footer-v2.png"
                            alt="Nestora Logo"
                            width={386}
                            height={101}
                            className="h-[56px] md:h-[64px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
                            Organic Modernist home solutions for a restorative, safe, and minimalist lifestyle. Handcrafted excellence in every detail.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full border border-stone-800 hover:border-stone-600 transition-colors" aria-label="Instagram">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full border border-stone-800 hover:border-stone-600 transition-colors" aria-label="Facebook">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full border border-stone-800 hover:border-stone-600 transition-colors" aria-label="Twitter">
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Quick Links</h3>
                        <ul className="space-y-4 text-sm text-stone-400">
                            <li><Link href="/products" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Process</Link></li>
                            <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Customer Service</h3>
                        <ul className="space-y-4 text-sm text-stone-400">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Join Our Inner Circle</h3>
                        <p className="text-sm text-stone-400">
                            Unlock 10% off your first order and stay updated on new collections.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border-stone-700 text-white placeholder:text-stone-600"
                                startIcon={<Mail className="h-4 w-4" />}
                            />
                            <Button className="w-full" variant="accent">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-500">
                        &copy; {currentYear} Home & Kitchen Platform. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {/* Placeholder for payment icons */}
                        <div className="flex items-center gap-4 opacity-50 grayscale border border-stone-800 p-2 px-3 rounded-lg">
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Visa</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Mastercard</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">PayPal</span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Apple Pay</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

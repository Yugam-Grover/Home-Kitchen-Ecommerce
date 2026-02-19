import Link from 'next/link';
import { Button } from './button';
import { Input } from './input';

export function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-400">
            <div className="container-standard py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <span className="font-serif text-2xl font-bold text-stone-50">VIBE.</span>
                        <p className="max-w-xs text-sm leading-relaxed">
                            Restorative essentials for the modern home. Sustainable, safe, and designed for calm.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-stone-50">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop/all" className="hover:text-stone-50 transition-colors">All Products</Link></li>
                            <li><Link href="/shop/new" className="hover:text-stone-50 transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop/bestsellers" className="hover:text-stone-50 transition-colors">Bestsellers</Link></li>
                            <li><Link href="/membership" className="hover:text-stone-50 transition-colors">Membership</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-stone-50">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/help" className="hover:text-stone-50 transition-colors">Help Center</Link></li>
                            <li><Link href="/returns" className="hover:text-stone-50 transition-colors">Returns</Link></li>
                            <li><Link href="/shipping" className="hover:text-stone-50 transition-colors">Shipping Info</Link></li>
                            <li><Link href="/contact" className="hover:text-stone-50 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-stone-50">Stay Connected</h4>
                        <p className="text-sm">Join our newsletter for early access and wellness tips.</p>
                        <div className="flex flex-col gap-2">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500 focus:border-sage-500"
                            />
                            <Button variant="white" className="w-full">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} Vibe Home & Kitchen. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-stone-50">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-stone-50">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

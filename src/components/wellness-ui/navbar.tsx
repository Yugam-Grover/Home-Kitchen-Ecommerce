
import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';

export function Navbar({ cartCount = 0 }: { cartCount?: number }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-stone-100">
            <div className="container-standard h-20 flex items-center justify-between px-6">
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                    VIBE.
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/shop" className="text-sm font-medium hover:text-sage-600 transition-colors">
                        Shop
                    </Link>
                    <Link href="/collections" className="text-sm font-medium hover:text-sage-600 transition-colors">
                        Collections
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-sage-600 transition-colors">
                        About
                    </Link>
                    <Link href="/journal" className="text-sm font-medium hover:text-sage-600 transition-colors">
                        Journal
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <User className="w-5 h-5" />
                    </button>
                    <button className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-sage-500 text-white text-[10px] grid place-items-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}

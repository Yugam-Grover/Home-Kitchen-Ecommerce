'use client';

import { Button } from '@/components/wellness-ui/button';
import { Input } from '@/components/wellness-ui/input';

export function NewsletterCta() {
    return (
        <section className="container-standard py-24">
            <div className="rounded-3xl bg-sage-500 p-8 md:p-12 overflow-hidden relative shadow-lg">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-sage-500 to-sage-700 opacity-90" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 w-full">
                    <div className="flex flex-col justify-center text-white">
                        <h2 className="text-display-md mb-4 text-white">Join the Restorative Home</h2>
                        <p className="text-body-lg text-sage-100 mb-8 max-w-md">
                            Unlock exclusive early access to our modular drops and receive 10% off your first sanctuary upgrade.
                        </p>
                        <form className="flex max-w-md w-full" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="rounded-l-full rounded-r-none border-0 focus-visible:ring-2 focus-visible:ring-sage-300 text-stone-900 bg-white"
                                required
                                aria-label="Email address"
                            />
                            <Button type="submit" variant="secondary" className="rounded-l-none rounded-r-full px-6 whitespace-nowrap">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                        {/* Decorative minimalist graphic representing modularity/calm */}
                        <div className="w-64 h-64 rounded-full border border-sage-400/30 flex items-center justify-center relative">
                            <div className="w-48 h-48 rounded-full border border-sage-400/50 absolute" />
                            <div className="w-32 h-32 rounded-full border border-sage-300/80 absolute" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

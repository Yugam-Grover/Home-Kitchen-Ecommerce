'use client';

import * as React from 'react';
import { Button } from '@/components/wellness-ui/button';
import { Badge } from '@/components/wellness-ui/badge';
import { Input } from '@/components/wellness-ui/input';
import { StarRating } from '@/components/wellness-ui/star-rating';
import { useToast } from '@/components/wellness-ui/toast';
import { Mail, Search, Check } from 'lucide-react';
import { ProductCard } from '@/components/wellness-ui/product-card';
import { Accordion, AccordionItem } from '@/components/wellness-ui/accordion';
import { TestimonialCard } from '@/components/wellness-ui/testimonial-card';
import { Navbar } from '@/components/wellness-ui/navbar';
import { Footer } from '@/components/wellness-ui/footer';

export default function DesignShowcase() {
    const { addToast } = useToast();
    const [rating, setRating] = React.useState(3);

    return (
        <div className="min-h-screen bg-stone-50 pb-32">
            <Navbar cartCount={3} />

            <div className="container-standard pt-32 space-y-12">
                <header className="space-y-4">
                    <h1 className="text-4xl font-serif font-bold text-stone-900">Design System Showcase</h1>
                    <p className="text-lg text-stone-600">Verification of atomic, molecular, and organism components.</p>
                </header>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Buttons</h2>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <div className="p-4 bg-stone-900 rounded-lg">
                            <Button variant="white">White</Button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">X-Large</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button isLoading>Loading</Button>
                        <Button disabled>Disabled</Button>
                        <Button variant="secondary" disabled>Disabled Sec</Button>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Badges</h2>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="discount">Discount</Badge>
                        <Badge variant="new">New Arrival</Badge>
                        <Badge variant="low-stock">Low Stock</Badge>
                        <Badge variant="out-of-stock">Out of Stock</Badge>
                        <Badge variant="gold-member">Gold Member</Badge>
                        <Badge variant="early-access">Early Access</Badge>
                        <Badge variant="certification">Certified</Badge>
                        <Badge variant="default">Default</Badge>
                    </div>
                </section>

                <section className="space-y-6 max-w-md">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Inputs</h2>
                    <Input placeholder="Default input" />
                    <Input placeholder="With left icon" leftIcon={<Search size={18} />} />
                    <Input placeholder="With right icon" rightIcon={<Mail size={18} />} />
                    <Input placeholder="Error state" error="Invalid email address" defaultValue="wrong@email" />
                    <Input placeholder="With helper text" helperText="We will never share your email." />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Star Rating</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span>Interactive:</span>
                            <StarRating value={rating} onChange={setRating} />
                            <span className="text-sm text-stone-500">Value: {rating}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Read Only (4.5):</span>
                            <StarRating value={4.5} readOnly />
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Large:</span>
                            <StarRating value={5} readOnly size={24} />
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Toasts</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button onClick={() => addToast({ type: 'success', title: 'Success', message: 'Action completed successfully.' })}>
                            Show Success
                        </Button>
                        <Button variant="secondary" onClick={() => addToast({ type: 'error', title: 'Error', message: 'Something went wrong.' })}>
                            Show Error
                        </Button>
                        <Button variant="ghost" onClick={() => addToast({ type: 'warning', title: 'Warning', message: 'Check your inputs.' })}>
                            Show Warning
                        </Button>
                        <Button variant="secondary" onClick={() => addToast({ type: 'info', title: 'Info', message: 'Just so you know.' })}>
                            Show Info
                        </Button>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Product Card</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <ProductCard
                            id="1"
                            title="Ceramic Dinner Plate"
                            price={24.00}
                            image="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800"
                            slug="ceramic-plate"
                            rating={4.5}
                            reviewCount={12}
                            badge={{ text: 'New', variant: 'new' }}
                        />
                        <ProductCard
                            id="2"
                            title="Linen Napkin Set"
                            price={35.50}
                            originalPrice={45.00}
                            image="https://images.unsplash.com/photo-1574635532296-1875152dd6c2?auto=format&fit=crop&q=80&w=800"
                            slug="linen-napkins"
                            rating={5}
                            reviewCount={54}
                            badge={{ text: '-20%', variant: 'discount' }}
                            isWishlisted={true}
                        />
                    </div>
                </section>

                <section className="space-y-6 max-w-2xl">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Accordion</h2>
                    <Accordion type="single" defaultValue="item-1">
                        <AccordionItem value="item-1" trigger="Is this dishwasher safe?">
                            Yes, all our ceramic products are dishwasher and microwave safe. We recommend using gentle detergents to maintain the glaze.
                        </AccordionItem>
                        <AccordionItem value="item-2" trigger="What is the return policy?">
                            We offer a 30-day return policy for all unused items in their original packaging.
                        </AccordionItem>
                        <AccordionItem value="item-3" trigger="Do you ship internationally?">
                            Currently we ship to the US, Canada, and UK.
                        </AccordionItem>
                    </Accordion>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Testimonial Card</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TestimonialCard
                            quote="The quality of these linens is unmatched. They have completely transformed my dining experience."
                            author="Sarah M."
                            location="New York, NY"
                        />
                        <TestimonialCard
                            quote="Finally found non-toxic cookware that actually looks good on my stove."
                            author="James L."
                            location="Austin, TX"
                            rating={4}
                        />
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold border-b pb-2">Footer Preview</h2>
                    <div className="border border-stone-200 rounded-xl overflow-hidden">
                        <Footer />
                    </div>
                </section>
            </div>
        </div>
    );
}

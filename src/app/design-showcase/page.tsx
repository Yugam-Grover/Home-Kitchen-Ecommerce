'use client';

import * as React from 'react';
import { Button } from '@/components/wellness-ui/button';
import { Input } from '@/components/wellness-ui/input';
import { Badge } from '@/components/wellness-ui/badge';
import { Checkbox } from '@/components/wellness-ui/checkbox';
import { Slider } from '@/components/wellness-ui/slider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/wellness-ui/select';
import { ProductCard } from '@/components/wellness-ui/product-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/wellness-ui/accordion';
import { TestimonialCard } from '@/components/wellness-ui/testimonial-card';
import { StarRating } from '@/components/wellness-ui/star-rating';
import { Breadcrumbs } from '@/components/wellness-ui/breadcrumbs';
import { CategorySearch } from '@/components/wellness-ui/category-search';
import { FeatureSection } from '@/components/wellness-ui/feature-section';
import { ProductCarousel } from '@/components/wellness-ui/product-carousel';
import { Mail, Search, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryUrl } from '@/lib/cloudinary';

export default function DesignShowcasePage() {
    const { toast } = useToast();
    const [sliderValue, setSliderValue] = React.useState([50]);
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    return (
        <div className="min-h-screen bg-surface-default pt-32 pb-24">
            <div className="container-standard space-y-24">

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-display-lg text-primary-900">Design System Showcase</h1>
                    <p className="text-body-lg text-stone-600 max-w-2xl">
                        A comprehensive gallery of the <span className="font-serif italic font-semibold">wellness-ui</span> component library.
                        Demonstrating our Organic Modernist aesthetic, interaction states, and accessibility patterns.
                    </p>
                </div>

                {/* 1. Buttons */}
                <section className="space-y-8">
                    <div className="border-b border-stone-200 pb-4">
                        <h2 className="text-heading-lg text-stone-900">1. Buttons</h2>
                        <p className="text-body-md text-stone-500">Primary, Secondary, Accent, Ghost, Danger interactions.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                        <Button>Primary Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="accent">Accent Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="danger">Danger Button</Button>
                        <Button disabled>Disabled</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                        <Button size="icon"><Bell className="h-5 w-5" /></Button>
                    </div>
                </section>

                {/* 2. Inputs & Forms */}
                <section className="space-y-8">
                    <div className="border-b border-stone-200 pb-4">
                        <h2 className="text-heading-lg text-stone-900">2. Inputs & Forms</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        <Input label="Email Address" placeholder="hello@example.com" startIcon={<Mail className="h-5 w-5" />} />
                        <Input label="Search" placeholder="Search products..." variant="search" />
                        <Input label="Error State" placeholder="Invalid input" error="Please enter a valid email" defaultValue="invalid@" />

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-stone-700">Select Box</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="orange">Orange</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-stone-700">Range Slider: {sliderValue}%</label>
                            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox id="terms" />
                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Accept terms and conditions
                            </label>
                        </div>
                    </div>
                </section>

                {/* 3. Badges */}
                <section className="space-y-8">
                    <div className="border-b border-stone-200 pb-4">
                        <h2 className="text-heading-lg text-stone-900">3. Badges</h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="discount">50% Off</Badge>
                        <Badge variant="new">New Arrival</Badge>
                        <Badge variant="low-stock">Low Stock</Badge>
                        <Badge variant="out-of-stock">Out of Stock</Badge>
                        <Badge variant="gold-member">Gold Member</Badge>
                        <Badge variant="certification">Organic</Badge>
                    </div>
                </section>

                {/* 4. Product Cards */}
                <section className="space-y-8">
                    <div className="border-b border-stone-200 pb-4">
                        <h2 className="text-heading-lg text-stone-900">4. Product Cards</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <ProductCard
                            id="1"
                            slug="ceramic-diffuser"
                            name="Ceramic Ultrasonic Diffuser"
                            category="Home Fragrance"
                            price={85}
                            rating={4.8}
                            reviewCount={124}
                            imageSrc={cloudinaryUrl('sample')} // Placeholder
                            imageAlt="Ceramic Diffuser"
                            badges={[{ type: 'new', label: 'New' }]}
                            onAddToCart={() => toast({ title: "Added to cart", description: "Ceramic Ultrasonic Diffuser added to your cart.", variant: "success" })}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
                        />
                        <ProductCard
                            id="2"
                            slug="linen-sheets"
                            name="Organic Washed Linen Sheet Set"
                            category="Bedding"
                            price={120}
                            originalPrice={150}
                            rating={4.5}
                            reviewCount={89}
                            imageSrc={cloudinaryUrl('sample')} // Placeholder
                            imageAlt="Linen Sheets"
                            badges={[{ type: 'discount', label: '20% Off' }]}
                            onAddToCart={() => toast({ title: "Added to cart", variant: "success" })}
                        />
                    </div>
                </section>

                {/* 5. Feedback & Display */}
                <section className="space-y-8">
                    <div className="border-b border-stone-200 pb-4">
                        <h2 className="text-heading-lg text-stone-900">5. Feedback & Display</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Toasts */}
                        <div className="space-y-6">
                            <h3 className="text-heading-md">Toast Notifications</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="secondary" onClick={() => toast({ title: "Success", description: "Operation completed successfully.", variant: "success" })}>
                                    Success Toast
                                </Button>
                                <Button variant="secondary" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })}>
                                    Error Toast
                                </Button>
                                <Button variant="secondary" onClick={() => toast({ title: "Warning", description: "Please review your inputs.", variant: "warning" })}>
                                    Warning Toast
                                </Button>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="space-y-6">
                            <h3 className="text-heading-md">Star Ratings</h3>
                            <div className="space-y-2">
                                <StarRating rating={5} />
                                <StarRating rating={4.5} />
                                <StarRating rating={3} />
                                <StarRating rating={0} />
                            </div>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-6">
                            <h3 className="text-heading-md">Accordion</h3>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Is this product dishwasher safe?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. All our ceramic products are dishwasher and microwave safe for your convenience.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                                    <AccordionContent>
                                        We offer a 30-day return policy for all unused items in their original packaging.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* Testimonials */}
                        <div className="space-y-6">
                            <h3 className="text-heading-md">Testimonial</h3>
                            <TestimonialCard
                                author="Sarah M."
                                location="New York, NY"
                                quote="The quality of these linens is absolutely incredible. It feels like sleeping in a cloud every single night."
                                rating={5}
                            />
                        </div>
                    </div>
                </section>

                {/* 6. Value-Add Components */}
                <section className="space-y-8 pb-24">
                    <div className="border-b border-stone-200 pb-4">
                        <h2 className="text-heading-lg text-stone-900">6. Value-Add Components</h2>
                    </div>

                    {/* Breadcrumbs */}
                    <div className="space-y-4">
                        <h3 className="text-heading-md">Breadcrumbs & Search</h3>
                        <div className="flex flex-col gap-6">
                            <Breadcrumbs
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Shop', href: '/shop' },
                                    { label: 'Kitchen', href: '/shop/kitchen' },
                                    { label: 'Ceramics', href: '/shop/kitchen/ceramics', active: true },
                                ]}
                            />
                            <CategorySearch placeholder="Search within Ceramics..." />
                        </div>
                    </div>

                    {/* Feature Section */}
                    <div className="space-y-4">
                        <h3 className="text-heading-md">Feature Section</h3>
                        <FeatureSection
                            title="Handcrafted Excellence"
                            description="Each piece is individually thrown on the wheel by master artisans, ensuring that no two items are exactly alike. The natural glaze finish provides a tactile experience that grounds you in the moment."
                            imageSrc={cloudinaryUrl('sample')}
                            imageAlt="Artisan working on pottery"
                            ctaText="Learn about our process"
                            imagePosition="right"
                        />
                    </div>

                    {/* Product Carousel */}
                    <div className="space-y-4">
                        <ProductCarousel
                            title="You May Also Like"
                            products={[
                                {
                                    id: 'c1',
                                    slug: 'ceramic-plate',
                                    name: 'Stoneware Dinner Plate',
                                    category: 'Dining',
                                    price: 24,
                                    rating: 4.9,
                                    imageSrc: cloudinaryUrl('sample'),
                                    imageAlt: 'Plate',
                                    badges: [{ type: 'new', label: 'New' }]
                                },
                                {
                                    id: 'c2',
                                    slug: 'linen-napkins',
                                    name: 'Washed Linen Napkins (Set of 4)',
                                    category: 'Dining',
                                    price: 45,
                                    rating: 4.7,
                                    imageSrc: cloudinaryUrl('sample'),
                                    imageAlt: 'Napkins'
                                },
                                {
                                    id: 'c3',
                                    slug: 'wood-bowl',
                                    name: 'Olive Wood Serving Bowl',
                                    category: 'Serveware',
                                    price: 65,
                                    rating: 4.8,
                                    imageSrc: cloudinaryUrl('sample'),
                                    imageAlt: 'Bowl',
                                    badges: [{ type: 'low-stock', label: 'Only 3 left' }]
                                },
                                {
                                    id: 'c4',
                                    slug: 'glass-carafe',
                                    name: 'Recycled Glass Carafe',
                                    category: 'Drinkware',
                                    price: 38,
                                    rating: 4.6,
                                    imageSrc: cloudinaryUrl('sample'),
                                    imageAlt: 'Carafe'
                                },
                            ]}
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}

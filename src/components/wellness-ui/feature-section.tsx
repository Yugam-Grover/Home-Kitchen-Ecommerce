import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/wellness-ui/button';

export interface FeatureSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imagePosition?: 'left' | 'right';
    ctaText?: string;
    ctaHref?: string;
    className?: string;
    priority?: boolean;
}

export function FeatureSection({
    title,
    description,
    imageSrc,
    imageAlt,
    imagePosition = 'left',
    ctaText,
    ctaHref,
    className,
    priority = false,
}: FeatureSectionProps) {
    return (
        <section className={cn('py-16 md:py-24 bg-white', className)}>
            <div className="container-standard">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    {/* Image Side */}
                    <div
                        className={cn(
                            'w-full md:w-1/2 relative aspect-[4/5] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100',
                            imagePosition === 'right' ? 'md:order-2' : 'md:order-1'
                        )}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            priority={priority}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Text Side */}
                    <div
                        className={cn(
                            'w-full md:w-1/2 flex flex-col space-y-6',
                            imagePosition === 'right' ? 'md:order-1' : 'md:order-2'
                        )}
                    >
                        <h2 className="text-display-md text-stone-900 leading-tight">
                            {title}
                        </h2>
                        <p className="text-body-lg text-stone-600 leading-relaxed">
                            {description}
                        </p>
                        {ctaText && (
                            <div className="pt-4">
                                <Button variant="primary" asChild>
                                    <a href={ctaHref || '#'}>{ctaText}</a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

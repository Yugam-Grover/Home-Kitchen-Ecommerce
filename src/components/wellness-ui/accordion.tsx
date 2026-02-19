'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AccordionItemProps {
    value: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
}

export function AccordionItem({ value, trigger, children, isOpen, onToggle, className }: AccordionItemProps) {
    return (
        <div className={cn("border-b border-stone-200 last:border-0", className)}>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-stone-900 [&[data-state=open]>svg]:rotate-180"
                data-state={isOpen ? 'open' : 'closed'}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-serif text-stone-800">{trigger}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200" />
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
                )}
            >
                <div className="text-stone-600 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

export interface AccordionProps {
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    className?: string;
    children: React.ReactNode;
}

export function Accordion({ type = 'single', defaultValue, className, children }: AccordionProps) {
    const [value, setValue] = React.useState<string | string[]>(defaultValue || (type === 'multiple' ? [] : ''));

    const handleToggle = (itemValue: string) => {
        if (type === 'single') {
            setValue(value === itemValue ? '' : itemValue);
        } else {
            const currentValues = Array.isArray(value) ? value : [];
            if (currentValues.includes(itemValue)) {
                setValue(currentValues.filter((v) => v !== itemValue));
            } else {
                setValue([...currentValues, itemValue]);
            }
        }
    };

    return (
        <div className={cn("w-full rounded-2xl border border-stone-200 bg-white px-6", className)}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const itemValue = child.props.value;
                    const isOpen = Array.isArray(value) ? value.includes(itemValue) : value === itemValue;
                    return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
                        isOpen,
                        onToggle: () => handleToggle(itemValue),
                    });
                }
                return child;
            })}
        </div>
    );
}

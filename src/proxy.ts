// src/proxy.ts — Next.js 16 Stable Node.js Runtime
// Source: architecture.md §4.1
// Handles: auth guards, currency detection, membership tier, security headers

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export default async function proxy(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();

    // --- 1. Supabase Auth Session Resolution ---
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value);
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );
    const { data: { session } } = await supabase.auth.getSession();

    // --- 2. Auth Guards ---
    const protectedRoutes = ['/account', '/checkout'];
    const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));

    if (isProtected && !session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // --- 3. Currency Detection (INTL-001 — PRD §1.5) ---
    if (!request.cookies.get('currency')) {
        const geoCountry = request.headers.get('x-vercel-ip-country');
        let currency: string;

        if (geoCountry) {
            currency = mapCountryToCurrency(geoCountry);
        } else {
            const acceptLang = request.headers.get('accept-language') || 'en-US';
            const locale = acceptLang.split(',')[0].trim();
            const langCountry = locale.split('-')[1]?.toUpperCase() || 'US';
            currency = mapCountryToCurrency(langCountry);
        }

        response.cookies.set('currency', currency, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        });
    }

    // --- 4. Gold Membership Early Access Gate (GOLD-007) ---
    if (pathname.startsWith('/products/')) {
        if (session) {
            const { data: user } = await supabase
                .from('users')
                .select('membership_tier')
                .eq('id', session.user.id)
                .single();
            response.headers.set('x-membership-tier', user?.membership_tier || 'free');
        } else {
            response.headers.set('x-membership-tier', 'free');
        }
    }

    // --- 5. Security Headers (PRD SEC-002, SEC-008, SEC-009) ---
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://challenges.cloudflare.com",
            "frame-src https://js.stripe.com https://hooks.stripe.com",
            "img-src 'self' https://res.cloudinary.com https://images.unsplash.com data: blob:",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://*.typesense.io",
        ].join('; ')
    );

    return response;
}

function mapCountryToCurrency(country: string): string {
    const map: Record<string, string> = {
        US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', JP: 'JPY',
        IN: 'INR', BR: 'BRL', SG: 'SGD', AE: 'AED',
        DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR',
        BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR',
        GR: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR',
        LV: 'EUR', LT: 'EUR', MT: 'EUR', CY: 'EUR',
        NZ: 'NZD', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK',
        ZA: 'ZAR', MX: 'MXN', KR: 'KRW', CN: 'CNY', HK: 'HKD',
        TW: 'TWD', TH: 'THB', MY: 'MYR', PH: 'PHP', ID: 'IDR',
    };
    return map[country] || 'USD';
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/).*)'],
};

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <div className="container-standard" style={{ paddingBlock: '48px', display: 'flex', gap: '32px' }}>
            <aside style={{ width: '240px', flexShrink: 0 }}>
                <nav>
                    <p className="text-overline" style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }}>
                        Seller Dashboard
                    </p>
                    {/* Seller nav (max 5 items per PRD §2.4) — Phase 3 */}
                </nav>
            </aside>
            <main style={{ flex: 1 }}>{children}</main>
        </div>
    );
}

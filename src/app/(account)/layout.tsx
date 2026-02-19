export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <div className="container-standard" style={{ paddingBlock: '48px', display: 'flex', gap: '32px' }}>
            <aside style={{ width: '240px', flexShrink: 0 }}>
                <nav>
                    <p className="text-overline" style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }}>
                        Account
                    </p>
                    {/* Sidebar nav — Phase 3 */}
                </nav>
            </aside>
            <main style={{ flex: 1 }}>{children}</main>
        </div>
    );
}

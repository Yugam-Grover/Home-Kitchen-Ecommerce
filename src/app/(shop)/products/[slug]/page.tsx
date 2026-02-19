interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps): Promise<React.ReactElement> {
    const { slug } = await params;

    return (
        <main className="container-standard" style={{ paddingBlock: '64px' }}>
            <h1 className="text-heading-lg">Product: {slug}</h1>
            <p className="text-body-md" style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                Product detail page — Phase 3
            </p>
        </main>
    );
}

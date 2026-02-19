interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps): Promise<React.ReactElement> {
    const { category } = await params;

    return (
        <main className="container-standard" style={{ paddingBlock: '64px' }}>
            <h1 className="text-heading-lg">Category: {category}</h1>
            <p className="text-body-md" style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                Category page — Phase 3
            </p>
        </main>
    );
}

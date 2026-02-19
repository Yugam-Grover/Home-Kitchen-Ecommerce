interface OrderDetailPageProps {
    params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps): Promise<React.ReactElement> {
    const { orderId } = await params;
    return (
        <div>
            <h1 className="text-heading-lg">Order: {orderId}</h1>
            <p className="text-body-md" style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>Order detail — Phase 3</p>
        </div>
    );
}

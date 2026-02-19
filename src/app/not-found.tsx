import Link from 'next/link';

export default function NotFound(): React.ReactElement {
    return (
        <main className="container-narrow" style={{ paddingBlock: '128px', textAlign: 'center' }}>
            <h1 className="text-display-md" style={{ marginBottom: '16px' }}>
                404
            </h1>
            <p
                className="text-body-lg"
                style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}
            >
                The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
                href="/"
                style={{
                    color: 'var(--color-sage-500)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                }}
                className="text-body-md"
            >
                Return home
            </Link>
        </main>
    );
}

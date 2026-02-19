'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}): React.ReactElement {
    return (
        <main
            className="container-narrow"
            style={{ paddingBlock: '128px', textAlign: 'center' }}
        >
            <h1 className="text-heading-lg" style={{ marginBottom: '12px' }}>
                Something went wrong
            </h1>
            <p
                className="text-body-md"
                style={{
                    color: 'var(--color-text-secondary)',
                    marginBottom: '24px',
                }}
            >
                {error.message || 'An unexpected error occurred.'}
            </p>
            <button
                onClick={reset}
                style={{
                    backgroundColor: 'var(--color-sage-500)',
                    color: 'var(--color-text-inverse)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '12px 32px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    transition: 'var(--motion-default)',
                }}
            >
                Try again
            </button>
        </main>
    );
}

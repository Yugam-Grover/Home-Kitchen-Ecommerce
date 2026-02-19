export default function Loading(): React.ReactElement {
    return (
        <div
            className="container-standard"
            style={{
                paddingBlock: '96px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <div className="skeleton" style={{ width: '200px', height: '32px' }} />
            <div className="skeleton" style={{ width: '100%', height: '16px' }} />
            <div className="skeleton" style={{ width: '80%', height: '16px' }} />
            <div className="skeleton" style={{ width: '60%', height: '16px' }} />
        </div>
    );
}

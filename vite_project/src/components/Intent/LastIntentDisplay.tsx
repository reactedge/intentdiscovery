type Props = {
    intent: any;
};

export const LastIntentDisplay = ({ intent }: Props) => {
    if (!intent) return null;

    return (
        <div style={{
            marginTop: "16px",
            padding: "12px",
            border: "1px solid #ddd",
            background: "#f9f9f9"
        }}>
            <strong>Last Intent Received:</strong>
            <pre style={{ marginTop: "8px" }}>
                {JSON.stringify(intent, null, 2)}
            </pre>
        </div>
    );
};

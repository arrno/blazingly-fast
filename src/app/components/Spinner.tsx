interface SpinnerProps {
    className?: string;
    label?: string;
}

export function Spinner({
    className = "h-5 w-5",
    label = "Loading",
}: SpinnerProps) {
    return (
        <span role="status" aria-live="polite" className="inline-flex items-center">
            <span
                className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
            />
            <span className="sr-only">{label}</span>
        </span>
    );
}

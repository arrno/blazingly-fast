interface RobotIconProps {
    size?: string;
    className?: string;
}

export default function RobotIcon({
    size = "w-6 h-6",
    className = "text-blue-400",
}: RobotIconProps) {
    return (
        <svg
            className={`${size} ${className}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <rect x="6" y="6" width="12" height="12" rx="2" strokeWidth={1} />
            <circle cx="10" cy="10" r="0.5" fill="currentColor" />
            <circle cx="14" cy="10" r="0.5" fill="currentColor" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M10 14h4"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6v-2"
            />
        </svg>
    );
}

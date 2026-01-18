import { useMemo } from "react";

const EMOJIS = [
    "🐛",
    "⚡️",
    "🤖",
    "🐢",
    "🌪️",
    "💻",
    "🧩",
    "🧠",
    "🛶",
    "📡",
    "💡",
    "🧵",
    "🎯",
    "🧨",
    "🤺",
    "🐎",
    "🦾",
    "🪄",
    "🏎️",
    "🧅",
    "🌀",
];

const DEFAULT_SEED = "hash-emoji";

export type HashEmojiIconProps = {
    text?: string;
    className?: string;
};

function hashString(value: string): number {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
        const charCode = value.charCodeAt(index);
        hash = (hash << 5) - hash + charCode;
        hash |= 0;
    }
    return hash;
}

export function HashEmojiIcon({
    text = "",
    className = "",
}: HashEmojiIconProps) {
    const seed = text.trim() || DEFAULT_SEED;
    const emoji = useMemo(() => {
        const index = Math.abs(hashString(seed)) % EMOJIS.length;
        return EMOJIS[index];
    }, [seed]);

    return (
        <div
            className={`flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100 text-xl ${className}`}
        >
            <span aria-hidden>{emoji}</span>
        </div>
    );
}

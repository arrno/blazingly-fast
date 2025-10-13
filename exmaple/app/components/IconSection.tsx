import Image from "next/image";

// Reusable component for icon sections
export const IconSection = ({
    icons,
    direction,
}: {
    icons: Array<{ src: string; alt: string }>;
    direction: "left" | "right";
}) => {
    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div className={`flex animate-scroll-${direction}`}>
                    <div className="flex space-x-6 sm:space-x-7 whitespace-nowrap">
                        {/* First set */}
                        {icons.map((icon, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg border border-gray-200 shadow-sm"
                            >
                                <Image
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                        {/* Second set */}
                        {icons.map((icon, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg border border-gray-200 shadow-sm"
                            >
                                <Image
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                        {/* Third set */}
                        {icons.map((icon, index) => (
                            <div
                                key={`third-${index}`}
                                className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg border border-gray-200 shadow-sm"
                            >
                                <Image
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>
    );
};

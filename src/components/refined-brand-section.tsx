'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Character Reveal Component with Bold Support
function RevealChar({ char, progress, isBold }: { char: string, progress: any, isBold?: boolean }) {
    return (
        <span className="relative">
            <span className={`opacity-20 text-gray-500 ${isBold ? "font-bold" : ""}`}>{char}</span>
            <motion.span
                style={{ opacity: progress }}
                className={`absolute left-0 top-0 text-white ${isBold ? "font-bold" : ""}`}
            >
                {char}
            </motion.span>
        </span>
    )
}

function QuoteLine({
    segments,
    progress,
    range,
    className = "text-4xl sm:text-5xl lg:text-7xl font-light leading-tight tracking-tight"
}: {
    segments: { text: string, bold?: boolean }[],
    progress: any,
    range: [number, number],
    className?: string
}) {
    // Map global section progress to this line's processing range (0 to 1)
    const lineProgress = useTransform(progress, range, [0, 1]);

    const fullText = segments.map(s => s.text).join("");
    let charGlobalIndex = 0;

    return (
        <p className={className}>
            {segments.map((segment, segmentIndex) => (
                <span key={segmentIndex} className={segment.bold ? "font-bold" : ""}>
                    {segment.text.split("").map((char, charIndex) => {
                        const start = charGlobalIndex / fullText.length;
                        const end = start + (1 / fullText.length);
                        // Character lights up based on line's local progress
                        const charProgress = useTransform(lineProgress, [start, end], [0, 1]);
                        charGlobalIndex++;

                        return (
                            <RevealChar key={`${segmentIndex}-${charIndex}`} char={char} progress={charProgress} isBold={segment.bold} />
                        )
                    })}
                </span>
            ))}
        </p>
    )
}

export function RefinedBrandSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.2"]
    });

    return (
        <section ref={containerRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-black text-center min-h-[120vh] flex flex-col justify-center">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Intro Lines */}
                <div className="space-y-4">
                    <QuoteLine
                        progress={scrollYProgress}
                        range={[0, 0.2]}
                        className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white"
                        segments={[
                            { text: "Strong brands ", bold: true },
                            { text: "are not rushed." }
                        ]}
                    />
                    <QuoteLine
                        progress={scrollYProgress}
                        range={[0.15, 0.35]}
                        className="text-lg sm:text-xl lg:text-2xl font-light uppercase tracking-[0.2em] text-white/50"
                        segments={[
                            { text: "They are designed with " },
                            { text: "intention", bold: true }
                        ]}
                    />
                </div>

                {/* Core Message */}
                <div className="py-8">
                    <QuoteLine
                        progress={scrollYProgress}
                        range={[0.35, 0.85]}
                        segments={[
                            { text: "We focus on " },
                            { text: "clarity", bold: true },
                            { text: " before creativity, " },
                            { text: "systems", bold: true },
                            { text: " before scale, " },
                            { text: "trust", bold: true },
                            { text: " before attention" }
                        ]}
                    />
                </div>

                {/* Outro Line */}
                <QuoteLine
                    progress={scrollYProgress}
                    range={[0.85, 1]}
                    className="text-lg sm:text-xl text-white/40 font-light"
                    segments={[
                        { text: "This is how " },
                        { text: "enduring brands", bold: true },
                        { text: " are built." }
                    ]}
                />
            </div>
        </section>
    );
}

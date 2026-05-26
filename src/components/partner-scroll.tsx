'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const partners = [
    'a.webp',
    '1.webp',
    '2.webp',
    '3.webp',
    '4.webp',
    '5.webp',
    '6.webp',
    '7.webp',
    '8.webp',
    '9.webp',
    '10.webp',
    '11.webp',
    '13.webp',
];

export function PartnerScroll() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Duplicate for seamless loop
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full overflow-hidden py-16"
        >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/aboutpage/bg-gradient.webp"
                    alt=""
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            {/* Top Border Line with subtle glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 z-10" />

            {/* Section label */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center text-sm md:text-base font-bold uppercase tracking-[0.4em] pt-12 text-white mb-14 relative z-20"
            >
                Trusted by forward-thinking brands
            </motion.p>

            <div className="relative z-10 py-6">
                {/* Single Scrolling Layer */}
                <motion.div
                    className="flex items-center gap-16 md:gap-24 w-max px-12 relative z-10 "
                    animate={isPaused ? {} : { x: ['0%', '-25%'] }}
                    transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {duplicatedPartners.map((partner, index) => {
                        const isEmerge = partner === '2.webp';
                        const isHovered = hoveredIndex === index;

                        return (
                            <motion.div
                                key={`${partner}-${index}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative flex items-center justify-center flex-shrink-0 group cursor-pointer"
                                animate={{ scale: isHovered ? 1.05 : 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className={`
                                    relative w-40 h-40 flex items-center justify-center rounded-[2.5rem] 
                                    ${isHovered ? 'bg-white border-white shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'bg-white/[0.03] border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.03)]'}
                                    transition-all duration-500 overflow-hidden
                                `}>
                                    <img
                                        src={`/partners/${partner}`}
                                        alt={`Partner ${partner}`}
                                        className={`
                                            relative z-10 transition-all duration-500 object-contain
                                            opacity-95 group-hover:opacity-100 grayscale-0 
                                            ${isEmerge ? 'h-10 md:h-14 w-20 md:w-28' : 'h-24 md:h-28 w-24 md:w-28'}
                                            ${isHovered ? 'scale-90' : 'scale-100'}
                                        `}
                                    />
                                    {/* Glass sheen */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Bottom Border Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
        </motion.section>
    );
}

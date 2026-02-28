'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    '12.webp',
    '13.webp',
];

export function PartnerScroll() {
    // Duplicate the partners array twice more to ensure super smooth looping on all screen sizes
    const duplicatedPartners = [...partners, ...partners, ...partners];

    return (
        <section className="relative w-full overflow-hidden bg-black py-12">
            {/* Top Border Line with subtle glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-blue-500/50 blur-[2px]" />

            {/* Vibrant Blue Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(50%_50%_at_50%_0%,rgba(59,130,246,0.15)_0%,rgba(0,0,0,0)_100%)] pointer-events-none" />

            <div className="relative z-10 py-4">
                <motion.div
                    className="flex items-center gap-16 md:gap-24 w-max"
                    animate={{
                        x: ['0%', '-33.33%'],
                    }}
                    transition={{
                        duration: 40,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    {duplicatedPartners.map((partner, index) => (
                        <div
                            key={`${partner}-${index}`}
                            className="flex-shrink-0 opacity-40 hover:opacity-100 transition-all duration-500 transform hover:scale-110"
                        >
                            <img
                                src={`/partners/${partner}`}
                                alt={`Partner ${partner}`}
                                className="h-6 md:h-10 w-auto object-contain brightness-0 invert"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Soft Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />
        </section>
    );
}

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

export function AntigravityCarousel() {
    // Duplicate for smooth loop
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="relative w-full h-48 overflow-hidden bg-transparent select-none">
            {/* The "Track" wrapper that moves horizontally */}
            <div className="absolute inset-0 flex items-center">
                <motion.div
                    className="flex gap-24 items-center px-12"
                    animate={{
                        x: ['0%', '-50%'],
                    }}
                    transition={{
                        duration: 30,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    {duplicatedPartners.map((partner, index) => (
                        <LogoItem key={`${partner}-${index}`} src={partner} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* Gradient Overlay for the "Spotlight" effect on the edges */}
            {/* This one actually fades everything out at edges */}
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />
        </section>
    );
}

function LogoItem({ src, index }: { src: string; index: number }) {
    // Random parameters for bobbing to simulate "antigravity"
    // Using simple deterministic "random" based on index so it's consistent during SSR/Hydration
    const duration = 3 + (index % 5);
    const delay = (index % 7) * 0.5;
    const yRange = 10 + (index % 4) * 5;

    return (
        <div className="relative group">
            <motion.div
                animate={{
                    y: [-yRange, yRange],
                }}
                transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="relative h-12 md:h-16 w-32 md:w-40 flex items-center justify-center"
            >
                {/* Gray/Dimmed Base Logo */}
                <img
                    src={`/partners/${src}`}
                    alt={`Partner Logo`}
                    className="h-full w-full object-contain grayscale opacity-20 transition-all duration-700 brightness-50"
                />

                {/* Color/Bright Overlay - Reveal based on center position */}
                {/* Since we want it revealed "through the exact center of the screen", 
                    we can use a clever CSS trick: an overlay with a fixed mask or
                    just use the group-hover for now? No, the user wants it automatic.
                    
                    Actually, we can use a CSS mask on a track-wide level as discussed.
                    Wait, let's try a different approach:
                    Each LogoItem has an 'active' state based on its horizontal position relative to the center of the viewport.
                */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                        src={`/partners/${src}`}
                        alt={`Partner Logo Color`}
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* 
                  To implement the "Center Spotlight" correctly as they scroll through the center,
                  we should ideally use two tracks or a CSS trick.
                  Let's try the two-track approach for the most robust effect.
                */}
            </motion.div>
        </div>
    );
}

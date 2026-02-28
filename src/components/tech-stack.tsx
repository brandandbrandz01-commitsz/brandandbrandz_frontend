'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Tech stack with requested icons + generic/colored versions
const techStack = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: 'UI Library' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', desc: 'React Framework' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Runtime' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', desc: 'Server Side' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', desc: 'Language' },
    { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', desc: 'Analytics' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', desc: 'Design' },
    { name: 'Machine Learning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', desc: 'AI/ML' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', desc: 'Typed JS' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', desc: 'Containerization' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', desc: 'Cloud' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', desc: 'CSS Framework' },
];

const displayStack = [...techStack, ...techStack];

export function TechStack() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-black relative">
            {/* Header Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="text-sm font-medium text-white/80">Tech Stack</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    A performance-driven technology stack for <br className="hidden md:block" />
                    modern brands and scalable digital products.
                </h2>
                <p className="max-w-3xl mx-auto text-lg text-white/60 font-light">
                    BrandandBrandz uses reliable, industry-proven tools to deliver fast performance,
                    clean user experiences, and long-term reliability.
                </p>
            </div>

            {/* Antigravity Slider */}
            <div className="relative w-full max-w-[98vw] mx-auto">
                {/* Fading Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-40 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-40 pointer-events-none" />

                {/* Infinite Loop Track */}
                <div className="flex"> {/* Removed overflow-hidden as requested */}
                    <div className="flex gap-4 md:gap-16 items-center animate-scroll w-max hover:[animation-play-state:paused] py-12"> {/* Added vertical padding for popup space */}
                        {displayStack.map((tech, index) => (
                            <motion.div
                                key={`${tech.name}-${index}`}
                                className="relative flex flex-col items-center justify-center group flex-shrink-0 mx-2 md:mx-0"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={{ y: -10 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                style={{
                                    zIndex: hoveredIndex === index ? 100 : 1 // High Z-index on hover
                                }}
                            >
                                {/* Tooltip / Card */}
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute bottom-full mb-4 z-[100] px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl whitespace-nowrap"
                                        >
                                            <p className="text-white font-bold text-sm">{tech.name}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Icon Container */}
                                <div className="w-16 h-16 md:w-24 md:h-24 relative flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-3 md:p-6 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10">
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        className={`w-full h-full object-contain transition-all duration-300 ${tech.name === 'Next.js' ? 'invert' : ''}`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

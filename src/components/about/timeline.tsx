'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

export function Timeline() {
    // Track which card is hovered to highlight the corresponding connector line
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Animation variants for drawing the lines
    const lineVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 0.5,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.2 // Draw lines after the button appears
            }
        },
        hover: {
            opacity: 1,
            strokeWidth: 3,
            filter: "drop-shadow(0px 0px 8px rgb(59, 130, 246))", // Glow effect
            transition: { duration: 0.3 }
        }
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Tag */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
            >
                <span className="bg-white/10 backdrop-blur-sm border border-white/10 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Timeline
                </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6"
            >
                Our journey <span className="text-[#3B82F6]">so far</span>
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg mb-12 font-light leading-relaxed"
            >
                From starting as a solo freelancer to building real platforms and
                products, the journey is driven by execution, consistency, and real-
                world impact.
            </motion.p>

            {/* Central Timeline Hub */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">

                {/* 2023 - 2025 Button */}
                <div className="relative z-20 mb-8 sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        viewport={{ once: true }}
                        className="relative group cursor-pointer inline-block"
                    >
                        {/* Pulse Effect */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
                        />

                        <div className="relative bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full border border-white/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-xl">
                            <span className="text-2xl sm:text-3xl font-bold tracking-wider text-white">
                                2023 – 2025
                            </span>
                        </div>
                    </motion.div>

                    {/* Connecting Lines (Desktop Only) */}
                    <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[900px] h-28 hidden lg:block pointer-events-none -z-10">
                        <svg className="w-full h-full" viewBox="0 0 900 100" fill="none">
                            {/* Left Path: Center to Left Card */}
                            <motion.path
                                d="M450,10 C450,50 150,50 150,100"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="visible"
                                animate={hoveredIndex === 0 ? "hover" : "visible"}
                                viewport={{ once: true }}
                            />

                            {/* Center Path: Center to Center Card */}
                            <motion.path
                                d="M450,10 V100"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="visible"
                                animate={hoveredIndex === 1 ? "hover" : "visible"}
                                viewport={{ once: true }}
                            />

                            {/* Right Path: Center to Right Card */}
                            <motion.path
                                d="M450,10 C450,50 750,50 750,100"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="visible"
                                animate={hoveredIndex === 2 ? "hover" : "visible"}
                                viewport={{ once: true }}
                            />
                        </svg>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full relative z-10 px-4">

                    {/* Card 1: The Beginning (Black) */}
                    <TimelineCard
                        index={0}
                        setHoveredIndex={setHoveredIndex}
                        title="The Beginning"
                        delay={0.4}
                        content={[
                            { year: "2023", text: "Launched as a freelance digital solutions provider specializing in web development and UI/UX." },
                            { year: "2023", text: "Focused on execution-driven delivery for real client projects." },
                            { year: "2023", text: "Collaborated with government-linked initiatives." },
                            { year: "2023", text: "Established trust through user-centric outcomes." }
                        ]}
                    />

                    {/* Card 2: Growth (Blue) */}
                    <TimelineCard
                        index={1}
                        setHoveredIndex={setHoveredIndex}
                        title="Growth"
                        delay={0.6}
                        gradient={true}
                        content={[
                            { year: "2024–25", text: "Transitioned from services to scalable product building." },
                            { year: "2024–25", text: "Developed healthcare and road safety innovation concepts." },
                            { year: "2024–25", text: "Won multiple medals representing Karnataka at national expos." },
                            { year: "2024–25", text: "Strengthened product strategy and system-level design." }
                        ]}
                    />

                    {/* Card 3: Innovation (Black) */}
                    <TimelineCard
                        index={2}
                        setHoveredIndex={setHoveredIndex}
                        title="Innovation"
                        delay={0.8}
                        content={[
                            { year: "2025", text: "Launched platforms: DailyGo, Unifiro, Brand & Brandz." },
                            { year: "2025", text: "Adopted an execution-first approach for real-world use cases." },
                            { year: "2025", text: "Prioritized user adoption and measurable impact." },
                            { year: "2025", text: "Progressing toward sustainable ecosystem growth." }
                        ]}
                    />

                    {/* Mobile Connector Line Override (Hidden on desktop) */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 lg:hidden -z-10" />
                </div>
            </div>
        </section>
    );
}

// Sub-component for individual card logic
function TimelineCard({ index, setHoveredIndex, title, content, delay, gradient = false }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative h-full"
        >
            {/* Connection Dot (Mobile) */}
            <div className="absolute left-8 top-8 w-3 h-3 bg-blue-500 rounded-full lg:hidden -translate-x-[6.5px] border border-black shadow-[0_0_10px_#3b82f6]" />

            {/* Card Content */}
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                    h-full relative rounded-2xl p-8 text-left transition-all duration-300 border backdrop-blur-md overflow-hidden
                    ${gradient
                        ? 'bg-gradient-to-r from-zinc-400 via-[#70879f] to-sky-700 border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                        : 'bg-white/5 border-white/10 hover:border-blue-500/30 hover:bg-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
                    }
                `}
            >
                {/* Glow Overlay on Hover (for non-gradient cards) */}
                {!gradient && (
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                <h3 className={`text-2xl font-bold mb-6 pb-4 border-b ${gradient ? 'text-white border-white/20' : 'text-white border-white/10'}`}>
                    {title}
                </h3>

                <ul className="space-y-4">
                    {content.map((item: any, i: number) => (
                        <li key={i} className="flex gap-3 text-sm sm:text-base">
                            <span className={`${gradient ? 'text-white/60' : 'text-blue-400'} mt-1`}>•</span>
                            <span className={`${gradient ? 'text-white/90' : 'text-gray-400 font-light'}`}>
                                <strong className="text-white font-medium">{item.year}:</strong> {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
}
